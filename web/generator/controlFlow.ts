import * as Blockly from "blockly/core"

import { ArduinoGenerator, Order } from "./arduinoGenerator"

export default function populate(generator: ArduinoGenerator) {
    generator.forBlock["controls_wait"] = function (block, generator) {
        return `delay(1000 * ${generator.valueToCode(block, "DELAY_TIME", Order.ORDER_MULTIPLICATIVE) || "1"});\n`
    }

    generator.forBlock["controls_repeat_times"] = function (block, generator) {
        const numTimes = generator.valueToCode(block, "TIMES", Order.ORDER_ATOMIC) || "5"
        const body = generator.addLoopTrap(generator.statementToCode(block, "DO"), block)
        const counterVar = generator.nameDB_.getDistinctName("count", Blockly.Variables.CATEGORY_NAME)
        return `for (int ${counterVar} = 0; ${counterVar} < ${numTimes}; ${counterVar}++) {\n${body}}\n`
    }

    generator.forBlock["controls_setup"] = function (block, generator) {
        const setupBody = generator.statementToCode(block, "SETUP")
        const loopBody = generator.statementToCode(block, "LOOP")

        generator.addSetup(block, "explicitSetupBody", setupBody)
        generator.loop_ = loopBody

        // nothing here, let generator pull out those fields and assemble
        return null
    }

    generator.forBlock["controls_loop"] = function (block, generator) {
        const loopBody = generator.statementToCode(block, "LOOP")

        generator.loop_ = loopBody

        return null
    }

    generator.forBlock["controls_delay"] = function (block, generator) {
        const millis = Math.round(Number(generator.valueToCode(block, "DELAY_TIME", Order.ORDER_ATOMIC) || "1000"))
        return `delay(${millis});\n`
    }

    generator.forBlock["controls_whileUntil"] = function (block, generator) {
        const invertCond = block.getFieldValue("MODE") == "UNTIL"
        const cond = generator.valueToCode(block, "BOOL", Order.ORDER_NONE) || "false"
        const body = generator.statementToCode(block, "DO")

        return `while (${invertCond ? "!" : ""}${cond}) {
${body}}
`
    }

    generator.forBlock["controls_flow_statements"] = function (block) {
        return {
            BREAK: "break;\n",
            CONTINUE: "continue;\n",
        }[block.getFieldValue("FLOW") as string]
    }

    generator.forBlock["controls_return"] = function (block, generator) {
        const val = generator.valueToCode(block, "VAL", Order.ORDER_NONE) || ""
        // only add space if value is present
        return `return${val.length > 0 ? " " : ""}${val};\n`
    }
}
