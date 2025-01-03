import { defineStore } from "pinia";
import { store } from "../utils";
import axios from "axios";
import Urls from "../urls";

export const useScannerDataStore = defineStore("scannerData", {
  state: () => ({
    scannerData: Float32Array
  }),
  actions: {
    async updateScannerData() {
      this.scannerData = await axios.get(Urls.ScannerData.GetArray);
    },
    async getScannerData(): Promise<Float32Array> {
      this.updateScannerData();
      return this.scannerData;
    }
  }
});

export function useScannerDataStoreHook() {
  return useScannerDataStore(store);
}
