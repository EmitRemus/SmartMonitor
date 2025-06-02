export type SelectedNodeData = {
  name: string;
  type: string;
  id: string;
  totalHotWater: number | undefined;
  totalColdWater: number | undefined;
  consumption: number | undefined;
  fraudFactor: number | undefined;
  lastReading: string | undefined;
};
