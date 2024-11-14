import * as Blockly from "blockly"

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

// Blockly.Blocks["procedures_defnoreturn"] = {
//     init: function (this: Blockly.Block) {
//         this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL)
//         this.setColour(Blockly.Blocks.procedures.HUE)
//         var name = Blockly.Procedures.findLegalName(
//             Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE, this)
//         var nameField = new Blockly.FieldTextInput(name,
//             Blockly.Procedures.rename)
//         nameField.setSpellcheck(false)
//         this.appendDummyInput()
//             .appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE)
//             .appendField(nameField, "NAME")
//             .appendField("", "PARAMS")
//         this.setMutator(new MutatorIcon([], this.workspace.newBlock("procedures_defnoreturn")))
//         this.setTooltip(Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP)
//     },
// }

Blockly.Blocks["argument_block"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("name")
            .appendField(new Blockly.FieldTextInput("param"), "NAME")
            .appendField("type")
            .appendField(new Blockly.FieldDropdown([
                ["Number", "NUMBER"],
                ["String", "STRING"],
                ["Boolean", "BOOLEAN"],
            ]), "TYPE")
        this.setPreviousStatement(true)
        this.setNextStatement(true)
        this.setColour(200)
        this.setTooltip("Define a parameter.")
        this.contextMenu = false
    },
}

Blockly.Blocks["arguments_container"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("parameters")
        this.appendStatementInput("STACK")
        this.setColour(200)
        this.setTooltip("Add parameters to the function.")
        this.contextMenu = false
    },
}
Blockly.Blocks["procedures_defnoreturn"] = {
    init: function (this: Blockly.BlockSvg & { arguments_: object, updateShape_: any }) {
        this.appendDummyInput()
            .appendField("function")
            .appendField(new Blockly.FieldTextInput("doSomething"), "NAME")
        this.appendStatementInput("STACK")
            .setCheck(null)
            .appendField("do")
        this.setColour(230)
        this.setTooltip("")
        this.setHelpUrl("")
        this.arguments_ = []
        this.updateShape_()
        this.setMutator(new Blockly.icons.MutatorIcon(["argument_block"], this))
    },

    /**
     * Updates the shape of the block based on its parameters.
     */
    updateShape_: function () {
        // Remove existing parameter inputs
        if (this.getInput("PARAMS")) {
            this.removeInput("PARAMS")
        }

        // Add new inputs for parameters
        if (this.arguments_.length) {
            const input = this.appendDummyInput("PARAMS")
                .appendField("with")
            for (let i = 0; i < this.arguments_.length; i++) {
                input.appendField(new Blockly.FieldTextInput(this.arguments_[i].name), `PARAM_NAME${i}`)
                input.appendField(new Blockly.FieldDropdown([
                    ["Number", "NUMBER"],
                    ["String", "STRING"],
                    ["Boolean", "BOOLEAN"],
                ]), `PARAM_TYPE${i}`)
            }
        }
    },

    /**
     * Generates a list of XML nodes to save the block's state.
     */
    mutationToDom: function () {
        const container = Blockly.utils.xml.createElement("mutation")
        container.setAttribute("arguments", JSON.stringify(this.arguments_))
        return container
    },

    /**
     * Parses XML to restore the block's state.
     */
    domToMutation: function (xmlElement: Element) {
        const args = xmlElement.getAttribute("arguments")
        this.arguments_ = args ? JSON.parse(args) : []
        this.updateShape_()
    },

    /**
     * Called when the mutator is opened.
     */
    decompose: function (workspace: Blockly.Workspace) {
        const containerBlock = workspace.newBlock("arguments_container") as Blockly.BlockSvg
        containerBlock.initSvg()
        let connection = containerBlock.getInput("STACK").connection
        for (const arg of this.arguments_) {
            const argumentBlock = workspace.newBlock("argument_block") as Blockly.BlockSvg
            argumentBlock.setFieldValue(arg.name, "NAME")
            argumentBlock.setFieldValue(arg.type, "TYPE")
            argumentBlock.initSvg()
            connection.connect(argumentBlock.previousConnection)
            connection = argumentBlock.nextConnection
        }
        return containerBlock
    },

    /**
     * Called when the mutator is closed.
     */
    compose: function (containerBlock: Blockly.Block) {
        let paramBlock = containerBlock.getInputTargetBlock("STACK")
        const arguments_ = []
        while (paramBlock) {
            arguments_.push({
                name: paramBlock.getFieldValue("NAME"),
                type: paramBlock.getFieldValue("TYPE"),
            })
            paramBlock = paramBlock.nextConnection && paramBlock.nextConnection.targetBlock()
        }
        this.arguments_ = arguments_
        this.updateShape_()
    },
    callType_: "procedures_callnoreturn",
}

export const blocks = {}
