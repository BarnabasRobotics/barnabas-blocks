// Do not edit this file; automatically generated by gulp.

/* eslint-disable */
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) { // AMD
    define(['./blockly_compressed.js'], factory);
  } else if (typeof exports === 'object') { // Node.js
    module.exports = factory(require('./blockly_compressed.js'));
  } else { // Browser
    root.Blockly.Arduino = factory(root.Blockly);
  }
}(this, function(Blockly) {
  'use strict';Blockly.Arduino=new Blockly.Generator("Arduino");Blockly.Arduino.addReservedWords("setup,loop,if,else,for,switch,case,while,do,break,continue,return,goto,define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,interger, constants,floating,point,void,bookean,char,unsigned,byte,int,word,long,float,double,string,String,array,static, volatile,const,sizeof,pinMode,digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,detachInterrupt,interrupts,noInterrupts");
Blockly.Arduino.ORDER_ATOMIC=0;Blockly.Arduino.ORDER_UNARY_POSTFIX=1;Blockly.Arduino.ORDER_UNARY_PREFIX=2;Blockly.Arduino.ORDER_MULTIPLICATIVE=3;Blockly.Arduino.ORDER_ADDITIVE=4;Blockly.Arduino.ORDER_SHIFT=5;Blockly.Arduino.ORDER_RELATIONAL=6;Blockly.Arduino.ORDER_EQUALITY=7;Blockly.Arduino.ORDER_BITWISE_AND=8;Blockly.Arduino.ORDER_BITWISE_XOR=9;Blockly.Arduino.ORDER_BITWISE_OR=10;Blockly.Arduino.ORDER_LOGICAL_AND=11;Blockly.Arduino.ORDER_LOGICAL_OR=12;Blockly.Arduino.ORDER_CONDITIONAL=13;
Blockly.Arduino.ORDER_ASSIGNMENT=14;Blockly.Arduino.ORDER_COMMA=15;Blockly.Arduino.ORDER_UNARY_NEGATION=16;Blockly.Arduino.ORDER_MEMBER=17;Blockly.Arduino.ORDER_FUNCTION_CALL=18;Blockly.Arduino.ORDER_NONE=99;
var profile={common:{number_type:"Number Byte Unsigned_Int Long Unsigned_Long Word Char Float Double Volatile_Int".split(" ")},arduino:{description:"Arduino standard-compatible board",digital:[["0","0"],["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"],["9","9"],["10","10"],["11","11"],["12","12"],["13","13"],["A0","A0"],["A1","A1"],["A2","A2"],["A3","A3"],["A4","A4"],["A5","A5"]],analog:[["A0","A0"],["A1","A1"],["A2","A2"],["A3","A3"],["A4","A4"],["A5","A5"]],grove_analog:[["A0",
"A0"],["A1","A1"],["A2","A2"],["A3","A3"]],pwm:[["3","3"],["5","5"],["6","6"],["9","9"],["10","10"],["11","11"]],serial:9600,tone:[["C:\u30c9","262"],["D:\u30ec","294"],["E:\u30df","330"],["F:\u30d5\u30a1","349"],["G:\u30bd","392"],["A:\u30e9","440"],["B:\u30b7","494"],["C:\u30c9","523"]],lcd:[["-","-"],["0","0"],["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"],["9","9"],["10","10"],["11","11"],["12","12"],["13","13"],["A0","A0"],["A1","A1"],["A2","A2"],["A3","A3"],
["A4","A4"],["A5","A5"]],dht:[["DHT11","DHT11"],["DHT21","DHT21"],["DHT22","DHT22"]],i2c_matrix_type:[["8x8","8x8matrix"],["16x8","8x16matrix"],["bi_color8x8","BicolorMatrix"]],led_backpack_address:[["0x70","0x70"],["0x71","0x71"],["0x72","0x72"],["0x73","0x73"]],blynk_merge_index:[["0","0"],["1","1"],["2","2"]],grove_digital:[["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"]],shield_bot_sensor:[["1","1"],["2","2"],["3","3"],["4","4"],["5","5"]],interrupt:[["2","0"],["3","1"]]},
arduino_mega:{description:"Arduino Mega-compatible board"}};profile["default"]=profile.arduino;
Blockly.Arduino.init=function(a){Blockly.Arduino.definitions_=Object.create(null);Blockly.Arduino.functionNames_=Object.create(null);Blockly.Arduino.setups_=Object.create(null);Blockly.Arduino.loop_=Object.create(null);Blockly.Arduino.variableDB_?Blockly.Arduino.variableDB_.reset():Blockly.Arduino.variableDB_=new Blockly.Names(Blockly.Arduino.RESERVED_WORDS_);Blockly.Arduino.variableDB_.setVariableMap(a.getVariableMap());for(var b=[],c=Blockly.Variables.allDeveloperVariables(a),d=0;d<c.length;d++)b.push(Blockly.Arduino.variableDB_.getName(c[d],
Blockly.Names.DEVELOPER_VARIABLE_TYPE));a=Blockly.Variables.allUsedVarModels(a);for(d=0;d<a.length;d++)b.push(a[d].type.toLowerCase()+" "+a[d].name);b.length&&(Blockly.Arduino.definitions_.variables=b.join(";\n")+";\n")};
Blockly.Arduino.finish=function(a){a=a.replace(/\n/g,"\n  ");a=a.replace(/\n\s+$/,"\n");a="\n\n/***** OUTSIDE BLOCKS *****\n{\n"+a+"\n}\n** END OUTSIDE BLOCKS *****/";var b=Blockly.Arduino.loop_;b="  "+b.replace(/\n/g,"\n  ");b=b.replace(/\n\s+$/,"\n");b="void loop() \n{\n"+b+"\n}";var c=[],d=[],e;for(e in Blockly.Arduino.definitions_){var f=Blockly.Arduino.definitions_[e];f.match(/^#include/)?c.push(f):d.push(f)}f=[];for(e in Blockly.Arduino.setups_)f.push(Blockly.Arduino.setups_[e]);return(c.join("\n")+
"\n\n"+d.join("\n")+"\nvoid setup() \n{\n  "+f.join("\n  ")+"\n}\n\n").replace(/\n\n+/g,"\n\n").replace(/\n*$/,"\n\n\n")+b+a};Blockly.Arduino.scrubNakedValue=function(a){return a+";\n"};Blockly.Arduino.quote_=function(a){a=a.replace(/\\/g,"\\\\").replace(/\n/g,"\\\n").replace(/\$/g,"\\$").replace(/'/g,"\\'");return'"'+a+'"'};
Blockly.Arduino.scrub_=function(a,b){if(null===b)return"";var c="";if(!a.outputConnection||!a.outputConnection.targetConnection){var d=a.getCommentText();d&&(c+=Blockly.Arduino.prefixLines(d,"// ")+"\n");for(var e=0;e<a.inputList.length;e++)a.inputList[e].type==Blockly.INPUT_VALUE&&(d=a.inputList[e].connection.targetBlock())&&(d=Blockly.Arduino.allNestedComments(d))&&(c+=Blockly.Arduino.prefixLines(d,"// "))}a=a.nextConnection&&a.nextConnection.targetBlock();a=Blockly.Arduino.blockToCode(a);return c+
b+a};/*

 Visual Blocks Language

 Copyright 2012 Google Inc.
 https://developers.google.com/blockly/

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
Blockly.Arduino.array={};Blockly.Arduino.array_create_with=function(a){for(var b=Array(a.itemCount_),c=0;c<a.itemCount_;c++)b[c]=Blockly.Arduino.valueToCode(a,"ADD"+c,Blockly.Arduino.ORDER_COMMA)||"null";b="{"+b.join(", ")+"}";return[b,Blockly.Arduino.ORDER_ATOMIC]};
Blockly.Arduino.array_getIndex=function(a){var b=Blockly.Arduino.valueToCode(a,"AT",Blockly.Arduino.ORDER_UNARY_NEGATION)||"1";a=Blockly.Arduino.valueToCode(a,"ITEM",Blockly.Arduino.ORDER_MEMBER)||"[]";Blockly.isNumber(b)&&(b=parseFloat(b)-1);return[a+"["+b+"]",Blockly.Arduino.ORDER_MEMBER]};Blockly.Arduino.boolean={};Blockly.Arduino.boolean_onoff=function(a){return["HIGH"==a.getFieldValue("BOOL")?"HIGH":"LOW",Blockly.Arduino.ORDER_ATOMIC]};Blockly.Arduino.boolean_hilo=function(a){return["HIGH"==a.getFieldValue("BOOL")?"HIGH":"LOW",Blockly.Arduino.ORDER_ATOMIC]};Blockly.Arduino.boolean_pressed=Blockly.Arduino.boolean_onoff;
Blockly.Arduino.boolean_button=function(a){a=Blockly.Arduino.valueToCode(a,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"2";0<a&&(Blockly.Arduino.setups_["setup_output_"+a]="pinMode("+a+", INPUT_PULLUP);");return["digitalRead("+a+")",Blockly.Arduino.ORDER_ATOMIC]};Blockly.Arduino.cast={};Blockly.Arduino.cast_number=function(a){var b=a.getFieldValue("TYPE");a=Blockly.Arduino.valueToCode(a,"VAR",Blockly.Arduino.ORDER_ATOMIC)||"0";return[b+" "+a,Blockly.Arduino.ORDER_ATOMIC]};Blockly.Arduino.controls={};Blockly.Arduino.controls_wait=function(a){return"delay("+Math.round(1E3*Blockly.Arduino.valueToCode(a,"DELAY_TIME",Blockly.Arduino.ORDER_ATOMIC))+");\n"};
Blockly.Arduino.controls_repeat_times=function(a){var b=Blockly.Arduino.valueToCode(a,"TIMES",Blockly.Arduino.ORDER_ATOMIC),c=Blockly.Arduino.statementToCode(a,"DO");c=Blockly.Arduino.addLoopTrap(c,a.id);a=Blockly.Arduino.variableDB_.getDistinctName("count",Blockly.Variables.NAME_TYPE);return"for (int "+a+" = 0; "+a+" < "+b+"; "+a+"++) {\n"+c+"}\n"};
Blockly.Arduino.controls_setup=function(a){var b=Blockly.Arduino.statementToCode(a,"SETUP");a=Blockly.Arduino.statementToCode(a,"LOOP");Blockly.Arduino.setups_.setup=b;Blockly.Arduino.loop_=a;return""};Blockly.Arduino.controls_delay=function(a){return"delay("+(Blockly.Arduino.valueToCode(a,"DELAY_TIME",Blockly.Arduino.ORDER_ATOMIC)||"1000")+");\n"};Blockly.Arduino.controls_loop=function(a){a=Blockly.Arduino.statementToCode(a,"LOOP");Blockly.Arduino.loop_=a;return""};Blockly.Arduino.inout={};Blockly.Arduino.inout_buildin_led=function(a){a=a.getFieldValue("STAT");Blockly.Arduino.setups_.setup_output_13="pinMode(13, OUTPUT);";return"digitalWrite(13, "+a+");\n"};Blockly.Arduino.inout_digital_write=function(a){var b=a.getFieldValue("PIN");a=a.getFieldValue("STAT");Blockly.Arduino.setups_["setup_output_"+b]="pinMode("+b+", OUTPUT);";return"digitalWrite("+b+", "+a+");\n"};
Blockly.Arduino.inout_custom_digital_write=function(a){var b=Blockly.Arduino.valueToCode(a,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"13";a=Blockly.Arduino.valueToCode(a,"STAT",Blockly.Arduino.ORDER_ATOMIC)||"HIGH";0<profile.default.digital.indexOf(b)&&(Blockly.Arduino.setups_["setup_output_"+b]="pinMode("+b+", OUTPUT);");return"digitalWrite("+b+", "+a+");\n"};
Blockly.Arduino.inout_digital_read=function(a){var b=a.getFieldValue("PIN");a=a.getFieldValue("INPUT_MODE");Blockly.Arduino.setups_["setup_input_"+b]="pinMode("+b+", "+a+");";return["digitalRead("+b+")",Blockly.Arduino.ORDER_ATOMIC]};Blockly.Arduino.inout_analog_write=function(a){var b=a.getFieldValue("PIN");a=Blockly.Arduino.valueToCode(a,"NUM",Blockly.Arduino.ORDER_ATOMIC)||"255";return"analogWrite("+b+", "+a+");\n"};
Blockly.Arduino.inout_analog_read=function(a){return["analogRead("+a.getFieldValue("PIN")+")",Blockly.Arduino.ORDER_ATOMIC]};Blockly.Arduino.inout_highlow=function(a){return["HIGH"==a.getFieldValue("BOOL")?"HIGH":"LOW",Blockly.Arduino.ORDER_ATOMIC]};
Blockly.Arduino.pulsein=function(a){var b=a.getFieldValue("PIN"),c=a.getFieldValue("TIMEOUT");a="HIGH"==a.getFieldValue("type")?"HIGH":"LOW";console.log(c);Blockly.Arduino.setups_["setup_output_"+b]="pinMode("+b+", INPUT);";return[0<c?"pulseIn("+b+","+a+","+c+")":"pulseIn("+b+","+a+")",Blockly.Arduino.ORDER_ATOMIC]};Blockly.Arduino.inout_digitalpin=function(a){a=a.getFieldValue("PIN");Blockly.Arduino.setups_["setup_output_"+a]="pinMode("+a+", OUTPUT);";return[a,Blockly.Arduino.ORDER_ATOMIC]};
Blockly.Arduino.inout_analogpin=function(a){return[a.getFieldValue("PIN"),Blockly.Arduino.ORDER_ATOMIC]};Blockly.Arduino.lights={};Blockly.Arduino.lights_led=function(a){var b=Blockly.Arduino.valueToCode(a,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"13";a=Blockly.Arduino.valueToCode(a,"STATUS",Blockly.Arduino.ORDER_ATOMIC)||"HIGH";0<b&&(Blockly.Arduino.setups_["setup_output_"+b]="pinMode("+b+", OUTPUT);");return"digitalWrite("+b+", "+a+");\n"};Blockly.Arduino.logic={};Blockly.Arduino.controls_if=function(a){var b=0,c=Blockly.Arduino.valueToCode(a,"IF"+b,Blockly.Arduino.ORDER_NONE)||"false",d=Blockly.Arduino.statementToCode(a,"DO"+b),e="if ("+c+") {\n"+d+"\n}";for(b=1;b<=a.elseifCount_;b++)c=Blockly.Arduino.valueToCode(a,"IF"+b,Blockly.Arduino.ORDER_NONE)||"false",d=Blockly.Arduino.statementToCode(a,"DO"+b),e+=" else if ("+c+") {\n"+d+"}";a.elseCount_&&(d=Blockly.Arduino.statementToCode(a,"ELSE"),e+=" else {\n"+d+"\n}");return e+"\n"};
Blockly.Arduino.logic_compare=function(a){var b=a.getFieldValue("OP");b=Blockly.Arduino.logic_compare.OPERATORS[b];var c="=="==b||"!="==b?Blockly.Arduino.ORDER_EQUALITY:Blockly.Arduino.ORDER_RELATIONAL,d=Blockly.Arduino.valueToCode(a,"A",c)||"0";a=Blockly.Arduino.valueToCode(a,"B",c)||"0";return[d+" "+b+" "+a,c]};Blockly.Arduino.logic_compare.OPERATORS={EQ:"==",NEQ:"!=",LT:"<",LTE:"<=",GT:">",GTE:">="};
Blockly.Arduino.logic_operation=function(a){var b="AND"==a.getFieldValue("OP")?"&&":"||",c="&&"==b?Blockly.Arduino.ORDER_LOGICAL_AND:Blockly.Arduino.ORDER_LOGICAL_OR,d=Blockly.Arduino.valueToCode(a,"A",c)||"false";a=Blockly.Arduino.valueToCode(a,"B",c)||"false";return[d+" "+b+" "+a,c]};Blockly.Arduino.logic_negate=function(a){var b=Blockly.Arduino.ORDER_UNARY_PREFIX;return["!"+(Blockly.Arduino.valueToCode(a,"BOOL",b)||"false"),b]};
Blockly.Arduino.logic_boolean=function(a){return["TRUE"==a.getFieldValue("BOOL")?"true":"false",Blockly.Arduino.ORDER_ATOMIC]};Blockly.Arduino.logic_null=function(a){return["NULL",Blockly.Arduino.ORDER_ATOMIC]};Blockly.Arduino.loops={};
Blockly.Arduino.controls_for=function(a){var b=Blockly.Arduino.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE),c=Blockly.Arduino.valueToCode(a,"FROM",Blockly.Arduino.ORDER_ASSIGNMENT)||"0",d=Blockly.Arduino.valueToCode(a,"TO",Blockly.Arduino.ORDER_ASSIGNMENT)||"0",e=Blockly.Arduino.statementToCode(a,"DO");Blockly.Arduino.INFINITE_LOOP_TRAP&&(e=Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,"'"+a.id+"'")+e);c.match(/^-?\d+(\.\d+)?$/)&&d.match(/^-?\d+(\.\d+)?$/)?(a=parseFloat(c)<=
parseFloat(d),e="for ("+b+" = "+c+"; "+b+(a?" <= ":" >= ")+d+"; "+b+(a?"++":"--")+") {\n"+e+"}\n"):(e="",a=c,c.match(/^\w+$/)||c.match(/^-?\d+(\.\d+)?$/)||(a=Blockly.Arduino.variableDB_.getDistinctName(b+"_start",Blockly.Variables.NAME_TYPE),e+="int "+a+" = "+c+";\n"),c=d,d.match(/^\w+$/)||d.match(/^-?\d+(\.\d+)?$/)||(c=Blockly.Arduino.variableDB_.getDistinctName(b+"_end",Blockly.Variables.NAME_TYPE),e+="int "+c+" = "+d+";\n"),e+="for ("+b+" = "+a+";\n    ("+a+" <= "+c+") ? "+b+" <= "+c+" : "+b+" >= "+
c+";\n    "+b+" += ("+a+" <= "+c+") ? 1 : -1) {\n"+branch0+"}\n");return e};Blockly.Arduino.controls_whileUntil=function(a){var b="UNTIL"==a.getFieldValue("MODE"),c=Blockly.Arduino.valueToCode(a,"BOOL",Blockly.Arduino.ORDER_NONE)||"false",d=Blockly.Arduino.statementToCode(a,"DO");d=Blockly.Arduino.addLoopTrap(d,a.id);b&&(c="!"+c);return"while ("+c+") {\n"+d+"}\n"};
Blockly.Arduino.controls_while=function(a){var b=Blockly.Arduino.valueToCode(a,"BOOL",Blockly.Arduino.ORDER_NONE)||"false",c=Blockly.Arduino.statementToCode(a,"DO");c=Blockly.Arduino.addLoopTrap(c,a.id);return"while ("+b+") {\n"+c+"}\n"};
Blockly.Arduino.controls_repeat=function(a){var b=Number(a.getFieldValue("TIMES")),c=Blockly.Arduino.statementToCode(a,"DO");c=Blockly.Arduino.addLoopTrap(c,a.id);a=Blockly.Arduino.variableDB_.getDistinctName("count",Blockly.Variables.NAME_TYPE);return"for (int "+a+" = 0; "+a+" < "+b+"; "+a+"++) {\n"+c+"}\n"};Blockly.Arduino.controls_flow_statements=function(a){switch(a.getFieldValue("FLOW")){case "BREAK":return"break;\n";case "CONTINUE":return"continue;\n"}throw"Unknown flow statement.";};
Blockly.Arduino.controls_return=function(a){return"return "+(Blockly.Arduino.valueToCode(a,"VAL",Blockly.Arduino.ORDER_NONE)||"")+";\n"};Blockly.Arduino.math={};Blockly.Arduino.addReservedWords("Math");Blockly.Arduino.math_number=function(a){a=Number(a.getFieldValue("NUM"));if(Infinity==a){a="double.infinity";var b=Blockly.Arduino.ORDER_UNARY_POSTFIX}else-Infinity==a?(a="-double.infinity",b=Blockly.Arduino.ORDER_UNARY_PREFIX):b=0>a?Blockly.Arduino.ORDER_UNARY_PREFIX:Blockly.Arduino.ORDER_ATOMIC;return[a,b]};
Blockly.Arduino.math_arithmetic=function(a){var b={ADD:[" + ",Blockly.Arduino.ORDER_ADDITIVE],MINUS:[" - ",Blockly.Arduino.ORDER_ADDITIVE],MULTIPLY:[" * ",Blockly.Arduino.ORDER_MULTIPLICATIVE],DIVIDE:[" / ",Blockly.Arduino.ORDER_MULTIPLICATIVE],MODULO:[" % ",Blockly.Arduino.ORDER_MULTIPLICATIVE],POWER:[null,Blockly.Arduino.ORDER_NONE]}[a.getFieldValue("OP")],c=b[0];b=b[1];var d=Blockly.Arduino.valueToCode(a,"A",b)||"0";a=Blockly.Arduino.valueToCode(a,"B",b)||"0";return c?[d+c+a,b]:["pow("+d+", "+
a+")",Blockly.Arduino.ORDER_UNARY_POSTFIX]};
Blockly.Arduino.math_single=function(a){var b=a.getFieldValue("OP");if("NEG"==b)return a=Blockly.Arduino.valueToCode(a,"NUM",Blockly.Arduino.ORDER_UNARY_PREFIX)||"0","-"==a[0]&&(a=" "+a),["-"+a,Blockly.Arduino.ORDER_UNARY_PREFIX];a="ABS"==b||"ROUND"==b.substring(0,5)?Blockly.Arduino.valueToCode(a,"NUM",Blockly.Arduino.ORDER_UNARY_POSTFIX)||"0":"SIN"==b||"COS"==b||"TAN"==b?Blockly.Arduino.valueToCode(a,"NUM",Blockly.Arduino.ORDER_MULTIPLICATIVE)||"0":Blockly.Arduino.valueToCode(a,"NUM",Blockly.Arduino.ORDER_NONE)||
"0";switch(b){case "ABS":var c="abs("+a+")";break;case "ROOT":c="sqrt("+a+")";break;case "LN":c="log("+a+")";break;case "EXP":c="Math.exp("+a+")";break;case "POW10":c="Math.pow(10,"+a+")";break;case "ROUND":c=a+".round()";break;case "ROUNDUP":c=a+".ceil()";break;case "ROUNDDOWN":c=a+".floor()";break;case "SIN":c="sin("+a+" * DEG_TO_RAD)";break;case "COS":c="cos("+a+" * DEG_TO_RAD)";break;case "TAN":c="tan("+a+" / 180 * PI)"}if(c)return[c,Blockly.Arduino.ORDER_UNARY_POSTFIX];switch(b){case "LOG10":c=
"log("+a+") / Math.log(10)";break;case "ASIN":c="Math.asin("+a+") / Math.pi * 180";break;case "ACOS":c="Math.acos("+a+") / Math.pi * 180";break;case "ATAN":c="Math.atan("+a+") / Math.pi * 180";break;default:throw Error("Unknown math operator: "+b);}return[c,Blockly.Arduino.ORDER_MULTIPLICATIVE]};
Blockly.Arduino.math_constant=function(a){var b={PI:["PI",Blockly.Arduino.ORDER_UNARY_POSTFIX],E:["EULER",Blockly.Arduino.ORDER_UNARY_POSTFIX],GOLDEN_RATIO:["(1 + sqrt(5)) / 2",Blockly.Arduino.ORDER_MULTIPLICATIVE]};a=a.getFieldValue("CONSTANT");return b[a]};
Blockly.Arduino.math_number_property=function(a){var b=Blockly.Arduino.valueToCode(a,"NUMBER_TO_CHECK",Blockly.Arduino.ORDER_MULTIPLICATIVE);if(!b)return["false",Blockly.Arduino.ORDER_ATOMIC];var c=a.getFieldValue("PROPERTY");if("PRIME"==c)return Blockly.Arduino.definitions_.import_Arduino_math="import 'Arduino:math' as Math;",[Blockly.Arduino.provideFunction_("math_isPrime",["bool "+Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_+"(n) {","  // https://en.wikipedia.org/wiki/Primality_test#Naive_methods",
"  if (n == 2 || n == 3) {","    return true;","  }","  // False if n is null, negative, is 1, or not whole.","  // And false if n is divisible by 2 or 3.","  if (n == null || n <= 1 || n % 1 != 0 || n % 2 == 0 || n % 3 == 0) {","    return false;","  }","  // Check all the numbers of form 6k +/- 1, up to sqrt(n).","  for (var x = 6; x <= Math.sqrt(n) + 1; x += 6) {","    if (n % (x - 1) == 0 || n % (x + 1) == 0) {","      return false;","    }","  }","  return true;","}"])+"("+b+")",Blockly.Arduino.ORDER_UNARY_POSTFIX];
switch(c){case "EVEN":var d=b+" % 2 == 0";break;case "ODD":d=b+" % 2 == 1";break;case "WHOLE":d=b+" % 1 == 0";break;case "POSITIVE":d=b+" > 0";break;case "NEGATIVE":d=b+" < 0";break;case "DIVISIBLE_BY":a=Blockly.Arduino.valueToCode(a,"DIVISOR",Blockly.Arduino.ORDER_MULTIPLICATIVE);if(!a)return["false",Blockly.Arduino.ORDER_ATOMIC];d=b+" % "+a+" == 0"}return[d,Blockly.Arduino.ORDER_EQUALITY]};
Blockly.Arduino.math_change=function(a){var b=Blockly.Arduino.valueToCode(a,"DELTA",Blockly.Arduino.ORDER_ADDITIVE)||"0";a=Blockly.Arduino.variableDB_.getName(a.getFieldValue("VAR"),Blockly.VARIABLE_CATEGORY_NAME);return a+" = ("+a+" is num ? "+a+" : 0) + "+b+";\n"};Blockly.Arduino.math_round=Blockly.Arduino.math_single;Blockly.Arduino.math_trig=Blockly.Arduino.math_single;
Blockly.Arduino.math_on_list=function(a){var b=a.getFieldValue("OP");a=Blockly.Arduino.valueToCode(a,"LIST",Blockly.Arduino.ORDER_NONE)||"[]";switch(b){case "SUM":b=Blockly.Arduino.provideFunction_("math_sum",["num "+Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_+"(List<num> myList) {","  num sumVal = 0;","  myList.forEach((num entry) {sumVal += entry;});","  return sumVal;","}"]);b=b+"("+a+")";break;case "MIN":Blockly.Arduino.definitions_.import_Arduino_math="import 'Arduino:math' as Math;";b=Blockly.Arduino.provideFunction_("math_min",
["num "+Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_+"(List<num> myList) {","  if (myList.isEmpty) return null;","  num minVal = myList[0];","  myList.forEach((num entry) {minVal = Math.min(minVal, entry);});","  return minVal;","}"]);b=b+"("+a+")";break;case "MAX":Blockly.Arduino.definitions_.import_Arduino_math="import 'Arduino:math' as Math;";b=Blockly.Arduino.provideFunction_("math_max",["num "+Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_+"(List<num> myList) {","  if (myList.isEmpty) return null;",
"  num maxVal = myList[0];","  myList.forEach((num entry) {maxVal = Math.max(maxVal, entry);});","  return maxVal;","}"]);b=b+"("+a+")";break;case "AVERAGE":b=Blockly.Arduino.provideFunction_("math_mean",["num "+Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_+"(List myList) {","  // First filter list for numbers only.","  List localList = new List.from(myList);","  localList.removeWhere((a) => a is! num);","  if (localList.isEmpty) return null;","  num sumVal = 0;","  localList.forEach((var entry) {sumVal += entry;});",
"  return sumVal / localList.length;","}"]);b=b+"("+a+")";break;case "MEDIAN":b=Blockly.Arduino.provideFunction_("math_median",["num "+Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_+"(List myList) {","  // First filter list for numbers only, then sort, then return middle value","  // or the average of two middle values if list has an even number of elements.","  List localList = new List.from(myList);","  localList.removeWhere((a) => a is! num);","  if (localList.isEmpty) return null;","  localList.sort((a, b) => (a - b));",
"  int index = localList.length ~/ 2;","  if (localList.length % 2 == 1) {","    return localList[index];","  } else {","    return (localList[index - 1] + localList[index]) / 2;","  }","}"]);b=b+"("+a+")";break;case "MODE":Blockly.Arduino.definitions_.import_Arduino_math="import 'Arduino:math' as Math;";b=Blockly.Arduino.provideFunction_("math_modes",["List "+Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_+"(List values) {","  List modes = [];","  List counts = [];","  int maxCount = 0;","  for (int i = 0; i < values.length; i++) {",
"    var value = values[i];","    bool found = false;","    int thisCount;","    for (int j = 0; j < counts.length; j++) {","      if (counts[j][0] == value) {","        thisCount = ++counts[j][1];","        found = true;","        break;","      }","    }","    if (!found) {","      counts.add([value, 1]);","      thisCount = 1;","    }","    maxCount = Math.max(thisCount, maxCount);","  }","  for (int j = 0; j < counts.length; j++) {","    if (counts[j][1] == maxCount) {","        modes.add(counts[j][0]);",
"    }","  }","  return modes;","}"]);b=b+"("+a+")";break;case "STD_DEV":b=Blockly.Arduino.provideFunction_("math_standard_deviation",["num "+Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_+"(List myList) {","  // First filter list for numbers only.","  List numbers = new List.from(myList);","  numbers.removeWhere((a) => a is! num);","  if (numbers.isEmpty) return null;","  num n = numbers.length;","  num sum = 0;","  numbers.forEach((x) => sum += x);","  num mean = sum / n;","  num sumSquare = 0;","  numbers.forEach((x) => sumSquare += Math.pow(x - mean, 2));",
"  return Math.sqrt(sumSquare / n);","}"]);b=b+"("+a+")";break;case "RANDOM":Blockly.Arduino.definitions_.import_Arduino_math="import 'Arduino:math' as Math;";b=Blockly.Arduino.provideFunction_("math_random_item",["dynamic "+Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_+"(List myList) {","  int x = new Math.Random().nextInt(myList.length);","  return myList[x];","}"]);b=b+"("+a+")";break;default:throw Error("Unknown operator: "+b);}return[b,Blockly.Arduino.ORDER_UNARY_POSTFIX]};
Blockly.Arduino.math_modulo=function(a){var b=Blockly.Arduino.valueToCode(a,"DIVIDEND",Blockly.Arduino.ORDER_MULTIPLICATIVE)||"0";a=Blockly.Arduino.valueToCode(a,"DIVISOR",Blockly.Arduino.ORDER_MULTIPLICATIVE)||"0";return[b+" % "+a,Blockly.Arduino.ORDER_MULTIPLICATIVE]};
Blockly.Arduino.math_constrain=function(a){var b=Blockly.Arduino.valueToCode(a,"VALUE",Blockly.Arduino.ORDER_NONE)||"0",c=Blockly.Arduino.valueToCode(a,"LOW",Blockly.Arduino.ORDER_NONE)||"0";a=Blockly.Arduino.valueToCode(a,"HIGH",Blockly.Arduino.ORDER_NONE)||"255";return["constrain("+b+", "+c+","+a+")",Blockly.Arduino.ORDER_NONE]};
Blockly.Arduino.math_random_int=function(a){var b=Blockly.Arduino.valueToCode(a,"FROM",Blockly.Arduino.ORDER_NONE)||"0";a=Blockly.Arduino.valueToCode(a,"TO",Blockly.Arduino.ORDER_NONE)||"0";return["random("+b+", "+a+")",Blockly.Arduino.ORDER_UNARY_POSTFIX]};Blockly.Arduino.math_random_float=function(a){return["new Math.Random().nextDouble()",Blockly.Arduino.ORDER_UNARY_POSTFIX]};
Blockly.Arduino.math_atan2=function(a){Blockly.Arduino.definitions_.import_Arduino_math="import 'Arduino:math' as Math;";var b=Blockly.Arduino.valueToCode(a,"X",Blockly.Arduino.ORDER_NONE)||"0";return["Math.atan2("+(Blockly.Arduino.valueToCode(a,"Y",Blockly.Arduino.ORDER_NONE)||"0")+", "+b+") / Math.pi * 180",Blockly.Arduino.ORDER_MULTIPLICATIVE]};
Blockly.Arduino.math_random_max_min=function(a){var b=Blockly.Arduino.valueToCode(a,"MAX",Blockly.Arduino.ORDER_ATOMIC)||"1";a=Blockly.Arduino.valueToCode(a,"MIN",Blockly.Arduino.ORDER_ATOMIC)||"0";return[0<a?"random("+a+", "+b+")":"random("+b+")",Blockly.Arduino.ORDER_NONE]};Blockly.Arduino.math_map=function(a){var b=Blockly.Arduino.valueToCode(a,"VALUE",Blockly.Arduino.ORDER_NONE),c=a.getFieldValue("TOLOW")||"0";a=a.getFieldValue("TOHIGH")||"255";return["map("+b+",0,1024,"+c+","+a+")",Blockly.Arduino.ORDER_NONE]};
Blockly.Arduino.base_map=function(){var a=Blockly.Arduino.valueToCode(this,"NUM",Blockly.Arduino.ORDER_NONE),b=Blockly.Arduino.valueToCode(this,"DMAX",Blockly.Arduino.ORDER_ATOMIC);return["map("+a+", 0, 1024, 0, "+b+")",Blockly.Arduino.ORDER_NONE]};
Blockly.Arduino.math_custom_map=function(a){var b=Blockly.Arduino.valueToCode(a,"VALUE",Blockly.Arduino.ORDER_NONE),c=a.getFieldValue("FROMLOW")||"0",d=a.getFieldValue("FROMHIGH")||"1024",e=a.getFieldValue("TOLOW")||"0";a=a.getFieldValue("TOHIGH")||"255";return["map("+b+","+c+","+d+","+e+","+a+")",Blockly.Arduino.ORDER_NONE]};
Blockly.Arduino.math_pow=function(a){var b=Blockly.Arduino.valueToCode(a,"base",Blockly.Arduino.ORDER_NONE)||"1";a=Blockly.Arduino.valueToCode(a,"exp",Blockly.Arduino.ORDER_NONE)||"1";return["pow("+b+", "+a+")",Blockly.Arduino.ORDER_NONE]};Blockly.Arduino.motors={};Blockly.Arduino.motors_servo=function(a){var b=Blockly.Arduino.valueToCode(a,"PIN",Blockly.Arduino.ORDER_ATOMIC)||9;a=Blockly.Arduino.valueToCode(a,"DEGREE",Blockly.Arduino.ORDER_ATOMIC)||180;Blockly.Arduino.definitions_.define_servo="#include <Servo.h>\n";Blockly.Arduino.definitions_["var_servo"+b]="Servo servo_"+b+";\n";Blockly.Arduino.setups_["setup_servo_"+b]="servo_"+b+".attach("+b+");\n";return"servo_"+b+".write("+a+");\n"};
Blockly.Arduino.motors_dc=function(a){var b=Blockly.Arduino.valueToCode(a,"PIN",Blockly.Arduino.ORDER_ATOMIC)||11;a=Blockly.Arduino.valueToCode(a,"VALUE",Blockly.Arduino.ORDER_ATOMIC)||"255";return"analogWrite("+b+", "+a+");\n"};Blockly.Arduino.operators={};Blockly.Arduino.operators_map=function(a){var b=Blockly.Arduino.valueToCode(a,"VALUE",Blockly.Arduino.ORDER_NONE),c=a.getFieldValue("OLD_LOW")||"0",d=a.getFieldValue("OLD_HIGH")||"1024",e=a.getFieldValue("NEW_LOW")||"0";a=a.getFieldValue("NEW_HIGH")||"255";return["map("+b+","+c+","+d+","+e+","+a+")",Blockly.Arduino.ORDER_NONE]};Blockly.Arduino.procedures={};
Blockly.Arduino.procedures_defreturn=function(a){var b=Blockly.Arduino.variableDB_.getName(a.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE),c=Blockly.Arduino.statementToCode(a,"STACK");Blockly.Arduino.INFINITE_LOOP_TRAP&&(c=Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,"'"+a.id+"'")+c);var d=Blockly.Arduino.valueToCode(a,"RETURN",Blockly.Arduino.ORDER_NONE)||"",e=a.getFieldValue("TYPE");d&&(d="  return "+d+";\n");e=d?e:"void";for(var f=[],g=0;g<a.arguments_.length;g++)f[g]=Blockly.Arduino.variableDB_.getName(a.arguments_[g],
Blockly.Variables.NAME_TYPE);c=e+" "+b+"("+f.join(", ")+") {\n"+c+d+"}\n";c=Blockly.Arduino.scrub_(a,c);Blockly.Arduino.definitions_[b]=c;return null};Blockly.Arduino.procedures_defnoreturn=Blockly.Arduino.procedures_defreturn;
Blockly.Arduino.procedures_callreturn=function(a){for(var b=Blockly.Arduino.variableDB_.getName(a.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE),c=[],d=0;d<a.arguments_.length;d++)c[d]=Blockly.Arduino.valueToCode(a,"ARG"+d,Blockly.Arduino.ORDER_NONE)||"null";return[b+"("+c.join(", ")+")",Blockly.Arduino.ORDER_UNARY_POSTFIX]};
Blockly.Arduino.procedures_callnoreturn=function(a){for(var b=Blockly.Arduino.variableDB_.getName(a.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE),c=[],d=0;d<a.arguments_.length;d++)c[d]=Blockly.Arduino.valueToCode(a,"ARG"+d,Blockly.Arduino.ORDER_NONE)||"null";return b+"("+c.join(", ")+");\n"};
Blockly.Arduino.procedures_ifreturn=function(a){var b="if ("+(Blockly.Arduino.valueToCode(a,"CONDITION",Blockly.Arduino.ORDER_NONE)||"false")+") {\n";a.hasReturnValue_?(a=Blockly.Arduino.valueToCode(a,"VALUE",Blockly.Arduino.ORDER_NONE)||"null",b+="  return "+a+";\n"):b+="  return;\n";return b+"}\n"};Blockly.Arduino.rgbled={};
Blockly.Arduino.rgbled_begin=function(a){var b=a.getFieldValue("NUM"),c=a.getFieldValue("PIN");a=a.getFieldValue("BRIGHTNESS");Blockly.Arduino.definitions_.define_include_neopixel="#include <Adafruit_NeoPixel.h>\n";Blockly.Arduino.definitions_.define_rgbled="Adafruit_NeoPixel rgbled = Adafruit_NeoPixel("+b+","+c+",NEO_RGB + NEO_KHZ400);\n";Blockly.Arduino.setups_.setup_rgbled_begin="rgbled.begin();\n";Blockly.Arduino.setups_.setup_rgbled_brightness="rgbled.setBrightness("+a+");\n";return""};
function hexToR(a){return parseInt(cutHex(a).substring(0,2),16)}function hexToG(a){return parseInt(cutHex(a).substring(2,4),16)}function hexToB(a){return parseInt(cutHex(a).substring(4,6),16)}function cutHex(a){return"#"==a.charAt(0)?a.substring(1,7):a}Blockly.Arduino.rgbled_setpixelcolor=function(a){var b=a.getFieldValue("TARGET");a=a.getFieldValue("RGB");return"rgbled.setPixelColor("+b+",rgbled.Color("+hexToR(a)+","+hexToG(a)+","+hexToB(a)+"));\n"};
Blockly.Arduino.rgbled_setpixelcolor2=function(a){var b=Blockly.Arduino.valueToCode(a,"TARGET",Blockly.Arduino.ORDER_ATOMIC)||"0";a=a.getFieldValue("RGB");return"rgbled.setPixelColor("+b+",rgbled.Color("+hexToR(a)+","+hexToG(a)+","+hexToB(a)+"));\n"};
Blockly.Arduino.rgbled_custom_setpixelcolor=function(a){var b=Blockly.Arduino.valueToCode(a,"TARGET",Blockly.Arduino.ORDER_ATOMIC)||"0",c=Blockly.Arduino.valueToCode(a,"R",Blockly.Arduino.ORDER_ATOMIC)||"255",d=Blockly.Arduino.valueToCode(a,"G",Blockly.Arduino.ORDER_ATOMIC)||"0";a=Blockly.Arduino.valueToCode(a,"B",Blockly.Arduino.ORDER_ATOMIC)||"0";return"rgbled.setPixelColor("+b+", rgbled.Color("+c+","+d+","+a+"));\n"};Blockly.Arduino.rgbled_show=function(a){return"rgbled.show();\n"};Blockly.Arduino.sensors={};Blockly.Arduino.sensors_button=function(a){var b=Blockly.Arduino.valueToCode(a,"PIN",Blockly.Arduino.ORDER_ATOMIC)||"2";a=Blockly.Arduino.valueToCode(a,"STATUS",Blockly.Arduino.ORDER_ATOMIC)||"HIGH";0<b&&(Blockly.Arduino.setups_["setup_output_"+b]="pinMode("+b+", INPUT);");return"digitalRead("+b+", "+a+");\n"};
Blockly.Arduino.sensors_sonic=function(a){var b=Blockly.Arduino.valueToCode(a,"ECHO",Blockly.Arduino.ORDER_ATOMIC)||"3";a=Blockly.Arduino.valueToCode(a,"TRIGGER",Blockly.Arduino.ORDER_ATOMIC)||"4";Blockly.Arduino.definitions_.define_sonic_timeout="int Sonic_Time_out = 3000;\n";Blockly.Arduino.setups_["setup_output_"+a]="pinMode("+a+", OUTPUT);";Blockly.Arduino.setups_["setup_output_"+b]="pinMode("+b+", INPUT);";Blockly.Arduino.definitions_.define_Sonic_Timing="long ultrasonic(){\n  digitalWrite("+
a+", LOW);\n  delayMicroseconds(5);\n  digitalWrite("+a+", HIGH);\n  delayMicroseconds(10);\n  digitalWrite("+a+", LOW);\n  long duration_ms = pulseIn("+b+",HIGH);\n  long duration = duration_ms / 1000000;  float distance_meters = (343 * duration)/2;  float distance_cm = distance_meters*100;  return distance_cm;\n}\n";return"ultrasonic()"};Blockly.Arduino.serial={};Blockly.Arduino.serial_print=function(a){a=Blockly.Arduino.valueToCode(a,"CONTENT",Blockly.Arduino.ORDER_ATOMIC)||"0";Blockly.Arduino.setups_["setup_serial_"+profile.default.serial]="Serial.begin("+profile.default.serial+");\n";return"Serial.print("+a+");\ndelay(100);\n"};
Blockly.Arduino.serial_read=function(a){Blockly.Arduino.valueToCode(a,"CONTENT",Blockly.Arduino.ORDER_ATOMIC);Blockly.Arduino.setups_["setup_serial_"+profile.default.serial]="Serial.begin("+profile.default.serial+");\n";return["Serial.read()",Blockly.Arduino.ORDER_ATOMIC]};Blockly.Arduino.serial_byte_number=function(a){return[a.getFieldValue("NUM"),Blockly.Arduino.ORDER_ATOMIC]};
Blockly.Arduino.serial_available=function(a){Blockly.Arduino.valueToCode(a,"CONTENT",Blockly.Arduino.ORDER_ATOMIC);Blockly.Arduino.setups_["setup_serial_"+profile.default.serial]="Serial.begin("+profile.default.serial+");\n";return["Serial.available()",Blockly.Arduino.ORDER_ATOMIC]};
Blockly.Arduino.serial_println=function(a){a=Blockly.Arduino.valueToCode(a,"CONTENT",Blockly.Arduino.ORDER_ATOMIC)||"0";Blockly.Arduino.setups_["setup_serial_"+profile.default.serial]="Serial.begin("+profile.default.serial+");\n";return"Serial.println("+a+");\ndelay(100);\n"};Blockly.Arduino.servo={};Blockly.Arduino.servo_attach=function(){var a=this.getFieldValue("PIN");Blockly.Arduino.definitions_.define_servo="#include <Servo.h>";Blockly.Arduino.definitions_["define_class_servo_"+a]="Servo myservo"+a+";";return"myservo"+a+".attach("+a+");\n"};
Blockly.Arduino.servo_custom_attach=function(){var a=this.getFieldValue("PIN"),b=this.getFieldValue("MAX"),c=this.getFieldValue("MIN");Blockly.Arduino.definitions_.define_servo="#include <Servo.h>";Blockly.Arduino.definitions_["define_class_servo_"+a]="Servo myservo"+a+";";return"myservo"+a+".attach("+a+","+c+","+b+");\n"};
Blockly.Arduino.servo_write=function(){var a=this.getFieldValue("PIN"),b=Blockly.Arduino.valueToCode(this,"ANGLE",Blockly.Arduino.ORDER_ATOMIC)||"90";Blockly.Arduino.definitions_.define_servo="#include <Servo.h>";Blockly.Arduino.definitions_["define_class_servo_"+a]="Servo myservo"+a+";";Blockly.Arduino.setups_["servo_"+a]="myservo"+a+".attach("+a+");";return"myservo"+a+".write("+b+");\n"};
Blockly.Arduino.servo_writeus=function(){var a=this.getFieldValue("PIN"),b=Blockly.Arduino.valueToCode(this,"ANGLE",Blockly.Arduino.ORDER_ATOMIC)||"1500";Blockly.Arduino.definitions_.define_servo="#include <Servo.h>";Blockly.Arduino.definitions_["define_class_servo_"+a]="Servo myservo"+a+";";Blockly.Arduino.setups_["servo_"+a]="myservo"+a+".attach("+a+");";return"myservo"+a+".writeMicroseconds("+b+");\n"};
Blockly.Arduino.servo_read=function(){var a=this.getFieldValue("PIN");Blockly.Arduino.definitions_.define_servo="#include <Servo.h>";Blockly.Arduino.definitions_["define_class_servo_"+a]="Servo myservo"+a+";";return["myservo"+a+".read()",Blockly.Arduino.ORDER_ATOMIC]};
Blockly.Arduino.servo_attached=function(){var a=this.getFieldValue("PIN");Blockly.Arduino.definitions_.define_servo="#include <Servo.h>";Blockly.Arduino.definitions_["define_class_servo_"+a]="Servo myservo"+a+";";return["myservo"+a+".attached()",Blockly.Arduino.ORDER_ATOMIC]};
Blockly.Arduino.servo_detach=function(){var a=this.getFieldValue("PIN");Blockly.Arduino.definitions_.define_servo="#include <Servo.h>";Blockly.Arduino.definitions_["define_class_servo_"+a]="Servo myservo"+a+";";return"myservo"+a+".detach();\n"};Blockly.Arduino.sounds={};Blockly.Arduino.sounds_tone=function(a){var b=Blockly.Arduino.valueToCode(a,"PIN",Blockly.Arduino.ORDER_ATOMIC)||6;a=Blockly.Arduino.valueToCode(a,"FREQ",Blockly.Arduino.ORDER_ATOMIC)||"440";0<b&&(Blockly.Arduino.setups_["setup_output_"+b]="pinMode("+b+", OUTPUT);");return"tone("+b+","+a+");\n"};
Blockly.Arduino.sounds_noTone=function(a){a=Blockly.Arduino.valueToCode(a,"PIN",Blockly.Arduino.ORDER_ATOMIC)||6;0<a&&(Blockly.Arduino.setups_["setup_output_"+a]="pinMode("+a+", OUTPUT);");return"noTone("+a+");\n"};Blockly.Arduino.texts={};Blockly.Arduino.text=function(a){return[Blockly.Arduino.quote_(a.getFieldValue("TEXT")),Blockly.Arduino.ORDER_ATOMIC]};Blockly.Arduino.text_commentout=function(a){return"/*\n"+Blockly.Arduino.statementToCode(a,"COMMENTOUT")+"\n*/\n"};Blockly.Arduino.text_length=function(a){return[(Blockly.Arduino.valueToCode(a,"VALUE",Blockly.Arduino.ORDER_FUNCTION_CALL)||"''")+".length()",Blockly.Arduino.ORDER_MEMBER]};
Blockly.Arduino.text_charAt=function(a){var b=Blockly.Arduino.valueToCode(a,"VALUE",Blockly.Arduino.ORDER_ATOMIC)||"";a=Blockly.Arduino.valueToCode(a,"INDEX",Blockly.Arduino.ORDER_ATOMIC)||0;return[b+".charAt("+a+")",Blockly.Arduino.ORDER_ATOMIC]};Blockly.Arduino.times={};Blockly.Arduino.delay=function(a){return"delay("+a.getFieldValue("DELAY_TIME")+");\n"};Blockly.Arduino.delay_custom=function(a){return"delay("+(Blockly.Arduino.valueToCode(a,"DELAY_TIME",Blockly.Arduino.ORDER_ATOMIC)||"1000")+");\n"};Blockly.Arduino.delayMicroseconds_custom=function(a){return"delayMicroseconds("+(Blockly.Arduino.valueToCode(a,"DELAY_TIME",Blockly.Arduino.ORDER_ATOMIC)||"1000")+");\n"};
Blockly.Arduino.delayMicroseconds=function(a){return"delayMicroseconds("+a.getFieldValue("DELAY_TIME")+");\n"};Blockly.Arduino.millis=function(a){return["millis()",Blockly.Arduino.ORDER_ATOMIC]};Blockly.Arduino.micros=function(a){return["micros()",Blockly.Arduino.ORDER_ATOMIC]};Blockly.Arduino.ultrasonic={};
Blockly.Arduino.ultrasonic_setting=function(){var a=this.getFieldValue("TRIG"),b=this.getFieldValue("ECHO"),c=this.getFieldValue("RESET");Blockly.Arduino.definitions_.define_sonic_timeout="int Sonic_Time_out = 3000;\n";Blockly.Arduino.setups_["setup_output_"+a]="pinMode("+a+", OUTPUT);";Blockly.Arduino.setups_["setup_output_"+b]="pinMode("+b+", INPUT);";Blockly.Arduino.setups_["setup_output_"+c]="pinMode("+c+", OUTPUT);";Blockly.Arduino.definitions_.define_Sonic_Timing="long Sonic_Timing(){\n  digitalWrite("+
a+", LOW);\n  delayMicroseconds(2);\n  digitalWrite("+a+", HIGH);\n  delayMicroseconds(10);\n  digitalWrite("+a+", LOW);\n  long duration = pulseIn("+b+",HIGH,Sonic_Time_out);\n  if ( duration == 0 ){\n    duration = Sonic_Time_out;\n    digitalWrite("+c+", HIGH);\n    delay(25);\n    digitalWrite("+c+" ,LOW);\n    delay(225);\n  }\n  return duration;\n}\n";return""};
Blockly.Arduino.ultrasonic_maxrange=function(){var a=this.getFieldValue("UNIT"),b=this.getFieldValue("MAXRANGE");Blockly.Arduino.definitions_.define_sonic_timeout="CM"==a?"int Sonic_Time_out = "+b+"*2*29;\n":"int Sonic_Time_out = "+b+"*2*72;\n";return""};Blockly.Arduino.ultrasonic_distance=function(){return["CM"==this.getFieldValue("UNIT")?"Sonic_Timing()/29/2":"Sonic_Timing()/74/2",Blockly.Arduino.ORDER_ATOMIC]};Blockly.Arduino.variables={};Blockly.Arduino.variables_get=function(a){return[Blockly.Arduino.variableDB_.getName(this.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE),Blockly.Arduino.ORDER_ATOMIC]};Blockly.Arduino.variables_set=function(a){var b=Blockly.Arduino.valueToCode(a,"VALUE",Blockly.Arduino.ORDER_ASSIGNMENT)||"0";return Blockly.Arduino.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE)+" = "+b+";\n"};Blockly.Arduino.variablesDynamic={};Blockly.Arduino.variables_get_dynamic=Blockly.Arduino.variables_get;Blockly.Arduino.variables_set_dynamic=Blockly.Arduino.variables_set;
return Blockly.Arduino;
}));


//# sourceMappingURL=arduino_compressed.js.map
