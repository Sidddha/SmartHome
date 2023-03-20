
defineVirtualDevice("outdoor", {
    title: "OutdoorWidget" ,
    readonly: false,
    cells: {
      Temperature: {
          title: "Temperature",
	        type: "temperature",
	        value: dev["wb-ms_138/Temperature"]
	    },
      Humidity: {
          title: "Humidity",
	        type: "rel_humidity", 
	        value: dev["wb-ms_138/Humidity"]
	    }
    }
})