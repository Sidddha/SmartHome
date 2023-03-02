var heaterState = new PersistentStorage("heater-states", {global: true});
var lightState = new PersistentStorage("light-states", {global: true});

var gmHousHeaterMemoryCell = heaterState["gmHousHeater"];
var gmHousOutdoorLightMemoryCell = lightState["gmOutdoorLight"];

defineVirtualDevice('grandmas-hous', {
    title: 'GrandmasHaus' ,
    readonly: false,
    cells: {
      Temperature: {
          title: "Temperature",
	        type: "temperature",
	        value: dev["wb-ms_132/Temperature"]
	    },
      Humidity: {
          title: "Humidity",
	        type: "rel_humidity",
	        value: dev["wb-ms_132/Humidity"]
	    },
      HeaterControl: {
          type: "range",
          value: 22, 
          min:5,
          max: 30
      },
      HeaterButton: {
          type: "pushbutton",
          value: false
      },
      OutdoorLightButton: {
          type: "pushbutton",
          value: false
      },
      OutdoorLightHeader: {
          title: "header",
          type: "text",
          value: gmHousOutdoorLightMemoryCell
      },
      HeaterHeader: {
          title: "header",
          type: "text",
          value: gmHousHeaterMemoryCell
      }   
    }
})

