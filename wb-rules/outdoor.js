defineVirtualDevice('outdoor', {
    title: 'Outdoor' ,
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
	    },
      LightsOn: {
            type: "switch",
            value: false
        },
      LightsOff: {
        type: "switch",
        value: false        
      },
      LightsAuto: {
        type: "switch",
        value: true       
      },
      Header: {
        title: "header",
        type: "text",
        value: "Уличное освещение"
      }             
    }
})

defineRule("buttonsLogic1", {
    asSoonAs: function() {
        return dev["outdoor/LightsOn"];
    },
    then: function() {
        dev["outdoor/LightsOff"] = false;
        dev["outdoor/LightsAuto"] = false;
    }
});

defineRule("buttonsLogic2", {
    asSoonAs: function() {
        return dev["outdoor/LightsOff"];
    },
    then: function() {
        dev["outdoor/LightsOn"] = false;
        dev["outdoor/LightsAuto"] = false;
    }
});

defineRule("buttonsLogic3", {
    asSoonAs: function() {
        return dev["outdoor/LightsAuto"];
    },
    then: function() {
        dev["outdoor/LightsOff"] = false;
        dev["outdoor/LightsOn"] = false;
    }
});