import { reactive } from "vue";
export class Locat {
  x: number = 0;
  y: number = 0;
  z: number = 0;
}

export class Plc2WmsRealTimeStatus {
  load: boolean = false;
  operationCommand: number = 0;
  width: number = 0;
  currentLocation: Locat = reactive(new Locat());
  waitCode: number = 0;
  locusStatus: number = 0;
  masterSwitch: boolean = false;
  remoteStatus: boolean = false;
  operationMode: number = 0;
  faultInfo: number = 0;
  weight: number = 0;
  messageBack: number = 0;
}

export class Plc2WmsInstanceStatus {
  ResultMode: number = 0;
  Address: string = "";
  Location: Locat = new Locat();
  Weight: number = 0;
  CraneNumber: number = 0;
  MaterialName: string = "";
  ReadFlag: number = 0;
}

export class Mode {
  PlcMode: number = 0;
  MoveMode: number = 0;
  OperatorMode: number = 0;
}

export class Wms2PlcCommand {
  CraneNumber: number = 0;
  Mode: Mode = new Mode();
  DestinationX: number = 0;
  DestinationY: number = 0;
}

export class Wms2PlcTask {
  CraneNumber: number = 0;
  JobMode: string = "";
  LogicOriginAddress: string = "";
  OriginLocation: Locat = new Locat();
  LogicDestinationAddress: string = "";
  DestinationLocation: Locat = new Locat();
  Weight: number = 0;
  MaterialName: string = "";
  ChargeSaftyHeight: number = 0;
  DischargeSaftyHeight: number = 0;
  ScanFlag: number = 0;
  ScanDistance: number = 0;
  DestinationType: number = 0;
}
