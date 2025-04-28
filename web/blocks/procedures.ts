import * as Blockly from "blockly"
import {
    BlockSvg,
    Connection,
    ContextMenu,
    ContextMenuRegistry,
    Events,
    FieldCheckbox,
    FieldDropdown,
    fieldRegistry,
    FieldTextInput,
    Msg,
    Procedures,
    VariableModel,
    Variables,
    Workspace,
    Xml,
} from "blockly"
import { Block } from "blockly/core"
import * as xmlUtils from "./xml"
import { LegacyContextMenuOption } from "blockly/core/contextmenu_registry"
import ContextMenuOption = ContextMenuRegistry.ContextMenuOption

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

interface ContainerMixin extends ContainerMixinType {
}

type ContainerMixinType = typeof PROCEDURES_MUTATORCONTAINER

/** Extra state for serialising procedure blocks. */
type ProcedureExtraState = {
    params?: Array<{ name: string, id: string, type: string }>
    hasStatements: boolean
}

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
    arguments_: [string, string][]
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
            this.appendStatementInput("STACK").appendField(
                "PROCEDURES_DEFNORETURN_DO",
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
            paramString
            = "PROCEDURES_BEFORE_PARAMS" + " " + this.arguments_.map(([n, _]) => n).join(", ")
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
            parameter.setAttribute("type", argModel.type)
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
                const varType = childElement.getAttribute("type")!
                this.arguments_.push([varName, varType])
                const variable = Variables.getOrCreateVariablePackage(
                    this.workspace,
                    varId,
                    varName,
                    varType,
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
    /**
   * Returns the state of this block as a JSON serializable object.
   *
   * @returns The state of this block, eg the parameters and statements.
   */
    saveExtraState: function (this: ProcedureBlock): ProcedureExtraState | null {
        if (!this.argumentVarModels_.length && this.hasStatements_) {
            return null
        }
        const state = Object.create(null)
        if (this.argumentVarModels_.length) {
            state["params"] = []
            for (let i = 0; i < this.argumentVarModels_.length; i++) {
                state["params"].push({
                    // We don't need to serialize the name, but just in case we decide
                    // to separate params from variables.
                    name: this.argumentVarModels_[i].name,
                    id: this.argumentVarModels_[i].getId(),
                    type: this.argumentVarModels_[i].type,
                })
            }
        }
        if (!this.hasStatements_) {
            state["hasStatements"] = false
        }
        return state as ProcedureExtraState
    },
    /**
   * Applies the given state to this block.
   *
   * @param state The state to apply to this block, eg the parameters
   *     and statements.
   */
    loadExtraState: function (this: ProcedureBlock, state: ProcedureExtraState) {
        this.arguments_ = []
        this.argumentVarModels_ = []
        if (state["params"]) {
            for (let i = 0; i < state["params"].length; i++) {
                const param = state["params"][i]
                const variable = Variables.getOrCreateVariablePackage(
                    this.workspace,
                    param["id"],
                    param["name"],
                    param["type"],
                )
                this.arguments_.push([variable.name, variable.type])
                this.argumentVarModels_.push(variable)
            }
        }
        this.updateParams_()
        Procedures.mutateCallers(this)
        this.setStatements_(state["hasStatements"] !== false)
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
            const argumentName = xmlUtils.createTextNode(this.arguments_[i][0])
            fieldNode.appendChild(argumentName)
            argBlockNode.appendChild(fieldNode)

            const typeFieldNode = xmlUtils.createElement("field")
            typeFieldNode.setAttribute("name", "TYPE")
            const type = xmlUtils.createTextNode(this.arguments_[i][1])
            typeFieldNode.appendChild(type)
            argBlockNode.appendChild(typeFieldNode)

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
            const varName = paramBlock.getFieldValue("NAME") as string
            const varType = paramBlock.getFieldValue("TYPE") as string
            this.arguments_.push([varName, varType])
            // const variable = this.workspace.getVariable(varName, varType)!
            const variable = this.workspace.getVariable(varName, "")!
            this.argumentVarModels_.push(variable)

            this.paramIds_.push(paramBlock.id)
            paramBlock = paramBlock.nextConnection && paramBlock.nextConnection.targetBlock()
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
     * Return all variables referenced by this block.
     *
     * @returns List of variable names.
     */
    getVars: function (this: ProcedureBlock): string[] {
        return this.arguments_.map(([arg]) => arg)
    },
    /**
     * Return all variables referenced by this block.
     *
     * @returns List of variable models.
     */
    getVarModels: function (this: ProcedureBlock): VariableModel[] {
        return this.argumentVarModels_
    },
    /**
     * Notification that a variable is renaming.
     * If the ID matches one of this block's variables, rename it.
     *
     * @param oldId ID of variable to rename.
     * @param newId ID of new variable.  May be the same as oldId, but
     *     with an updated name.  Guaranteed to be the same type as the
     *     old variable.
     */
    renameVarById: function (
        this: ProcedureBlock & BlockSvg,
        oldId: string,
        newId: string,
    ) {
        const oldVariable = this.workspace.getVariableById(oldId)!
        if (oldVariable.type !== "") {
            // Procedure arguments always have the empty type.
            return
        }
        const oldName = oldVariable.name
        const newVar = this.workspace.getVariableById(newId)!

        let change = false
        for (let i = 0; i < this.argumentVarModels_.length; i++) {
            if (this.argumentVarModels_[i].getId() === oldId) {
                this.arguments_[i][0] = newVar.name
                this.argumentVarModels_[i] = newVar
                change = true
            }
        }
        if (change) {
            this.displayRenamedVar_(oldName, newVar.name)
            Procedures.mutateCallers(this)
        }
    },
    /**
     * Notification that a variable is renaming but keeping the same ID.  If the
     * variable is in use on this block, rerender to show the new name.
     *
     * @param variable The variable being renamed.
     */
    updateVarName: function (
        this: ProcedureBlock & BlockSvg,
        variable: VariableModel,
    ) {
        const newName = variable.name
        let change = false
        let oldName
        for (let i = 0; i < this.argumentVarModels_.length; i++) {
            if (this.argumentVarModels_[i].getId() === variable.getId()) {
                oldName = this.arguments_[i][0]
                this.arguments_[i] = [newName, this.arguments_[i][1]]
                change = true
            }
        }
        if (change) {
            this.displayRenamedVar_(oldName as string, newName)
            Procedures.mutateCallers(this)
        }
    },
    /**
     * Update the display to reflect a newly renamed argument.
     *
     * @internal
     * @param oldName The old display name of the argument.
     * @param newName The new display name of the argument.
     */
    displayRenamedVar_: function (
        this: ProcedureBlock & BlockSvg,
        oldName: string,
        newName: string,
    ) {
        this.updateParams_()
        // Update the mutator's variables if the mutator is open.
        // const mutator = this.getIcon(IconType<WarningIcon>)
        // if (mutator && mutator.bubbleIsVisible()) {
        //     const blocks = mutator.getWorkspace()!.getAllBlocks(false)
        //     for (let i = 0, block; (block = blocks[i]); i++) {
        //         if (
        //             block.type === "procedures_mutatorarg"
        //             && Names.equals(oldName, block.getFieldValue("NAME"))
        //         ) {
        //             block.setFieldValue(newName, "NAME")
        //         }
        //     }
        // }
    },
    /**
     * Add custom menu options to this block's context menu.
     *
     * @param options List of menu options to add to.
     */
    customContextMenu: function (
        this: ProcedureBlock,
        options: Array<ContextMenuOption | LegacyContextMenuOption>,
    ) {
        if (this.isInFlyout) {
            return
        }
        // Add option to create caller.
        const name = this.getFieldValue("NAME")
        const callProcedureBlockState = {
            type: (this as AnyDuringMigration).callType_,
            extraState: { name: name, params: this.arguments_ },
        }
        options.push({
            enabled: true,
            text: Msg["PROCEDURES_CREATE_DO"].replace("%1", name),
            callback: ContextMenu.callbackFactory(this, callProcedureBlockState),
        })

        // Add options to create getters for each parameter.
        if (!this.isCollapsed()) {
            for (let i = 0; i < this.argumentVarModels_.length; i++) {
                const argVar = this.argumentVarModels_[i]
                const getVarBlockState = {
                    type: "variables_get",
                    fields: {
                        VAR: { name: argVar.name, id: argVar.getId(), type: argVar.type },
                    },
                }
                options.push({
                    enabled: true,
                    text: Msg["VARIABLES_SET_CREATE_GET"].replace("%1", argVar.name),
                    callback: ContextMenu.callbackFactory(this, getVarBlockState),
                })
            }
        }
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
            .appendField(new FieldDropdown([
                ["String", "String"],
                ["Number", "Number"],
            ]), "TYPE")
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

// Blockly.Blocks["arguments_container"] = {
//     init: function (this: Blockly.Block) {
//         this.appendDummyInput()
//             .appendField("parameters")
//         this.appendStatementInput("STACK")
//         this.setColour("#f92f2f")
//         this.setTooltip("Add parameters to the function.")
//         this.contextMenu = false
//     },
// }

Blockly.Blocks["procedures_defnoreturn"] = {
    ...PROCEDURE_DEF_COMMON,
    init: function (this: ProcedureBlock & BlockSvg) {
        const initName = Procedures.findLegalName("", this)
        const nameField = fieldRegistry.fromJson({
            type: "field_input",
            text: initName,
        }) as FieldTextInput
        nameField!.setValidator(Procedures.rename)
        nameField.setSpellcheck(false)
        this.appendDummyInput()
            .appendField("PROCEDURES_DEFNORETURN_TITLE")
            .appendField(nameField, "NAME")
            .appendField("", "PARAMS")
        this.setMutator(new Blockly.icons.MutatorIcon(["procedures_mutatorarg"], this))
        if (
            (this.workspace.options.comments
                || (this.workspace.options.parentWorkspace
                    && this.workspace.options.parentWorkspace.options.comments))
                && "PROCEDURES_DEFNORETURN_COMMENT"
        ) {
            this.setCommentText("PROCEDURES_DEFNORETURN_COMMENT")
        }
        this.setStyle("procedure_blocks")
        this.setTooltip("PROCEDURES_DEFNORETURN_TOOLTIP")
        this.setHelpUrl("PROCEDURES_DEFNORETURN_HELPURL")
        this.arguments_ = []
        this.argumentVarModels_ = []
        this.setStatements_(true)
        this.statementConnection_ = null
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
        return [this.getFieldValue("NAME"), this.arguments_.map(([n, _]) => n), false]
    },
    callType_: "procedures_callnoreturn",
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
