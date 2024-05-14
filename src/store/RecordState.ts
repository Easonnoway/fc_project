import { defineStore } from "pinia";

export const useRecordStore = defineStore("record", {
  state: () => ({
    detailData: {
      biomass_blended_fuel: [] as any[],
      desulfurization: [] as any[],
      electricity_and_heat: [] as any[],
      industrial_process: [] as any[],
      fossil_fuel: [] as any[],
      industrial_process_ceramic: [] as any[],
      information: [] as any[]
    },
  }),
});
