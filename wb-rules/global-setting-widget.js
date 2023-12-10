var globalHeaterButton = "global/GlobalHeaterButton";
var globalHeaterHeader = "global/HeaderGH";

var outdoorLightLux = "wb-ms_138/Illuminance";

defineVirtualDevice("global", {
    title: "Global" ,
    readonly: false,
    cells: {
        GlobalHeaterButton: {
          title: "Авто-режим отопления",
          type: "switch",
          value: true
      },
      GlobalLightButton: {
        title: "Включить авто-режим освещения",
        type: "switch",
        value: true
      },
      LightControl: {
        title: "Ругудировка освещения",
        type: "range",
        value: 11,
        min: 0,
        max: 100
      }
    }
})


