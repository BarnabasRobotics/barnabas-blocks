/**
 * Visual Blocks Language
 *
 * Copyright 2012 Fred Lin.
 * https://github.com/gasolin/BlocklyDuino
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating Arduino blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */

'use strict';

goog.provide('Blockly.Arduino.times');

goog.require('Blockly.Arduino');

Blockly.Arduino['delay'] = function(block) {
  var delay_time = block.getFieldValue('DELAY_TIME');
  var code = 'delay(' + delay_time + ');\n';
  return code;
};

Blockly.Arduino['delay_custom'] = function(block) {
  var delay_time = Blockly.Arduino.valueToCode(block, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '1000'
  var code = 'delay(' + delay_time + ');\n';
  return code;
};

Blockly.Arduino['delayMicroseconds_custom'] = function(block) {
  var delay_time = Blockly.Arduino.valueToCode(block, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '1000'
  var code = 'delayMicroseconds(' + delay_time + ');\n';
  return code;
};

Blockly.Arduino['delayMicroseconds'] = function(block) {
  var delay_time = block.getFieldValue('DELAY_TIME');
  var code = 'delayMicroseconds(' + delay_time + ');\n';
  return code;
};

Blockly.Arduino['millis'] = function(block) {
  var code = 'millis()';
  return [code,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['micros'] = function(block) {
  var code = 'micros()';
  return [code,Blockly.Arduino.ORDER_ATOMIC];
};
