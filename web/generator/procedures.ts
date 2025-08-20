import {Names} from "blockly"
import {ArduinoGenerator, Order} from "./arduinoGenerator"
import {ProcedureBlock} from "../blocks/procedures"

export default function populate(generator: ArduinoGenerator) {
    generator.forBlock["procedures_defreturn"] = generator.forBlock["procedures_defnoreturn"] = function (
        block: ProcedureBlock,
        generator: ArduinoGenerator,
    ) {
        // Define a procedure with a return value.
        const funcName = generator.getProcedureName(block.getFieldValue("NAME"))
        let xfix1 = ""
        if (generator.STATEMENT_PREFIX) {
            xfix1 += generator.injectId(generator.STATEMENT_PREFIX, block)
        }
        if (generator.STATEMENT_SUFFIX) {
            xfix1 += generator.injectId(generator.STATEMENT_SUFFIX, block)
        }
        if (xfix1) {
            xfix1 = generator.prefixLines(xfix1, generator.INDENT)
        }
        let loopTrap = ""
        if (generator.INFINITE_LOOP_TRAP) {
            loopTrap = generator.prefixLines(
                generator.injectId(generator.INFINITE_LOOP_TRAP, block),
                generator.INDENT,
            )
        }
        let branch = ""
        if (block.getInput("STACK")) {
            // The 'procedures_defreturn' block might not have a STACK input.
            branch = generator.statementToCode(block, "STACK")
        }
        let returnValue = ""
        if (block.getInput("RETURN")) {
            // The 'procedures_defnoreturn' block (which shares this code)
            // does not have a RETURN input.
            returnValue = generator.valueToCode(block, "RETURN", Order.ORDER_NONE) || ""
        }
        let xfix2 = ""
        if (branch && returnValue) {
            // After executing the function body, revisit this block for the return.
            xfix2 = xfix1
        }
        if (returnValue) {
            returnValue = generator.INDENT + "return " + returnValue + ";\n"
        }

        const args = block.arguments_.map(([name, ty]) => `${ty} ${generator.getVariableName(name)}`)
        let code
            = (returnValue ? "auto" : "void")
            + " "
            + funcName
            + "("
            + args.join(", ")
            + ") {\n"
            + xfix1
            + loopTrap
            + branch
            + xfix2
            + returnValue
            + "}"
        code = generator.scrub_(block, code);
        // Add % so as not to collide with helper functions in definitions list.
        // TODO(#7600): find better approach than casting to any to override
        // CodeGenerator declaring .definitions protected.
        (generator as any).definitions_["%" + funcName] = code
        return null
    }
    generator.forBlock["procedures_callreturn"] = generator.forBlock["procedures_callnoreturn"] = function (block) {
        const funcName = generator.nameDB_?.getName(block.getFieldValue("NAME"), Names.NameType.PROCEDURE)

        const args = []
        const { arguments_ } = block as unknown as Record<string, string[]>
        for (let x = 0; x < arguments_.length; x++) {
            args[x] = generator.valueToCode(block, "ARG" + x, Order.ORDER_NONE) || "null"
        }

        if (block.type == "procedures_callreturn") {
            const code = `${funcName}(${args.join(", ")})`
            return [code, Order.ORDER_FUNCTION_CALL]
        } else {
            return `${funcName}(${args.join(", ")});\n`
        }
    }
}
