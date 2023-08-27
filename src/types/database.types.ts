/* eslint-disable @typescript-eslint/no-explicit-any */

export type ColumnType =
  | "string"
  | "number"
  | "boolean"
  | "null"
  | "array"
  | "object"
  | "select";

export const possibleColumnTypes: ColumnType[] = [
  "string",
  "number",
  "boolean",
  "null",
  "array",
  "object",
  "select",
];

export interface ColumnData {
  type: ColumnType;
  possible_values?: string[];
}

export type Schema = Record<string, ColumnData>;

export interface Table {
  schema: Schema;
  data: any[];
}

export interface Database {
  name: string;
  tables: Record<string, Table>;
}
