export interface TodoData {
  id: number;
  name: string;
  completed: boolean;
  created: Date;
  modified: Date;
}

export type Filter = "all" | "active" | "completed";
