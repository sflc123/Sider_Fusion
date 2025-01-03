interface _WorkOrder {
  id: number;
  type: number;
  startX: number;
  startY: number;
  startZ: number;
  endX: number;
  endY: number;
  endZ: number;
}
export type WorkOrder = _WorkOrder;
