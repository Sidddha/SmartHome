// var globalHeaterButton = "global/GlobalHeaterButton";
// var globalHeaterHeader = "global/HeaderGH";

// var outdoorLightLux = "wb-ms_138/Illuminance";

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
        title: "Авто-режим освещения",
        type: "switch",
        value: true
      },
      LightControl: {
        title: "Уставка освещения",
        type: "range",
        value: 11,
        min: 0,
        max: 100
      },
      GoingDacha: {
        title: "Сценарий 'Едем на дачу'",
        type: "pushbutton",
        value: false
      },
      GoingHome: {
        title: "Сценарий 'Едем домой'",
        type: "pushbutton",
        value: false
      }
    }
})

