import { ObservableProcedureModel } from "@blockly/block-shareable-procedures"
import * as Blockly from "blockly"
import {
    Connection,
    Events,
    FieldCheckbox,
    fieldRegistry,
    Procedures,
    VariableModel, Variables,
    Workspace, Xml,
} from "blockly"
import { Block } from "blockly/core"
import * as xmlUtils from "./xml"

// Blockly.Extensions.registerMutator(
//     "procedures_mutatorarg", {
//         /**
//          * Mutator block for procedure argument.
//          * @this Blockly.Block
//          */
//         init: function () {
//             this.setColour(Blockly.Blocks.procedures.HUE)
//             this.appendDummyInput()
//                 .appendField(Blockly.Msg.PROCEDURES_MUTATORARG_TITLE)
//                 .appendField(new Blockly.FieldTextInput("x", this.validator_), "NAME")
//             this.setPreviousStatement(true)
//             this.setNextStatement(true)
//             this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORARG_TOOLTIP)
//             this.contextMenu = false
//         },
//         /**
//          * Obtain a valid name for the procedure.
//          * Merge runs of whitespace.  Strip leading and trailing whitespace.
//          * Beyond this, all names are legal.
//          * @param {string} newVar User-supplied name.
//          * @return {?string} Valid name, or null if a name was not specified.
//          * @private
//          * @this Blockly.Block
//          */
//         validator_: function (newVar: string): string | null {
//             newVar = newVar.replace(/[\s\xa0]+/g, " ").replace(/^ | $/g, "")
//             return newVar || null
//         },
//     },
//     undefined,
// )

type FieldTextInputForArgument = Blockly.FieldTextInput & {
    oldShowEditorFn_(_e?: Event, quietInput?: boolean): void
    createdVariables_: Blockly.VariableModel[]
}
type AnyDuringMigration = any

interface ArgumentMixin extends ArgumentMixinType {
}

type ArgumentMixinType = typeof PROCEDURES_MUTATORARGUMENT

type ArgumentBlock = Blockly.Block & ArgumentMixin

type ProcedureBlock = Block & ProcedureMixin
type ProcedureMixinType = typeof PROCEDURE_DEF_COMMON

type ContainerBlock = Block & ContainerMixin
interface ContainerMixin extends ContainerMixinType {}
type ContainerMixinType = typeof PROCEDURES_MUTATORCONTAINER

const PROCEDURES_MUTATORCONTAINER = {
    /**
     * Mutator block for procedure container.
     */
    init: function (this: ContainerBlock) {
        this.appendDummyInput().appendField(
            "PROCEDURES_MUTATORCONTAINER_TITLE",
        )
        this.appendStatementInput("STACK")
        this.appendDummyInput("STATEMENT_INPUT")
            .appendField("PROCEDURES_ALLOW_STATEMENTS")
            .appendField(
                fieldRegistry.fromJson({
                    type: "field_checkbox",
                    checked: true,
                }) as FieldCheckbox,
                "STATEMENTS",
            )
        this.setStyle("procedure_blocks")
        this.setTooltip("PROCEDURES_MUTATORCONTAINER_TOOLTIP")
        this.contextMenu = false
    },
}
Blockly.Blocks["procedures_mutatorcontainer"] = PROCEDURES_MUTATORCONTAINER

interface ProcedureMixin extends ProcedureMixinType {
    arguments_: string[]
    argumentVarModels_: VariableModel[]
    callType_: string
    paramIds_: string[]
    hasStatements_: boolean
    statementConnection_: Connection | null
}

const PROCEDURE_DEF_COMMON = {
    /**
     * Add or remove the statement block from this function definition.
     *
     * @param hasStatements True if a statement block is needed.
     */
    setStatements_: function (this: ProcedureBlock, hasStatements: boolean) {
        if (this.hasStatements_ === hasStatements) {
            return
        }
        if (hasStatements) {
            this.appendStatementInput("STACK").appendField("PROCEDURES_DEFNORETURN_DO",
            )
            if (this.getInput("RETURN")) {
                this.moveInputBefore("STACK", "RETURN")
            }
        } else {
            this.removeInput("STACK", true)
        }
        this.hasStatements_ = hasStatements
    },

    /**
     * Update the display of parameters for this procedure definition block.
     *
     * @internal
     */
    updateParams_: function (this: ProcedureBlock) {
        // Merge the arguments into a human-readable list.
        let paramString = ""
        if (this.arguments_.length) {
            paramString = `PROCEDURES_BEFORE_PARAMS ${this.arguments_.join(", ")}`
        }
        // The params field is deterministic based on the mutation,
        // no need to fire a change event.
        Events.disable()
        try {
            this.setFieldValue(paramString, "PARAMS")
        } finally {
            Events.enable()
        }
    },

    /**
     * Create XML to represent the argument inputs.
     * Backwards compatible serialization implementation.
     *
     * @param opt_paramIds If true include the IDs of the parameter
     *     quarks.  Used by Procedures.mutateCallers for reconnection.
     * @returns  XML storage element.
     */
    mutationToDom: function (
        this: ProcedureBlock,
        opt_paramIds: boolean,
    ): Element {
        const container = xmlUtils.createElement("mutation")
        if (opt_paramIds) {
            container.setAttribute("name", this.getFieldValue("NAME"))
        }
        for (let i = 0; i < this.argumentVarModels_.length; i++) {
            const parameter = xmlUtils.createElement("arg")
            const argModel = this.argumentVarModels_[i]
            parameter.setAttribute("name", argModel.name)
            parameter.setAttribute("varid", argModel.getId())
            if (opt_paramIds && this.paramIds_) {
                parameter.setAttribute("paramId", this.paramIds_[i])
            }
            container.appendChild(parameter)
        }

        // Save whether the statement input is visible.
        if (!this.hasStatements_) {
            container.setAttribute("statements", "false")
        }
        return container
    },
    /**
     * Parse XML to restore the argument inputs.
     * Backwards compatible serialization implementation.
     *
     * @param xmlElement XML storage element.
     */
    domToMutation: function (this: ProcedureBlock, xmlElement: Element) {
        this.arguments_ = []
        this.argumentVarModels_ = []
        for (let i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
            if (childNode.nodeName.toLowerCase() === "arg") {
                const childElement = childNode as Element
                const varName = childElement.getAttribute("name")!
                const varId
                  = childElement.getAttribute("varid")
                  || childElement.getAttribute("varId")
                this.arguments_.push(varName)
                const variable = Variables.getOrCreateVariablePackage(
                    this.workspace,
                    varId,
                    varName,
                    "",
                )
                if (variable !== null) {
                    this.argumentVarModels_.push(variable)
                } else {
                    console.log(
                        `Failed to create a variable named "${varName}", ignoring.`,
                    )
                }
            }
        }
        this.updateParams_()
        Procedures.mutateCallers(this)

        // Show or hide the statement input.
        this.setStatements_(xmlElement.getAttribute("statements") !== "false")
    },
}

const PROCEDURES_MUTATORARGUMENT = {
    init: function (this: ArgumentBlock) {
        const field = Blockly.fieldRegistry.fromJson({
            type: "field_input",
            text: Blockly.Procedures.DEFAULT_ARG,
        }) as FieldTextInputForArgument
        field.setValidator(this.validator_)
        // Hack: override showEditor to do just a little bit more work.
        // We don't have a good place to hook into the start of a text edit.
        field.oldShowEditorFn_ = (field as AnyDuringMigration).showEditor_
        const newShowEditorFn = function (this: typeof field) {
            this.createdVariables_ = []
            this.oldShowEditorFn_()
        };
        (field as AnyDuringMigration).showEditor_ = newShowEditorFn

        this.appendDummyInput()
            .appendField("mutatorarg title")
            .appendField(field, "NAME")
        this.setPreviousStatement(true)
        this.setNextStatement(true)
        this.setStyle("procedure_blocks")
        this.setTooltip("mutatorarg tooltip")
        this.contextMenu = false

        // Create the default variable when we drag the block in from the flyout.
        // Have to do this after installing the field on the block.
        field.onFinishEditing_ = this.deleteIntermediateVars_
        // Create an empty list so onFinishEditing_ has something to look at, even
        // though the editor was never opened.
        field.createdVariables_ = []
        field.onFinishEditing_("x")
    },

    /**
     * Obtain a valid name for the procedure argument. Create a variable if
     * necessary.
     * Merge runs of whitespace.  Strip leading and trailing whitespace.
     * Beyond this, all names are legal.
     *
     * @internal
     * @param varName User-supplied name.
     * @returns Valid name, or null if a name was not specified.
     */
    validator_: function (
        this: FieldTextInputForArgument,
        varName: string,
    ): string | null {
        const sourceBlock = this.getSourceBlock()!
        const outerWs = sourceBlock!.workspace.getRootWorkspace()!
        varName = varName.replace(/[\s\xa0]+/g, " ").replace(/^ | $/g, "")
        if (!varName) {
            return null
        }

        // Prevents duplicate parameter names in functions
        const workspace = (sourceBlock.workspace as Blockly.WorkspaceSvg).targetWorkspace
            || sourceBlock.workspace
        const blocks = workspace.getAllBlocks(false)
        const caselessName = varName.toLowerCase()
        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].id === this.getSourceBlock()!.id) {
                continue
            }
            // Other blocks values may not be set yet when this is loaded.
            const otherVar = blocks[i].getFieldValue("NAME")
            if (otherVar && otherVar.toLowerCase() === caselessName) {
                return null
            }
        }

        // Don't create variables for arg blocks that
        // only exist in the mutator's flyout.
        if (sourceBlock.isInFlyout) {
            return varName
        }

        let model = outerWs.getVariable(varName, "")
        if (model && model.name !== varName) {
            // Rename the variable (case change)
            outerWs.renameVariableById(model.getId(), varName)
        }
        if (!model) {
            model = outerWs.createVariable(varName, "")
            if (model && this.createdVariables_) {
                this.createdVariables_.push(model)
            }
        }
        return varName
    },

    /**
     * Called when focusing away from the text field.
     * Deletes all variables that were created as the user typed their intended
     * variable name.
     *
     * @internal
     * @param  newText The new variable name.
     */
    deleteIntermediateVars_: function (
        this: FieldTextInputForArgument,
        newText: string,
    ) {
        const outerWs = this.getSourceBlock()!.workspace.getRootWorkspace()
        if (!outerWs) {
            return
        }
        for (let i = 0; i < this.createdVariables_.length; i++) {
            const model = this.createdVariables_[i]
            if (model.name !== newText) {
                outerWs.deleteVariableById(model.getId())
            }
        }
    },
}
Blockly.Blocks["procedures_mutatorarg"] = PROCEDURES_MUTATORARGUMENT

Blockly.Blocks["arguments_container"] = {
    init: function (this: Blockly.Block) {
        this.appendDummyInput()
            .appendField("parameters")
        this.appendStatementInput("STACK")
        this.setColour("#f92f2f")
        this.setTooltip("Add parameters to the function.")
        this.contextMenu = false
    },
}

type FnBlock = Blockly.Block & { model?: any, arguments_?: any } & Blockly.BlockSvg

Blockly.Blocks["procedures_defnoreturn"] = {
    ...PROCEDURE_DEF_COMMON,
    init: function (this: FnBlock) {
        const initName = Blockly.Procedures.findLegalName("", this)

        this.model = new ObservableProcedureModel(this.workspace, "default name")
        this.workspace.getProcedureMap().add(this.model)
        // etc...
        this.appendDummyInput()
            .appendField("fuf")
            .appendField(Blockly.fieldRegistry.fromJson({
                type: "field_input",
                text: initName,
            }) as Blockly.FieldTextInput, "NAME")
            .appendField("", "PARAMS")
        this.appendStatementInput("STACK")
            .setCheck(null)
            .appendField("do")
        this.setColour(230)
        this.setTooltip("tooltip")
        this.setHelpUrl("help")
        this.arguments_ = []
        this.setMutator(new Blockly.icons.MutatorIcon(["procedures_mutatorarg"], this))
    },

    destroy: function () {
        // (Optionally) Destroy the model when the definition block is deleted.

        // Insertion markers reference the model of the original block.
        if (this.isInsertionMarker()) return
        this.workspace.getProcedureMap().delete(this.model.getId())
    },

    /**
     * Populate the mutator's dialog with this block's components.
     *
     * @param  workspace Mutator's workspace.
     * @returns Root block in mutator.
     */
    decompose: function (
        this: ProcedureBlock,
        workspace: Workspace,
    ): ContainerBlock {
        /*
         * Creates the following XML:
         * <block type="procedures_mutatorcontainer">
         *   <statement name="STACK">
         *     <block type="procedures_mutatorarg">
         *       <field name="NAME">arg1_name</field>
         *       <next>etc...</next>
         *     </block>
         *   </statement>
         * </block>
         */

        const containerBlockNode = xmlUtils.createElement("block")
        containerBlockNode.setAttribute("type", "procedures_mutatorcontainer")
        const statementNode = xmlUtils.createElement("statement")
        statementNode.setAttribute("name", "STACK")
        containerBlockNode.appendChild(statementNode)

        let node = statementNode
        for (let i = 0; i < this.arguments_.length; i++) {
            const argBlockNode = xmlUtils.createElement("block")
            argBlockNode.setAttribute("type", "procedures_mutatorarg")
            const fieldNode = xmlUtils.createElement("field")
            fieldNode.setAttribute("name", "NAME")
            const argumentName = xmlUtils.createTextNode(this.arguments_[i])
            fieldNode.appendChild(argumentName)
            argBlockNode.appendChild(fieldNode)
            const nextNode = xmlUtils.createElement("next")
            argBlockNode.appendChild(nextNode)

            node.appendChild(argBlockNode)
            node = nextNode
        }

        const containerBlock = Xml.domToBlock(
            containerBlockNode,
            workspace,
        ) as ContainerBlock

        if (this.type === "procedures_defreturn") {
            containerBlock.setFieldValue(this.hasStatements_, "STATEMENTS")
        } else {
            containerBlock.removeInput("STATEMENT_INPUT")
        }

        // Initialize procedure's callers with blank IDs.
        Procedures.mutateCallers(this)
        return containerBlock
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     *
     * @param containerBlock Root block in mutator.
     */
    compose: function (this: ProcedureBlock, containerBlock: ContainerBlock) {
        // Parameter list.
        this.arguments_ = []
        this.paramIds_ = []
        this.argumentVarModels_ = []
        let paramBlock = containerBlock.getInputTargetBlock("STACK")
        while (paramBlock && !paramBlock.isInsertionMarker()) {
            const varName = paramBlock.getFieldValue("NAME")
            this.arguments_.push(varName)
            const variable = this.workspace.getVariable(varName, "")!
            this.argumentVarModels_.push(variable)

            this.paramIds_.push(paramBlock.id)
            paramBlock
              = paramBlock.nextConnection && paramBlock.nextConnection.targetBlock()
        }
        this.updateParams_()
        Procedures.mutateCallers(this)

        // Show/hide the statement input.
        let hasStatements = containerBlock.getFieldValue("STATEMENTS")
        if (hasStatements !== null) {
            hasStatements = hasStatements === "TRUE"
            if (this.hasStatements_ !== hasStatements) {
                if (hasStatements) {
                    this.setStatements_(true)
                    // Restore the stack, if one was saved.
                    this.statementConnection_?.reconnect(this, "STACK")
                    this.statementConnection_ = null
                } else {
                    // Save the stack, then disconnect it.
                    const stackConnection = this.getInput("STACK")!.connection
                    this.statementConnection_ = stackConnection!.targetConnection
                    if (this.statementConnection_) {
                        const stackBlock = stackConnection!.targetBlock()!
                        stackBlock.unplug()
                        stackBlock.bumpNeighbours()
                    }
                    this.setStatements_(false)
                }
            }
        }
    },

    /**
     * Return the signature of this procedure definition.
     *
     * @returns Tuple containing three elements:
     *     - the name of the defined procedure,
     *     - a list of all its arguments,
     *     - that it DOES NOT have a return value.
     */
    getProcedureDef: function (this: ProcedureBlock): [string, string[], false] {
        return [this.getFieldValue("NAME"), this.arguments_, false]
    },
    callType_: "procedures_callnoreturn",

    getProcedureModel() {
        return this.model
    },

    isProcedureDef() {
        return true
    },

    getVarModels() {
        // If your procedure references variables
        // then you should return those models here.
        return [] as Blockly.VariableModel[]
    },

    doProcedureUpdate() {
        this.setFieldValue(this.model.getName(), "NAME")
        this.setFieldValue(
            (this.model as ObservableProcedureModel).getParameters()
                .map(p => p.getName())
                .join(","),
            "PARAMS")
        this.setFieldValue(
            this.model.getReturnTypes().join(","), "RETURN")
    },
}

Blockly.Blocks["procedures_callnoreturn"] = {
    getProcedureModel() {
        return this.model
    },

    isProcedureDef() {
        return false
    },

    getVarModels() {
        // If your procedure references variables
        // then you should return those models here.
        return [] as Blockly.VariableModel[]
    },
}
