import { ObservableProcedureModel } from "@blockly/block-shareable-procedures"
import * as Blockly from "blockly/core"

Blockly.Blocks["my_procedure_def"] = {
    init: function () {
        this.model = new ObservableProcedureModel(this.workspace, "default name")
        this.workspace.getProcedureMap().add(this.model)
        // etc...
    },

    destroy: function () {
        // (Optionally) Destroy the model when the definition block is deleted.

        // Insertion markers reference the model of the original block.
        if (this.isInsertionMarker()) return
        this.workpace.getProcedureMap().delete(this.model.getId())
    },

    getProcedureModel() {
        return this.model
    },

    isProcedureDef() {
        return true
    },

    getVarModels() {
        // If your procedure references variables
        // then you should return those models here.
        return [] as Blockly.VariableModel[]
    },

    doProcedureUpdate() {
        this.setFieldValue(this.model.getName(), "NAME")
        this.setFieldValue(
            (this.model as ObservableProcedureModel).getParameters()
                .map(p => p.getName())
                .join(","),
            "PARAMS")
        this.setFieldValue(
            this.model.getReturnTypes().join(","), "RETURN")
    },
}

Blockly.Blocks["my_procedure_call"] = {
    getProcedureModel() {
        return this.model
    },

    isProcedureDef() {
        return false
    },

    getVarModels() {
        // If your procedure references variables
        // then you should return those models here.
        return [] as Blockly.VariableModel[]
    },
}
