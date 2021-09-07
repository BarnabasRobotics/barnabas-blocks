var number_types = ["Number", "Int", "Long", "Float"];

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // wait
  {
    "type": "controls_wait",
    "message0": "WAIT seconds %1",
    "args0": [
      {
        "type": "input_value",
        "name": "DELAY_TIME",
        "check": "Number",
        "align": "CENTRE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 60,
    "tooltip": "delay",
    "helpUrl": "https://www.arduino.cc/reference/en/language/functions/time/delay/"
  },
  // repeat
  {
    "type": "controls_repeat_times",
    "message0": "%{BKY_CONTROLS_REPEAT_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "TIMES",
      "check": "Number"
    }],
    "message1": "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 64,
    "tooltip": "%{BKY_CONTROLS_REPEAT_TOOLTIP}",
    "helpUrl": "%{BKY_CONTROLS_REPEAT_HELPURL}"
  },
  // program
  {
    "type": "controls_setup",
    "message0": "PROGRAM %1 void setup ( ) %2 void loop ( ) %3",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "SETUP"
      },
      {
        "type": "input_statement",
        "name": "LOOP"
      }
    ],
    "colour": 60,
    "tooltip": "",
    "helpUrl": "https://www.arduino.cc/reference/en/#stucture"
  },
  // loop do
  {
    "type": "controls_loop",
    "message0": "LOOP %1 do %2",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "LOOP"
      }
    ],
    "colour": 60,
    "tooltip": "",
    "helpUrl": "https://www.arduino.cc/reference/en/#stucture"
  },
  // led
  {
    "type": "lights_led",
    "message0": "LED %1 pin# %2 status %3",
    "args0": [
      {
        "type": "field_image",
        "src": "images/led.png",
        "width": 32,
        "height": 32,
        "alt": "Light Emitting Diode",
        "flipRtl": false
      },
      {
        "type": "input_value",
        "name": "PIN",
        "value": 7,
        "min": 0,
        "max": 13,
        "check": "Number",
      },
      {
        "type": "input_value",
        "name": "STATUS",
        "check": "Boolean",
        "align": "RIGHT"
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": '#2dc32d',
    "tooltip": "digitalWrite",
    "helpUrl": "https://www.arduino.cc/reference/en/language/functions/digital-io/digitalwrite/"
  },
  // tone
  {
    "type": "sounds_tone",
    "message0": "TONE %1 pin# %2 %3 freq %4",
    "args0": [
      {
        "type": "field_image",
        "src": "images/tone.png",
        "width": 32,
        "height": 32,
        "alt": "Buzzer",
        "flipRtl": false
      },
      {
        "type": "input_value",
        "name": "PIN",
        "value": 6,
        "min": 0,
        "max": 13
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "FREQ",
        "check": "Number",
        "align": "RIGHT"
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 'ec792d',
    "tooltip": "tone",
    "helpUrl": "https://www.arduino.cc/reference/en/language/functions/digital-io/tone/"
  },
  // noTone
  {
    "type": "sounds_noTone",
    "message0": "NO TONE %1 pin# %2",
    "args0": [
      {
        "type": "field_image",
        "src": "images/notone.png",
        "width": 32,
        "height": 32,
        "alt": "No Buzzer",
        "flipRtl": false
      },
      {
        "type": "input_value",
        "name": "PIN",
        "value": 6,
        "min": 0,
        "max": 13
      },
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": '#ec792d',
    "tooltip": "noTone",
    "helpUrl": "https://www.arduino.cc/reference/en/language/functions/digital-io/noTone/"
  },
  // servo
  {
    "type": "motors_servo",
    "message0": "SERVO %1 pin# %2 angle %3",
    "args0": [
      {
        "type": "field_image",
        "src": "images/servo.png",
        "width": 64,
        "height": 64,
        "alt": "Blue Motor",
        "flipRtl": false
      },
      {
        "type": "input_value",
        "name": "PIN",
        "value": 6,
        "min": 0,
        "max": 13
      },

      {
        "type": "input_value",
        "name": "DEGREE",
        "check": "Number",
        "align": "RIGHT",
        "min": 0,
        "max": 180
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Move between 0~180 degree",
    "helpUrl": "http://www.arduino.cc/playground/ComponentLib/servo"
  },
  // DC Motor
  {
    "type": "motors_dc",
    "message0": "DC MOTOR %1 pin# %2 value %3",
    "args0": [
      {
        "type": "field_image",
        "src": "images/servo.png",
        "width": 64,
        "height": 64,
        "alt": "Blue Motor",
        "flipRtl": false
      },
      {
        "type": "input_value",
        "name": "PIN",
        "value": 0,
        "min": 0,
        "max": 6
      },
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "Number",
        "align": "RIGHT",
        "min": 0,
        "max": 255
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "analogWrite",
    "helpUrl": "http://www.arduino.cc/playground/ComponentLib/servo",
    "extensions": ['test_max']
  },
  // button
  {
    "type": "boolean_button",
    "message0": "BUTTON pin# %1",
    "args0": [
      {
        "type": "field_number",
        "name": "PIN",
        "value": 2,
        "min": 0,
        "max": 13
      }
    ],
    // "inputsInline": false,
    // "previousStatement": null,
    // "nextStatement": null,
    "output": "Boolean",
    "colour": 180,
    "tooltip": "I am a button",
    "helpUrl": "http://www.arduino.cc/playground/ComponentLib/servo"
  },
  {
    "type": "sensors_button",
    "message0": "BUTTON %1 pin# %2 status %3",
    "args0": [
      {
        "type": "field_image",
        "src": "https://www.gstatic.com/codesite/ph/images/star_on.gif",
        "width": 32,
        "height": 32,
        "alt": "Buzzer",
        "flipRtl": false
      },
      {
        "type": "input_value",
        "name": "PIN",
        "value": 2,
        "min": 0,
        "max": 13
      },
      {
        "type": "input_value",
        "name": "STATUS",
        "check": "Boolean",
        "align": "RIGHT"
      }
    ],
    "inputsInline": false,
    "output": "Boolean",
    "colour": 180,
    "helpUrl": "%{BKY_LOGIC_COMPARE_HELPURL}",
    "extensions": ["logic_compare"]
  },
  // ultrasonic
  {
    "type": "sensors_sonic",
    "message0": "ULTRASONIC trigger# %2 %1 echo# %3",
    "args0": [
      {
        "type": "field_image",
        "src": "images/sonic.png",
        "width": 96,
        "height": 64,
        "alt": "Ultrasonic HS-401",
        "flipRtl": false
      },
      {
        "type": "input_value",
        "name": "ECHO",
        "value": 3,
        "min": 0,
        "max": 13
      },
      {
        "type": "input_value",
        "name": "TRIGGER",
        "value": 4,
        "min": 0,
        "max": 13,
        "align": "RIGHT"
      },
    ],
    "inputsInline": false,
    "colour": 180,
    "output": ["Number", "Long"],
    "tooltip": "Seeing with sound",
    "helpUrl": "http://www.arduino.cc/playground/ComponentLib/servo"
  },
  // math functions
  {
    "type": "math_arithmetic",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "check": "Number"
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["%{BKY_MATH_ADDITION_SYMBOL}", "ADD"],
          ["%{BKY_MATH_SUBTRACTION_SYMBOL}", "MINUS"],
          ["%{BKY_MATH_MULTIPLICATION_SYMBOL}", "MULTIPLY"],
          ["%{BKY_MATH_DIVISION_SYMBOL}", "DIVIDE"],
          ["%{BKY_MATH_MODULO_SYMBOL}", "MODULO"],
          ["%{BKY_MATH_POWER_SYMBOL}", "POWER"],
        ]
      },
      {
        "type": "input_value",
        "name": "B",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "style": "operators_blocks",
    "helpUrl": "%{BKY_MATH_ARITHMETIC_HELPURL}",
    // "extensions": ["math_op_tooltip"]
  },
  {
    "type": "math_single",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["%{BKY_MATH_SINGLE_OP_ROOT}", 'ROOT'],
          ["%{BKY_MATH_SINGLE_OP_ABSOLUTE}", 'ABS'],
          ['-', 'NEG'],
        ]
      },
      {
        "type": "input_value",
        "name": "NUM",
        "check": "Number"
      }
    ],
    "output": "Number",
    "style": "operators_blocks",
    "helpUrl": "%{BKY_MATH_SINGLE_HELPURL}",
    "extensions": ["math_op_tooltip"]
  },
  {
    "type": "math_trig",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["%{BKY_MATH_TRIG_SIN}", "SIN"],
          ["%{BKY_MATH_TRIG_COS}", "COS"],
          ["%{BKY_MATH_TRIG_TAN}", "TAN"],
        ]
      },
      {
        "type": "input_value",
        "name": "NUM",
        "check": "Number"
      }
    ],
    "output": "Number",
    "style": "operators_blocks",
    "helpUrl": "%{BKY_MATH_TRIG_HELPURL}",
    "extensions": ["math_op_tooltip"]
  },
  {
    "type": "math_constant",
    "message0": "%1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "CONSTANT",
        "options": [
          ["\u03c0", "PI"],
          ["e", "E"],
          ["\u03c6", "GOLDEN_RATIO"],
        ]
      }
    ],
    "output": "Number",
    "style": "operators_blocks",
    "tooltip": "%{BKY_MATH_CONSTANT_TOOLTIP}",
    "helpUrl": "%{BKY_MATH_CONSTANT_HELPURL}"
  },
  {
    "type": "operators_map",
    "message0": "MAP  - value %1 from LOW %2 HIGH %3 to MIN %4 MAX %5",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "OLD_LOW",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "OLD_HIGH",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "NEW_LOW",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "NEW_HIGH",
        "check": "Number",
        "align": "RIGHT"
      }
    ],
    "inputsInline": false,
    "output": "Number",
    "style": "operators_blocks",
    "helpUrl": "%{BKY_MATH_ARITHMETIC_HELPURL}",
    // "extensions": ["math_op_tooltip"]
  },
  {
    "type": "math_number",
    "message0": "%1",
    "args0": [{
      "type": "field_number",
      "name": "NUM",
      "value": 0
    }],
    "output": number_types,
    "helpUrl": "%{BKY_MATH_NUMBER_HELPURL}",
    "style": "math_blocks",
    "tooltip": "%{BKY_MATH_NUMBER_TOOLTIP}",
    "extensions": ["parent_tooltip_when_inline"]
  },
  // Block for variable getter.
  {
    "type": "variables_get_dynamic",
    "message0": "%1 %2",
    "args0": [{
      "type": "field_label_serializable",
      "name": "TYPE",
      "text": ''
    },
    {
      "type": "field_variable",
      "name": "VAR",
      "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
    }],
    "output": null,
    "style": "variable_dynamic_blocks",
    "helpUrl": "%{BKY_VARIABLES_GET_HELPURL}",
    "tooltip": "%{BKY_VARIABLES_GET_TOOLTIP}",
    "extensions": ["contextMenu_variableDynamicSetterGetter"]
  },
  // Block for variable setter.
  {
    "type": "variables_set_dynamic",
    "message0": "%{BKY_VARIABLES_SET}",
    "args0": [{
      "type": "field_variable",
      "name": "VAR",
      "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
    },
    {
      "type": "input_value",
      "name": "VALUE"
    }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "variable_dynamic_blocks",
    "tooltip": "%{BKY_VARIABLES_SET_TOOLTIP}",
    "helpUrl": "%{BKY_VARIABLES_SET_HELPURL}",
    "extensions": ["contextMenu_variableDynamicSetterGetter"]
  },
  // Block for if/elseif/else condition.
  {
    "type": "controls_if",
    "message0": "%{BKY_CONTROLS_IF_MSG_IF} %1",
    "args0": [
      {
        "type": "input_value",
        "name": "IF0",
        "check": "Boolean"
      }
    ],
    "message1": "%{BKY_CONTROLS_IF_MSG_THEN} %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "DO0"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "control_blocks",
    "helpUrl": "%{BKY_CONTROLS_IF_HELPURL}",
    "mutator": "controls_if_mutator",
    "extensions": ["controls_if_tooltip"]
  },
]);

Blockly.Blocks['boolean_onoff'] = {
  init: function () {
    this.setHelpUrl('http://arduino.cc/en/Reference/Constants');
    this.setColour('#c6a0ec');
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["On", "HIGH"], ["Off", "LOW"]]), 'BOOL')
    this.setOutput(true, 'Boolean');
    this.setTooltip('');
  }
};

Blockly.Blocks['boolean_pressed'] = {
  init: function () {
    this.setHelpUrl('http://arduino.cc/en/Reference/Constants');
    this.setColour(180);
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["Pressed", "LOW"], ["Not Pressed", "HIGH"]]), 'BOOL')
    this.setOutput(true, 'Boolean');
    this.setTooltip('');
  }
};

Blockly.Blocks['controls_delay'] = {
  helpUrl: 'http://arduino.cc/en/Reference/delay',
  init: function () {
    this.setColour(60);
    this.appendValueInput("DELAY_TIME", 'Number')
      .appendField("delay")
      .setCheck('Number');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Pause instruction for specific time');
  }
};

Blockly.Blocks['boolean_hilo'] = {
  init: function () {
    this.setHelpUrl('http://arduino.cc/en/Reference/Constants');
    this.setColour('#c6a0ec');
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), 'BOOL')
    this.setOutput(true, 'Boolean');
    this.setTooltip('');
  }
};

Blockly.Blocks['serial_print'] = {
  init: function () {
    this.setHelpUrl(Blockly.Msg.SERIAL_PRINT_HELPURL);
    // this.setColour(Blockly.Blocks.serial.HUE);
    this.appendValueInput("CONTENT")
      .setCheck(["Number", "String"])
      .appendField(Blockly.Msg.SERIAL_PRINT_APPENDTEXT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.SERIAL_PRINT_TOOLTIP);
  }
};

Blockly.Blocks['serial_read'] = {
  init: function () {
    this.setHelpUrl(Blockly.Msg.SERIAL_READ_HELPURL);
    // this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.SERIAL_READ_APPENDTEXT);
    this.setOutput(true, ["Number", "String"]);
    this.setTooltip(Blockly.Msg.SERIAL_READ_TOOLTIP);
  }
};

Blockly.Blocks['serial_byte_number'] = {
  init: function () {
    this.setHelpUrl(Blockly.Msg.SERIAL_READ_HELPURL);
    // this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.SERIAL_BYTE_NUMBER_TEXT1)
      .appendField(new Blockly.FieldDropdown([["0", "48"], ["1", "49"], ["2", "50"], ["3", "51"], ["4", "52"], ["5", "53"], ["6", "54"], ["7", "55"], ["8", "56"], ["9", "57"]]), "NUM")
      .appendField(Blockly.Msg.SERIAL_BYTE_NUMBER_TEXT2);
    this.setOutput(true, "NUMBER");
    this.setTooltip(Blockly.Msg.SERIAL_READ_TOOLTIP);
  }
};

Blockly.Blocks['serial_available'] = {
  init: function () {
    this.setHelpUrl(Blockly.Msg.SERIAL_AVAILABLE_HELPURL);
    // this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.SERIAL_AVAILABLE_APPENDTEXT);
    this.setOutput(true, "Number");
    this.setTooltip(Blockly.Msg.SERIAL_AVAILABLE_TOOLTIP);
  }
};

Blockly.Blocks['serial_println'] = {
  init: function () {
    this.setHelpUrl(Blockly.Msg.SERIAL_PRINTLN_HELPURL);
    this.setColour('#ccc');
    this.appendValueInput("CONTENT")
      .setCheck(["Number", "String"])
      .appendField('SERIAL print line');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Blockly.Msg.SERIAL_PRINTLN_TOOLTIP');
  }
};

Blockly.Blocks['extra_logic'] = {
  /**
   * Block for logical operations: 'xor', 'nor'.
   * @this Blockly.Block
   */
  init: function () {
    var OPERATORS =
      [['XOR', 'XOR'],
      ['NOR', 'NOR']];
    this.setHelpUrl(Blockly.Msg.LOGIC_OPERATION_HELPURL);
    this.setColour('#ffa555');
    this.setOutput(true, 'Boolean');
    this.appendValueInput('A')
      .setCheck('Boolean');
    this.appendValueInput('B')
      .setCheck('Boolean')
      .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function () {
      var op = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'XOR': 'bazinga',
        'NOR': 'bazinga'
      };
      return TOOLTIPS[op];
    });
  }
};

Blockly.Blocks['pulsein'] = {
  init: function () {
    this.setHelpUrl('https://www.arduino.cc/reference/en/language/functions/advanced-io/pulsein/');
    this.setColour(230);
    this.appendValueInput("pin")
      .setCheck(["Number"])
      .appendField('Wait for pulse on pin');
    this.appendValueInput("type")
      .setCheck(["Boolean"])
      .appendField('of strength');
    this.appendValueInput("timeout")
      .setCheck(["Number"])
      .appendField('for');
    this.appendDummyInput().appendField('nanoseconds')
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setTooltip('');
  }
};

Blockly.Blocks['SSD1306_clear'] = {
  init: function () {
    this.setTooltip('Clear the currently rendered framebuffer.');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.appendDummyInput()
      .appendField("Clear LCD display");
    this.setStyle("ezDisplay_blocks");
    this.setHelpUrl("https://github.com/datacute/Tiny4kOLED");
  }
};

Blockly.Blocks['SSD1306_print'] = {
  init: function () {
    this.setTooltip('Write some text to the currently written framebuffer.');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.appendValueInput("CONTENT")
      .setCheck(["Number", "String"])
      .appendField('Print');
    this.appendDummyInput().appendField("to LCD")
    this.setStyle("ezDisplay_blocks");
    this.setHelpUrl("https://github.com/datacute/Tiny4kOLED");
  }
};

Blockly.Blocks['SSD1306_font'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ["Default font (6x8)", "FONT8X16"],
        ["Default font (8x16)", "FONT6X8"],
        ["11x16 font", "FONT11X16"],
        ["5x5 font", "FONT5X5"],
        ["7 segment style", "FONT7LINEDIGITAL"],
        ["Acme 5 outlines", "FONTACME5OUTLINES"],
        ["Atari 8x16", "FONT8X16ATARI"],
        ["Aztech", "FONTAZTECH"],
        ["Blokus", "FONTBLOKUS"],
        ["BM Plain", "FONTBMPLAIN"],
        ["BMSPA", "FONTBMSPA"],
        ["Boxes (for drawing outlines)", "&cp_437_box_drawing_font"],
        ["Bubbles Standard", "FONTBUBBLESSTANDARD"],
        ["Commo Monospaced", "FONTCOMMOMONOSPACED"],
        ["Crackers", "FONTCRACKERS"],
        ["Formplex 12pt", "FONTFORMPLEX12"],
        ["Giant digits (16x32)", "FONT16X32DIGITS"],
        ["Haiku", "FONTHAIKU"],
        ["HISKYF21", "FONTHISKYF21"],
        ["Homespun", "FONTHOMESPUN"],
        ["HUNTER", "FONTHUNTER"],
        ["m38", "FONTM38"],
        ["Minimum (outline)", "FONTMINIMUM1"],
        ["Minimum", "FONTMINIMUM"],
        ["Modern DOS (8x16)", "FONT8X16MDOS"],
        ["Modern DOS (8x8)", "FONT8X8MDOS"],
        ["Pixel Operator Bold", "FONT8X16POB"],
        ["Pixel Operator", "FONT8X16PO"],
        ["pzim (3x5)", "FONTPZIM3X5"],
        ["Raumsond", "FONTRAUMSOND"],
        ["Renew", "FONTRENEW"],
        ["Simplified Chinese 16x16", "&ssd1306xled_font16x16cn"],  // will the different locale (GBK) work with utf-8?
        ["Sloth", "FONTSLOTH"],
        ["SUPERDIG", "FONTSUPERDIG"],
        ["Tama Mini 02", "FONTTAMAMINI02"],
        ["zxpix", "FONTZXPIX"]
      ]), 'FONT')
    this.setOutput(true, 'DCFont');  // this is the C type of the fonts, so we will use it here
    this.setTooltip('');
    this.setStyle("ezDisplay_blocks");
    this.setHelpUrl("https://github.com/datacute/TinyOLED-Fonts");
  }
};

Blockly.Blocks['SSD1306_set_font'] = {
  init: function () {
    this.setTooltip('Set the font used for printing text.');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.appendValueInput("FONT")
      .setCheck(["DCFont"])
      .appendField('Set the LCD font to');
    this.setStyle("ezDisplay_blocks");
    this.setHelpUrl("https://github.com/datacute/Tiny4kOLED");
  }
};

Blockly.Blocks['SSD1306_set_cursor'] = {
  init: function () {
    this.setTooltip('Move the origin from which drawing will occur.');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.appendValueInput("X")
      .setCheck(["Number"])
      .appendField('Move the LCD cursor to (');
    this.appendValueInput("Y")
      .setCheck(["Number"])
      .appendField(', ');
    this.appendDummyInput().appendField(" × 8)")
    this.setStyle("ezDisplay_blocks");
    this.setHelpUrl("https://github.com/datacute/Tiny4kOLED");
  }
};

Blockly.Blocks['SSD1306_print_image'] = {
  init: function () {
    this.setTooltip('Upload image hex to display on screen and set image location and size.');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.appendValueInput("CONTENT")
      .setCheck(["Number", "String"])
      .appendField('Input hex string');
    this.appendValueInput("X")
      .setCheck(["Number"])
      .appendField('. Set image location (');
    this.appendValueInput("Y")
      .setCheck(["Number"])
      .appendField(', ');
    this.appendValueInput("W")
      .setCheck(["Number"])
      .appendField('× 8) with size (');
    this.appendValueInput("H")
      .setCheck(["Number"])
      .appendField(',');
    this.appendDummyInput().appendField("× 8)")
    this.setStyle("ezDisplay_blocks");
    this.setHelpUrl("https://github.com/datacute/Tiny4kOLED");
  }
};

Blockly.Blocks['SSD1306_framebuffer_img'] = {
  init: function () {
    this.setTooltip('Buffer the frame to switch the imaginary (print to) arrow.');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.appendDummyInput()
      .appendField("Switch imaginary arrow.");
    this.setStyle("ezDisplay_blocks");
    this.setHelpUrl("https://github.com/datacute/Tiny4kOLED");
  }
};

Blockly.Blocks['SSD1306_framebuffer_real'] = {
  init: function () {
    this.setTooltip('Buffer the frame to switch the real (display) arrow.');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.appendDummyInput()
      .appendField("Switch real arrow.");
    this.setStyle("ezDisplay_blocks");
    this.setHelpUrl("https://github.com/datacute/Tiny4kOLED");
  }
};

Blockly.Blocks['SSD1306_framebuffer_both'] = {
  init: function () {
    this.setTooltip('Buffer the frame to switch both the imaginary and real arrows.');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.appendDummyInput()
      .appendField("Switch both imaginary and real arrows.");
    this.setStyle("ezDisplay_blocks");
    this.setHelpUrl("https://github.com/datacute/Tiny4kOLED");
  }
};

Blockly.Extensions.register('test_max',
  function () {
    // this refers to the block that the extension is being run on
    console.log('running test_max:', this);
  });