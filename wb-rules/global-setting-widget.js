var GlobalHeaterState = new PersistentStorage("global-heater-states", {global: true});
var lightState = new PersistentStorage("light-states", {global: true});

GlobalHeaterState["globalHeater"] = "OFF";
lightState["global"] = "OFF";

var globalHeaterButton = "global/GlobalHeaterButton";
var globalHeaterHeader = "global/HeaderGH";

defineVirtualDevice('global', {
    title: 'Global' ,
    readonly: false,
    cells: {
      GlobalHeaterButton: {
          type: "pushbutton",
      },
      HeaderGH: {
          title: "header",
          type: "text",
          value: GlobalHeaterState["globalHeater"]
      },
      GlobalLightButton: {
        type: "pushbutton"
      },
      GlobalLightHeader: {
        title: "header",
        type: "text",
        value: lightState["global"]
      },
      LightControl: {
        type: "range",
        value: 500,
        min: 0,
        max: 5000
      }
    }
})


