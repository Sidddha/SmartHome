var heaterState = new PersistentStorage("heater-states", {global: true});
var lightState = new PersistentStorage("light-states", {global: true});

heaterState["baniaMediumHeater"] = "auto";
heaterState["baniaTamburHeater"] = "auto";
heaterState["baniaMainHeater"] = "auto";
heaterState["baniaWaterPrepareHeater"] = "auto";

var medium_counter = 0;
var tambur_counter = 0;
var main_counter = 0;
var waterprepare_counter = 0;

lightState["baniaOutdoorLight"] = "auto";
var l_counter = 0;

defineVirtualDevice('rest-room', {
    title: 'RestRoom' ,
    readonly: false, 
    cells: {
        HeaderRestRoom: {
            title: "header",
            type: "text",
            value: "Комната отдыха"
        },
        TemperatureRestRoom: {
            title: "Temperature",
            type: "temperature",
            value: dev["wb-msw-v3_49/Temperature"]
	    },
        HumidityRestRoom: {
            title: "Humidity",
            type: "rel_humidity",
            value: dev["wb-msw-v3_49/Humidity"]
	    },
        HeaterControl: {
            type: "range",
            value: 22,
            min: 5,
            max: 30
        },
        MainHeaterButton: {
            type: "pushbutton",
            value: false
        },
        MediumHeaterButton: {
            type: "pushbutton",
            value: false
        }, 
        TamburHeaterButton: {
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
            value: lightState["baniaOutdoorLight"]
        },
        MainHeaterHeader: {
            title: "header",
            type: "text",
            value: heaterState["baniaMainHeater"]
        },
        MediumHeaterHeader: {
            title: "header",
            type: "text",
            value: heaterState["baniaMediumHeater"]
        },          
        TamburHeaterHeader: {
            title: "header",
            type: "text",
            value: heaterState["baniaTamburHeater"]
        },
        HeaderWaterPrepare: {
            title: "header",
            type: "text",
            value: "Комната водоподготовки"
        },    
        WaterPrepareHeaterButton: {
            type: "pushbutton",
            value: false
        },
        WaterPrepareHeaterHeader: {
            title: "header",
            type: "text",
            value: heaterState["baniaWaterPrepareHeater"]
        },
        TemperatureWaterPrepareRoom: {
            title: "Temperature",
            type: "temperature",
            value: dev["wb-ms_187/Temperature"]
	    },
        HumidityWaterPrepareRoom: {
            title: "Humidity",
            type: "rel_humidity",
            value: dev["wb-ms_187/Humidity"]
	    },
        TemperatureBarrel1: {
            title: "Temperature",
            type: "temperature",
            value: dev["wb-ms_187/External Sensor 1"]
	    },
        TemperatureBarrel2: {
            title: "Temperature",
            type: "temperature",
            value: dev["wb-ms_187/External Sensor 2"]
	    },              
        HeaderUnderfloor: {
            title: "header",
            type: "text",
            value: "Подвал"
        },       
        TemperatureUnderfloor: {
            title: "Temperature",
            type: "temperature",
            value: dev["wb-ms_239/Temperature"]
	    },
        HumidityUnderfloor: {
            title: "Humidity",
            type: "rel_humidity",
            value: dev["wb-ms_239/Humidity"]
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

buttonsLogic("1", "MainHeaterButton", "baniaMainHeater", main_counter, "MainHeaterHeader");
buttonsLogic("2", "TamburHeaterButton", "baniaTamburHeater", tambur_counter, "TamburHeaterHeader");
buttonsLogic("3", "MediumHeaterButton", "baniaMediumHeater", medium_counter, "MediumHeaterHeader");
buttonsLogic("4", "WaterPrepareHeaterButton", "baniaWaterPrepareHeater", waterprepare_counter, "WaterPrepareHeaterHeader");
buttonsLogic("5", "OutdoorLightButton", "baniaOutdoorLight", l_counter, "OutdoorLightHeader");
