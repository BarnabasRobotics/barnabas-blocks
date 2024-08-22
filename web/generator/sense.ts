import { ArduinoGenerator, Order } from "./arduinoGenerator"

export default function populate(generator: ArduinoGenerator) {
    generator.forBlock["operators_map"] = function (block, generator) {
        return [
            `map(${generator.valueToCode(block, "VALUE", Order.ORDER_NONE)}, ${block.getFieldValue("OLD_LOW") || "0"}, `
            + `${block.getFieldValue("OLD_HIGH") || "1024"}, ${block.getFieldValue("NEW_LOW") || "0"}, `
            + `${block.getFieldValue("NEW_HIGH") || "255"})`,
            Order.ORDER_NONE,
        ]
    }

    generator.forBlock["boolean_button"] = function (block, generator) {
        const pin = generator.valueToCode(block, "PIN", Order.ORDER_ATOMIC) || "2"
        generator.reservePin(block, pin, "input", "button")
        generator.addSetup(block, `button:${pin}`, `pinMode(${pin}, INPUT_PULLUP);`)

        return [`digitalRead(${pin})`, Order.ORDER_ATOMIC]
    }

    generator.forBlock["sensors_button"] = function (block, generator) {
        const pin = generator.valueToCode(block, "PIN", Order.ORDER_ATOMIC) || "2"
        generator.reservePin(block, pin, "input", "button")
        generator.addSetup(block, `button:${pin}`, `pinMode(${pin}, INPUT_PULLUP);`)

        const desiredState = generator.valueToCode(block, "STATUS", Order.ORDER_COMMA)

        return [`digitalRead(${pin}) == ${desiredState}`, Order.ORDER_EQUALITY]
    }

    generator.forBlock["boolean_onoff"] = generator.forBlock["boolean_pressed"] = generator.forBlock["boolean_hilo"] = function (block) {
        return [
            {
                HIGH: "HIGH",
                LOW: "LOW",
            }[block.getFieldValue("BOOL") as string],
            Order.ORDER_ATOMIC,
        ]
    }

    generator.forBlock["sensors_sonic"] = function (block, generator) {
        const trigger = generator.valueToCode(block, "TRIGGER", Order.ORDER_COMMA) || "4"
        generator.reservePin(block, trigger, "output", "ultrasonic trigger")
        generator.addSetup(block, `buzzer:trigger:${trigger}`, `pinMode(${trigger}, OUTPUT);`)

        const echo = generator.valueToCode(block, "ECHO", Order.ORDER_COMMA) || "3"
        generator.reservePin(block, echo, "input", "ultrasonic echo")
        generator.addSetup(block, `buzzer:echo:${echo}`, `pinMode(${trigger}, INPUT);`)

        // where 29979.2458 is c in cm/us
        generator.addDeclaration(block, "ultrasonic", `double ultrasonic() {
\tdigitalWrite(${trigger}, LOW);
\tdelayMicroseconds(5);
\tdigitalWrite(${trigger}, HIGH);

\tfloat duration_us = pulseIn(${echo}, HIGH);
\treturn ((double) pulseIn(${echo}, HIGH)) / 29979.2458;
}
`)

        return ["ultrasonic()", Order.ORDER_FUNCTION_CALL]
    }
}
