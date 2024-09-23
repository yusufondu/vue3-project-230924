export interface Horse {
  id: number;
  condition: number;
  color: string;
  finishTime?: number;
  horseName: string;
}

export interface RaceState {
  horses: Horse[];
  schedule: any[];
  results: Horse[][];
  running: boolean;
  finished: boolean;
  paused: boolean;
  generated: boolean;
}

export interface Run {
  distance: number;
  horses: Horse[];
}
