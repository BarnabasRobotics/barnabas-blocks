import * as Blockly from "blockly/core"

import imgUltrasonic from "../images/ultrasonic.png"

export const blocks = [
    {
        type: "operators_map",
        message0: "MAP  - value %1 from LOW %2 HIGH %3 to MIN %4 MAX %5",
        args0: [
            {
                type: "input_value",
                name: "VALUE",
                check: "Number",
            },
            {
                type: "input_value",
                name: "OLD_LOW",
                check: "Number",
                align: "RIGHT",
            },
            {
                type: "input_value",
                name: "OLD_HIGH",
                check: "Number",
                align: "RIGHT",
            },
            {
                type: "input_value",
                name: "NEW_LOW",
                check: "Number",
                align: "RIGHT",
            },
            {
                type: "input_value",
                name: "NEW_HIGH",
                check: "Number",
                align: "RIGHT",
            },
        ],
        inputsInline: false,
        output: "Number",
        style: "operators_blocks",
        helpUrl: "%{BKY_MATH_ARITHMETIC_HELPURL}",
        // "extensions": ["math_op_tooltip"]
    },
    // button
    {
        type: "boolean_button",
        message0: "BUTTON pin# %1",
        args0: [
            {
                type: "input_value",
                name: "PIN",
                value: 2,
                min: 0,
                max: 13,
            },
        ],
        // "inputsInline": false,
        // "previousStatement": null,
        // "nextStatement": null,
        output: "Boolean",
        colour: 180,
        tooltip: "I am a button",
        helpUrl: "http://www.arduino.cc/playground/ComponentLib/servo",
    },
    {
        type: "digital_read",
        message0: "digitalRead pin# %1",
        args0: [
            {
                type: "input_value",
                name: "PIN",
                value: 2,
                min: 0,
                max: 13,
            },
        ],
        output: "Boolean",
        colour: 180,
        tooltip: "Read a pin as either HIGH or LOW.",
        helpUrl: "https://docs.arduino.cc/language-reference/en/functions/digital-io/digitalread/",
    },
    {
        type: "sensors_button",
        message0: "BUTTON %1 pin# %2 status %3",
        args0: [
            {
                type: "field_image",
                src: "https://www.gstatic.com/codesite/ph/images/star_on.gif",
                width: 32,
                height: 32,
                alt: "Buzzer",
                flipRtl: false,
            },
            {
                type: "input_value",
                name: "PIN",
                value: 2,
                min: 0,
                max: 13,
            },
            {
                type: "input_value",
                name: "STATUS",
                check: "Boolean",
                align: "RIGHT",
            },
        ],
        inputsInline: false,
        output: "Boolean",
        colour: 180,
        helpUrl: "%{BKY_LOGIC_COMPARE_HELPURL}",
        extensions: ["logic_compare"],
    },
    {
        type: "boolean_onoff",
        message0: "%1",
        helpUrl: "http://arduino.cc/en/Reference/Constants",
        colour: "#c6a0ec",
        args0: [
            {
                type: "field_dropdown",
                name: "BOOL",
                options: [
                    ["On", "HIGH"],
                    ["Off", "LOW"],
                ],
            },
        ],
        output: "Boolean",
        tooltip: "The state of a digital output pin.",
    },
    {
        type: "boolean_pressed",
        message0: "%1",
        helpUrl: "http://arduino.cc/en/Reference/Constants",
        colour: 180,
        args0: [
            {
                type: "field_dropdown",
                name: "BOOL",
                options: [
                    ["Pressed", "LOW"],
                    ["Not Pressed", "HIGH"],
                ],
            },
        ],
        output: "Boolean",
        tooltip: "The state of a digital input pin.",
    },
    {
        type: "boolean_hilo",
        message0: "%1",
        helpUrl: "http://arduino.cc/en/Reference/Constants",
        colour: "#c6a0ec",
        args0: [
            {
                type: "field_dropdown",
                name: "BOOL",
                options: [
                    ["HIGH", "HIGH"],
                    ["LOW", "LOW"],
                ],
            },
        ],
        output: "Boolean",
        tooltip: "",
    },
    // ultrasonic
    {
        type: "sensors_sonic",
        message0: "cm from ultrasonic trigger# %3 %1 echo# %2",
        args0: [
            {
                type: "field_image",
                src: imgUltrasonic,
                width: 96,
                height: 64,
                alt: "Ultrasonic HS-401",
                flipRtl: false,
            },
            {
                type: "input_value",
                name: "ECHO",
                value: 3,
                min: 0,
                max: 13,
            },
            {
                type: "input_value",
                name: "TRIGGER",
                value: 4,
                min: 0,
                max: 13,
                align: "RIGHT",
            },
        ],
        inputsInline: false,
        colour: 180,
        output: ["Number", "Long"],
        tooltip: "Seeing with sound",
        helpUrl: "http://www.arduino.cc/playground/ComponentLib/servo",
    },
    {
        type: "pulsein_return",
        helpUrl: "https://www.arduino.cc/reference/en/language/functions/advanced-io/pulsein/",
        message0: "Time to next pulse %1 on pin %2, timeout %3 ns",
        colour: 230,
        args0: [
            {
                type: "input_value",
                name: "TYPE",
                check: "Boolean",
            },
            {
                type: "input_value",
                name: "PIN",
                check: "Number",
            },
            {
                type: "input_value",
                name: "TIMEOUT",
                check: "Number",
            },
        ],
        output: "Number",
        tooltip: Blockly.Msg.PULSEIN_TOOLTIP,
    },
    {
        type: "pulsein_discard",
        helpUrl: "https://www.arduino.cc/reference/en/language/functions/advanced-io/pulsein/",
        message0: "Wait for next pulse %1 on pin %2, timeout %3 ns",
        colour: 230,
        args0: [
            {
                type: "input_value",
                name: "TYPE",
                check: "Boolean",
            },
            {
                type: "input_value",
                name: "PIN",
                check: "Number",
            },
            {
                type: "input_value",
                name: "TIMEOUT",
                check: "Number",
            },
        ],
        previousStatement: true,
        nextStatement: true,
        tooltip: Blockly.Msg.PULSEIN_TOOLTIP,
    },
    {
        type: "analog_pin",
        message0: "%1",
        colour: 230,
        // helpUrl: "",
        args0: [
            {
                type: "field_dropdown",
                name: "PIN",
                options: [
                    ["A0", "A0"],
                    ["A1", "A1"],
                    ["A2", "A2"],
                    ["A3", "A3"],
                    ["A4", "A4"],
                    ["A5", "A5"],
                ],
            },
        ],
        output: "AnalogPin",
        // tooltip: "",
    },
    {
        type: "analog_read",
        helpUrl: "https://www.arduino.cc/reference/en/language/functions/analog-io/analogread/",
        message0: "ANALOG READ %1",
        colour: 180,
        args0: [
            {
                type: "input_value",
                name: "PIN",
                check: "AnalogPin",
            },
        ],
        output: "Number",
        tooltip: "Get analog voltage of a pin, 0-1023.",
    },
]

Blockly.defineBlocksWithJsonArray(blocks)
