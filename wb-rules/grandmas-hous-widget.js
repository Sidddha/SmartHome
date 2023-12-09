var gmHouseTemp = "wb-ms_132/Temperature";
var gmHouseHum = "wb-ms_132/Humidity";
var gmHouseHeaterState = "wb-mr3_34/K1";
var gmHouseTempSet = "grandmas-hous/HeaterControl";
var gmHouseHeaterButton = "grandmas-hous/HeaterButton";
var gmHouseHeaterHeader = "grandmas-hous/HeaterHeader";

var gmOutdoorLightState= "wb-mr3_34/K3";
var gmOutdoorLightButton = "grandmas-hous/OutdoorLightButton";
var gmOutdoorLightHeader = "grandmas-hous/OutdoorLightHeader";

defineVirtualDevice("grandmas-house", {
    title: "GrandmasHouse" ,
    readonly: false,
    cells: {
      Temperature: {
          title: "Temperature",
	        type: "temperature",
	        value: dev[gmHouseTemp]
	    },
      Humidity: {
          title: "Humidity",
	        type: "rel_humidity", 
	        value: dev[gmHouseHum]
	    },
      HeaterControl: {
          type: "range",
          value: 22, 
          min:5,
          max: 30
      },
      HeaterHeader: {
          title: "Heater",
          type: "text",
          value: "Обогреватель"
      }, 
      HeaterButton: {
          type: "switch",
          value: dev[gmHouseHeaterState]
      },
      OutdoorLightHeader: {
          title: "OutdoorLight",
          type: "text",
          value: "Уличное освещение"
      },
      OutdoorLightButton: {
          type: "switch",
          value: dev[gmOutdoorLightState]
      }
    }
})

