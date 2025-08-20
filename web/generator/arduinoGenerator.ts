import { Block, CodeGenerator, ConnectionType, Msg, Names, Variables, Workspace } from "blockly"

/* eslint-disable no-unused-vars */
export enum Order {
    ORDER_ATOMIC = 0,
    ORDER_UNARY_POSTFIX = 1,
    ORDER_UNARY_PREFIX = 2,
    ORDER_MULTIPLICATIVE = 3,
    ORDER_ADDITIVE = 4,
    ORDER_SHIFT = 5,
    ORDER_RELATIONAL = 6,
    ORDER_EQUALITY = 7,
    ORDER_BITWISE_AND = 8,
    ORDER_BITWISE_XOR = 9,
    ORDER_BITWISE_OR = 10,
    ORDER_LOGICAL_AND = 11,
    ORDER_LOGICAL_OR = 12,
    ORDER_CONDITIONAL = 13,
    ORDER_ASSIGNMENT = 14,
    ORDER_COMMA = 15,
    ORDER_UNARY_NEGATION = 16,
    ORDER_MEMBER = 17,
    ORDER_FUNCTION_CALL = 18,
    ORDER_NONE = 99,
}
/* eslint-enable no-unused-vars */

export const profile = {
    common: {
        number_type: "Number Byte Unsigned_Int Long Unsigned_Long Word Char Float Double Volatile_Int".split(" "),
    },
    arduino: {
        description: "Arduino standard-compatible board",
        digital: [
            ...Array.from(Array(13)).map((_v, i) => [i.toString(), i.toString()]),
            ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"],
        ],
        analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
        pwm: [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"]],
        serialBaud: 9600,
    },
    arduino_mega: { description: "Arduino Mega-compatible board" },
}

export class ArduinoGenerator extends CodeGenerator {
    public includes_: { [key: string]: string } = Object.create(null)
    public setups_: { [key: string]: string } = Object.create(null)
    public pins_ = Object.create(null)

    public loop_: string = ""

    public TYPES = {
        Number: "double",
        Boolean: "bool",
        String: "String",
    } as Record<string, string>

    public VAR_DEFAULTS: Record<string, string> = {
        Number: "0",
        Boolean: "false",
        String: "\"\"",
    }

    public INDENT = " ".repeat(4)

    constructor(name = "Arduino") {
        super(name)
        this.isInitialized = false

        // source: arduino IDE 1.8.19, see lib/keywords.txt, which is used to determine the IDE's syntax highlighting
        this.addReservedWords(
            // "LITERAL1"; constants
            "HIGH,LOW,INPUT,INPUT_PULLUP,OUTPUT,DEC,BIN,HEX,OCT,PI,HALF_PI,TWO_PI,LSBFIRST,MSBFIRST,CHANGE,FALLING,RISING,DEFAULT,EXTERNAL,INTERNAL,INTERNAL1V1,INTERNAL2V56,LED_BUILTIN,LED_BUILTIN_RX,LED_BUILTIN_TX,DIGITAL_MESSAGE,FIRMATA_STRING,ANALOG_MESSAGE,REPORT_DIGITAL,REPORT_ANALOG,SET_PIN_MODE,SYSTEM_RESET,SYSEX_START,auto,int8_t,int16_t,int32_t,int64_t,uint8_t,uint16_t,uint32_t,uint64_t,char16_t,char32_t,operator,enum,delete,bool,boolean,byte,char,const,false,float,double,null,NULL,int,long,new,private,protected,public,short,signed,static,volatile,String,void,true,unsigned,word,array,sizeof,dynamic_cast,typedef,const_cast,struct,static_cast,union,friend,extern,class,reinterpret_cast,register,explicit,inline,_Bool,complex,_Complex,_Imaginary,atomic_bool,atomic_char,atomic_schar,atomic_uchar,atomic_short,atomic_ushort,atomic_int,atomic_uint,atomic_long,atomic_ulong,atomic_llong,atomic_ullong,virtual,PROGMEM"
            // "KEYWORD1"; other constants
            + "Serial,Serial1,Serial2,Serial3,SerialUSB,Keyboard,Mouse"
            // "KEYWORD2"; methods
            + "abs,acos,acosf,asin,asinf,atan,atan2,atan2f,atanf,cbrt,cbrtf,ceil,ceilf,constrain,copysign,copysignf,cos,cosf,cosh,coshf,degrees,exp,expf,fabs,fabsf,fdim,fdimf,floor,floorf,fma,fmaf,fmax,fmaxf,fmin,fminf,fmod,fmodf,hypot,hypotf,isfinite,isinf,isnan,ldexp,ldexpf,log,log10,log10f,logf,lrint,lrintf,lround,lroundf,map,max,min,pow,powf,radians,random,randomSeed,round,roundf,signbit,sin,sinf,sinh,sinhf,sq,sqrt,sqrtf,tan,tanf,tanh,tanhf,trunc,truncf,bitRead,bitWrite,bitSet,bitClear,bit,highByte,lowByte,analogReference,analogRead,analogReadResolution,analogWrite,analogWriteResolution,attachInterrupt,detachInterrupt,digitalPinToInterrupt,delay,delayMicroseconds,digitalWrite,digitalRead,interrupts,millis,micros,noInterrupts,noTone,pinMode,pulseIn,pulseInLong,shiftIn,shiftOut,tone,yield,Stream,begin,end,peek,read,print,println,available,availableForWrite,flush,setTimeout,find,findUntil,parseInt,parseFloat,readBytes,readBytesUntil,readString,readStringUntil,trim,toUpperCase,toLowerCase,charAt,compareTo,concat,endsWith,startsWith,equals,equalsIgnoreCase,getBytes,indexOf,lastIndexOf,length,replace,setCharAt,substring,toCharArray,toInt,press,release,releaseAll,accept,click,move,isPressed,isAlphaNumeric,isAlpha,isAscii,isWhitespace,isControl,isDigit,isGraph,isLowerCase,isPrintable,isPunct,isSpace,isUpperCase,isHexadecimalDigit",
        )
    }

    init(workspace: Workspace): void {
        super.init(workspace)

        this.definitions_ = Object.create(null)
        this.functionNames_ = Object.create(null)
        this.setups_ = Object.create(null)
        this.loop_ = Object.create(null)

        if (!this.nameDB_) {
            this.nameDB_ = new Names(this.RESERVED_WORDS_)
        } else {
            this.nameDB_.reset()
        }

        this.nameDB_.setVariableMap(workspace.getVariableMap())
        this.nameDB_.populateVariables(workspace)
        this.nameDB_.populateProcedures(workspace)

        const defvars = []
        // Add developer Blockly.Variables (not created or named by the user).
        const devVarList = Variables.allDeveloperVariables(workspace)
        for (let i = 0; i < devVarList.length; i++) {
            defvars.push(
                this.nameDB_.getName(devVarList[i], Names.NameType.DEVELOPER_VARIABLE),
            )
        }

        // Add user Blockly.Variables, but only ones that are being used.
        const variables = Variables.allUsedVarModels(workspace)
        // const variableSetters = workspace.getBlocksByType("variables_set")
        const variableGetters = workspace.getBlocksByType("variables_get")

        let procedureArgVars = workspace.getBlocksByType("procedures_defnoreturn").map(f => new Set((f as ProcedureBlock).argumentVarModels_)).reduce((a, b) => a.union(b), new Set())

        for (const nonProcedureArgVar of new Set(variables).difference(procedureArgVars)) {
            // console.log("variable type")
            // console.log(variables[i].type)
            // console.log("provenance")
            // console.log((variables as unknown as { fn: boolean }).fn)

            // const setters = variableSetters.filter(
            //     block => block.getFieldValue("VAR") === variables[i].getId(),
            // )
            // const types = setters.map((block) => {
            //     const output = block.getChildren(true)[0]
            //     return {
            //         block,
            //         type: output && output.outputConnection ? output.outputConnection.getCheck()?.[0] : undefined,
            //     }
            // })
            // // check for mismatch
            // if (types.some(({ type }) => type !== types[0].type && type !== undefined)) {
            //     types.forEach(({ block }) => { block.setWarningText(`Variable has conflicting types: ${types.map(({ type }) => type).join(", ")}`) })
            // } else {
            //     types.forEach(({ block }) => { block.setWarningText(null) })
            // }

            // const type = types[0]?.type || "Number"
            const type = nonProcedureArgVar.type
            variableGetters.forEach((block) => {
                if (block.getFieldValue("VAR") === nonProcedureArgVar.getId()) {
                    block.outputConnection?.setCheck(type)
                }
            })

            const arduinoType = this.TYPES[type]
            const defaultValue = this.VAR_DEFAULTS[type]
            const name = this.nameDB_.getName(nonProcedureArgVar.getId(), Names.NameType.VARIABLE)

            defvars.push(`${arduinoType} ${name} = ${defaultValue}`)
        }

        // Declare all of the variables.
        if (defvars.length) {
            this.definitions_["variables"] = defvars.join(";\n") + ";\n"
        }

        // Type inference for procedures
        const definitions = workspace.getBlocksByType("procedures_defreturn")
        const usages = workspace.getBlocksByType("procedures_callreturn")
        const returns = workspace.getBlocksByType("procedures_ifreturn")
        definitions.forEach((definition) => {
            const input = definition.getInput("RETURN")
            if (!input) return

            const check = input.connection?.targetConnection?.getCheck()
            const type = (check ? check[0] : "Number") || "Number"

            usages.forEach((block) => {
                block.outputConnection?.setCheck(type)
            })

            returns.forEach((block) => {
                if (block.getRootBlock().id !== definition.id) return

                block.getInput("VALUE")?.setCheck(type)
            })
        })

        this.isInitialized = true
    }

    finish(code: string): string {
        // b = "  " + b.replace(/\n/g, "\n  ");
        // b = b.replace(/\n\s+$/, "\n");
        // b = "void loop() \n{\n" + b + "\n}";

        return `${Object.values(this.includes_).join("\n")}
${Object.values(this.definitions_).join("\n")}
void setup() {
${this.INDENT}${Object.values(this.setups_).join("\n" + this.INDENT)}
}

void loop() {
${this.loop_}
}

/***** OUTSIDE BLOCKS *****
{
${code}
}
***** END OUTSIDE BLOCKS *****/`
    }

    scrubNakedValue(line: string): string {
        return line + ";\n"
    }

    quote_(string: string): string {
        return `"${string.replace(/\\/g, "\\\\").replace(/\n/g, "\\\n").replace(/"/g, "\\")}"`
    }

    multiline_quote_(string: string): string {
        const lines = string.split("\n").map(this.quote_)
        return lines.join(" + \"\\n\" +\n")
    }

    scrub_(block: Block, code: string, opt_thisOnly?: boolean): string {
        if (code === null) {
            return ""
        }

        let commentedCode = ""
        if (!block.outputConnection || !block.outputConnection.targetConnection) {
            let comment = block.getCommentText()
            if (comment) {
                commentedCode += this.prefixLines(comment, "// ") + "\n"
                for (const input of block.inputList) {
                    if (input.type as number === ConnectionType.INPUT_VALUE as number) {
                        const childBlock = input.connection?.targetBlock()
                        if (childBlock) {
                            comment = this.allNestedComments(childBlock)
                            if (comment) {
                                commentedCode += this.prefixLines(comment, "// ")
                            }
                        }
                    }
                }
            }
        }

        if (opt_thisOnly) {
            return commentedCode + code
        }

        const nextBlock = block.nextConnection && block.nextConnection.targetBlock()
        const nextCode = this.blockToCode(nextBlock)
        return commentedCode + code + nextCode
    }

    addDeclaration(_dependent: Block, declarationTag: string, code: string, overwrite = false) {
        if (this.definitions_[declarationTag] === undefined || overwrite) {
            this.definitions_[declarationTag] = code
        }
    }

    addInclude(_dependent: Block, includeTag: string, code: string) {
        if (!this.includes_[includeTag]) {
            this.includes_[includeTag] = code
        }
    }

    addSetup(_dependent: Block, setupTag: string, code: string, overwrite: boolean = false) {
        let overwritten = false
        if (overwrite || this.setups_[setupTag] === undefined) {
            this.setups_[setupTag] = code
            overwritten = true
        }

        return overwritten
    }

    reservePin(dependent: Block, pin: string, pinType: string, warningTag: string) {
        if (this.pins_[pin] && this.pins_[pin] !== pinType) {
            dependent.setWarningText(
                Msg.ARD_PIN_WARN1
                    .replace("%1", pin)
                    .replace("%2", this.pins_[pin])
                    .replace("%3", pinType)
                    .replace("%4", warningTag),
                warningTag,
            )
        } else {
            this.pins_[pin] = pinType
            dependent.setWarningText(null)
        }
    }
}

const arduinoGenerator = new ArduinoGenerator()

import * as actuate from "./actuate"
import * as controlFlow from "./controlFlow"
import * as ezDisplay from "./ezDisplay"
import * as logic from "./logic"
import * as math from "./math"
import * as procedures from "./procedures"
import * as sense from "./sense"
import * as serial from "./serial"
import * as text from "./text"
import * as variable from "./variable"

actuate.default(arduinoGenerator)
controlFlow.default(arduinoGenerator)
ezDisplay.default(arduinoGenerator)
logic.default(arduinoGenerator)
math.default(arduinoGenerator)
procedures.default(arduinoGenerator)
sense.default(arduinoGenerator)
serial.default(arduinoGenerator)
text.default(arduinoGenerator)
variable.default(arduinoGenerator)

export default arduinoGenerator
