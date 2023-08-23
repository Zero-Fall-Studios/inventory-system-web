/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ColumnData {
  type: string;
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
