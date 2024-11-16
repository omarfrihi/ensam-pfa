import type { Field, RuleType } from "react-querybuilder";
import { defaultOperators, toFullOption } from "react-querybuilder";
import { musicalInstruments } from "./musicalInstruments";

export const validator = (r: RuleType) => !!r.value;
export enum Etype {
  boolean = "boolean",
  decimal = "decimal",
  varchar = "varchar",
  longtext = "longtext",
  datetime = "datetime",
  enum = "enum",
}
export const getFields = (
  type: Etype,
  possibleValues: string[] | undefined
) => {
  const fields = {
    [Etype.boolean]: {
      valueEditorType: "checkbox",
      operators: defaultOperators.filter((op) => op.name === "="),
      defaultValue: false,
      validator,
    },
    [Etype.decimal]: {
      inputType: "number",
      operators: defaultOperators.filter((op) =>
        [
          "=",
          "!=",
          "<",
          ">",
          "<=",
          ">=",
          "null",
          "notNull",
          "in",
          "notIn",
          "between",
          "notBetween",
        ].includes(op.name)
      ),
      validator,
    },
    [Etype.varchar]: {
      validator,
      operators: defaultOperators.filter((op) =>
        [
          "=",
          "contains",
          "beginsWith",
          "endsWith",
          "doesNotContain",
          "doesNotBeginWith",
          "doesNotEndWith",
          "null",
          "notNull",
          "in",
          "notIn",
        ].includes(op.name)
      ),
    },
    [Etype.longtext]: {
      validator,
      operators: defaultOperators.filter((op) =>
        [
          "=",
          "contains",
          "beginsWith",
          "endsWith",
          "doesNotContain",
          "doesNotBeginWith",
          "doesNotEndWith",
          "null",
          "notNull",
          "in",
          "notIn",
        ].includes(op.name)
      ),
    },
    [Etype.datetime]: {
      validator,
      inputType: "date",
      operators: defaultOperators.filter((op) =>
        [
          "=",
          "!=",
          "<",
          ">",
          "<=",
          ">=",
          "null",
          "notNull",
          "in",
          "notIn",
          "between",
          "notBetween",
        ].includes(op.name)
      ),
    },
    [Etype.enum]: {
      valueEditorType: "multiselect",
      values: possibleValues?.map((value) => ({
        name: value,
        label: value,
      })),
      operators: defaultOperators.filter((op) => op.name === "in"),
    },
  };
  console.log("possibleValues", possibleValues);
  return fields[type];
};
