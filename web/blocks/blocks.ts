import * as Blockly from "blockly/core"
import { BlockDefinition } from "blockly/core/blocks"

import * as actuate from "./actuate"
import * as controlFlow from "./controlFlow"
import * as ezDisplay from "./ezDisplay"
import * as procedures from "./procedures"
import * as sense from "./sense"
import * as serial from "./serial"

Blockly.Extensions.register("test_max",
    function () {
        // this refers to the block that the extension is being run on
        console.log("running test_max:", this)
    })

// Blockly.Blocks["serial_byte_number"] = {
//     init: function () {
//         this.setHelpUrl(Blockly.Msg.SERIAL_READ_HELPURL)
//         // this.setColour(Blockly.Blocks.serial.HUE);
//         this.appendDummyInput()
//             .appendField(Blockly.Msg.SERIAL_BYTE_NUMBER_TEXT1)
//             .appendField(new Blockly.FieldDropdown([["0", "48"], ["1", "49"], ["2", "50"], ["3", "51"], ["4", "52"], ["5", "53"], ["6", "54"], ["7", "55"], ["8", "56"], ["9", "57"]]), "NUM")
//             .appendField(Blockly.Msg.SERIAL_BYTE_NUMBER_TEXT2)
//         this.setOutput(true, "NUMBER")
//         this.setTooltip(Blockly.Msg.SERIAL_READ_TOOLTIP)
//     },
// }

export {
    actuate,
    controlFlow,
    ezDisplay,
    procedures,
    sense,
    serial,
}

export const blocks: { [key: string]: BlockDefinition } = Object.assign({},
    actuate.blocks,
    controlFlow.blocks,
    sense.blocks,
    ezDisplay.blocks,
    procedures.blocks,
    serial.blocks,
)
