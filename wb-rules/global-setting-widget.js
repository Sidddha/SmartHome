var GlobalHeaterState = new PersistentStorage("global-heater-states", {global: true});

GlobalHeaterState["globalHeater"] = "OFF";

var globalHeaterButton = "global-heater/GlobalHeaterButton";
var globalHeaterHeader = "global-heater/HeaderGH";

defineVirtualDevice('global-heater', {
    title: 'GlobalHeater' ,
    readonly: false,
    cells: {
      GlobalHeaterButton: {
          type: "pushbutton",
          value: false
      },
      HeaderGH: {
          title: "header",
          type: "text",
          value: GlobalHeaterState["globalHeater"]
      }   
    }
})


