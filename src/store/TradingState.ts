import { defineStore } from "pinia";

export const useTradingStore = defineStore("record", {
  state: () => ({
    historyData : [],
    userInform : []
  }),
});
