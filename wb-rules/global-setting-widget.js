var globalHeaterButton = "global/GlobalHeaterButton";
var globalHeaterHeader = "global/HeaderGH";

var outdoorLightLux = "wb-ms_138/Illuminance";

var illuminanceHisteresis = 2;

var globalLightButton = "global/GlobalLightButton";
var globalLightHeader = "global/GlobalLightHeader";
var globalLightSet = "global/LightControl";

defineVirtualDevice("global", {
    title: "Global" ,
    readonly: false,
    cells: {
      HeaderGH: {
          title: "GlabalHeaterMode",
          type: "text",
          value: "Включить авто-режим отопления"
      },
      GlobalHeaterButton: {
          type: "switch",
          value: dev[globalHeaterButton]
      },
      GlobalLightHeader: {
        title: "GlobalLigth",
        type: "text",
        value: "Включить авто-режим освещения"
      },
      GlobalLightButton: {
        type: "switch",
        value: dev[GlobalLightButton]
      },
      LightControl: {
        type: "range",
        value: 11,
        min: 0,
        max: 5000
      }
    }
})


