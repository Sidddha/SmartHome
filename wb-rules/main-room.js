var heaterState = new PersistentStorage("heater-states", {global: true});
var lightState = new PersistentStorage("light-states", {global: true});

heaterState["tamburCarpet"] = "auto";
heaterState["tamburHeater"] = "auto";
heaterState["mainHeater"] = "auto";
var tc_counter = 0;
var th_counter = 0;
var mh_counter = 0;

lightState["mainOutdoorLight"] = "auto";
var l_counter = 0;

defineVirtualDevice('main-room', {
    title: 'MainRoom' ,
    readonly: false, 
    cells: {
        Header: {
            title: "header",
            type: "text",
            value: "Первый этаж"
          },        
        Temperature: {
            title: "Temperature",
            type: "temperature",
            value: dev["wb-msw-v3_201/Temperature"]
            },
        Humidity: {
            title: "Humidity",
            type: "rel_humidity",
            value: dev["wb-msw-v3_201/Humidity"]
            },
        HeaterControl: {
            title: "Установка температуры",
            type: "range",
            value: 22,
            min: 5,
            max: 30
        },
        TamburCarpetButton: {
            type: "pushbutton",
            value: false
        },
        TamburHeaterButton: {
            type: "pushbutton",
            value: false
        },
        MainHeaterButton: {
            type: "pushbutton",
            value: false
        },
        LightsButton: {
            type: "pushbutton",
            value: false
        },
        HeaderL: {
            title: "header",
            type: "text",
            value: lightState["mainOutdoorLight"]
        },
        HeaderTC: {
            title: "header",
            type: "text",
            value: heaterState["tamburCarpet"]
          }, 
        HeaderTH: {
            title: "header",
            type: "text",
            value: heaterState["tamburHeater"]
          }, 
        HeaderMH: {
            title: "header",
            type: "text",
            value: heaterState["mainHeater"]
          },  
        Header2: {
            title: "header",
            type: "text",
            value: "Второй этаж"
          },        
        Temperature2: {
            title: "Temperature2",
            type: "temperature",
            value: dev["wb-ms_90/Temperature"]
            },
        Humidity2: {
            title: "Humidity2",
            type: "rel_humidity",
            value: dev["wb-ms_90/Humidity"]
            }    
                                                 
    }
})

function buttonsLogic(name, button_control, holding_cell, button_counter, control_to_be_edit) {
    defineRule(name, {
        when: function() {
            return dev["main-room/" + button_control];
        },
        then: function() {
            button_counter++;
            if(button_counter == 1) {
                heaterState[holding_cell] = "auto";
                getControl("main-room/" + control_to_be_edit).setValue(heaterState[holding_cell]);
                return;
            }
            if(button_counter == 2) {
                heaterState[holding_cell] = "On";
                getControl("main-room/" + control_to_be_edit).setValue(heaterState[holding_cell]);
                return;            
            }
            if(button_counter == 3) {
                heaterState[holding_cell] = "Off";
                getControl("main-room/" + control_to_be_edit).setValue(heaterState[holding_cell]);
                button_counter = 0;
                return;            
            }        
        }
    });
}

buttonsLogic("1", "TamburCarpetButton", "tamburCarpet", tc_counter, "HeaderTC");
buttonsLogic("2", "TamburHeaterButton", "tamburHeater", th_counter, "HeaderTH");
buttonsLogic("3", "MainHeaterButton", "mainHeater", mh_counter, "HeaderMH");
buttonsLogic("4", "LightsButton", "mainOutdoorLight", l_counter, "HeaderL");