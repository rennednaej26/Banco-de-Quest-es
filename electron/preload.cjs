const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("bancoAI", {
  platform: process.platform,
  version: "1.0.0"
});
