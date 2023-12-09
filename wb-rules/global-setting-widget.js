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


