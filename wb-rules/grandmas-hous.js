var heaterState = new PersistentStorage("heater-states", {global: true});
var lightState = new PersistentStorage("light-states", {global: true});

heaterState["gmHousHeater"] = "auto";
lightState["gmOutdoorLight"] = "auto";
var h_counter = 0;
var l_counter = 0;


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
      HeaderL: {
          title: "header",
          type: "text",
          value: lightState["gmOutdoorLight"]
      },
      HeaderH: {
          title: "header",
          type: "text",
          value: heaterState["gmHousHeater"]
      }   
    }
})

function buttonsLogic(name, button_control, holding_cell, button_counter, control_to_be_edit) {
  defineRule(name, {
      when: function() {
          return dev["grandmas-hous/" + button_control];
      },
      then: function() {
          button_counter++;
          if(button_counter == 1) {
              heaterState[holding_cell] = "auto";
              getControl("grandmas-hous/" + control_to_be_edit).setValue(heaterState[holding_cell]);
              return;
          }
          if(button_counter == 2) {
              heaterState[holding_cell] = "On";
              getControl("grandmas-hous/" + control_to_be_edit).setValue(heaterState[holding_cell]);
              return;            
          }
          if(button_counter == 3) {
              heaterState[holding_cell] = "Off";
              getControl("grandmas-hous/" + control_to_be_edit).setValue(heaterState[holding_cell]);
              button_counter = 0;
              return;            
          }        
      }
  });
}

buttonsLogic("1", "HeaterButton", "gmHousHeater", h_counter, "HeaderH");
buttonsLogic("2", "OutdoorLightButton", "gmOutdoorLight", l_counter, "HeaderL");
