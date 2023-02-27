var heaterState = new PersistentStorage("heater-states", {global: true});
var lightState = new PersistentStorage("light-states", {global: true});

heaterState["baniaMediumHeater"] = "auto";
heaterState["baniaTamburHeater"] = "auto";
heaterState["baniaMainHeater"] = "auto";
heaterState["baniaWaterPrepareHeater"] = "auto";

lightState["baniaOutdoorLight"] = "auto";

var mainHeaterOn = "wb-mr6c_214/K3";
var mediumHeaterOn = "wb-mr6c_214/K4";
var tamburHeaterOn = "wb-mr6c_214/K5";
var waterPrepareHeaterOn = "wb-mr6c_214/K6";

var restRoomTemp = "wb-msw-v3_49/Temperature";
var waterPrepareTemp = "wb-ms_187/Temperature";

var globalHeaterButton = "global-heater/GlobalHeaterButton";
var mainHeaterButton = "rest-room/MainHeaterButton";
var mediumHeaterButton = "rest-room/MediumHeaterButton";
var tamburHeaterButton = "rest-room/TamburHeaterButton";
var waterPrepareHeaterButton = "rest-room/WaterPrepareHeaterButton";

var restRoomTempSet = "rest-room/MainHeaterControl";
var waterPrepareTempSet = "rest-room/WaterPrepareHeaterControl";

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
        MainHeaterControl: {
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
        WaterPrepareHeaterControl: {
            type: "range",
            value: 22,
            min: 5,
            max: 30
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

function Heater(set_temp, room_temp, heater_control, button_control, memory_cell, header_control) {
    this.set_temp = set_temp;
    this.room_temp = room_temp;
    this.heater_control = heater_control;
    this.button_control = button_control;
    this.memory_cell = memory_cell;
    this.header_control = header_control;
}

Heater.prototype.setMode = function(mode) {
heaterState[this.memory_cell] = mode;
getControl(this.header_control).setValue(heaterState[this.memory_cell]);
}

Heater.prototype.getMode = function() {
return heaterState[this.memory_cell];
}

Heater.prototype.checkState = function() {
    switch(heaterState[this.memory_cell]) {
        case "auto":
            if((dev[this.room_temp] < (dev[this.set_temp]- 0.5)) && !dev[this.heater_control]) getControl(this.heater_control).setValue(true);
            if((dev[this.room_temp] < (dev[this.set_temp] + 0.5)) && dev[this.heater_control]) getControl(this.heater_control).setValue(false);
            else getControl(this.heater_control).setValue(false);
            break;
        case "On":
            getControl(this.heater_control).setValue(true);
            break;
        case "Off":
            getControl(this.heater_control).setValue(false)
            break;
    }
}


function buttonsLogic(heater) {
    defineRule({
        when: function() {
            return dev[heater.button_control];
        },
        then: function() {
            switch(heater.getMode()) {
                case "auto":
                    heater.setMode("On");
                    break;
                case "On":
                    heater.setMode("Off");
                    break;
                case "Off":
                    heater.setMode("Auto");
                    break;
            }    
        }
    });
}



var MainHeater = new Heater(restRoomTempSet, restRoomTemp, mainHeaterOn, mainHeaterButton, "baniaMainHeater", "rest-room/MainHeaterHeader");
var MediumHeater = new Heater(restRoomTempSet, restRoomTemp, mediumHeaterOn, mediumHeaterButton, "baniaMeduimHeater", "rest-room/MediumHeaterHeader");
var TamburHeater = new Heater(restRoomTempSet, restRoomTemp, tamburHeaterOn, tamburHeaterButton, "baniaTamburHeater", "rest-room/TamburHeaterHeader");
var WaterPrepareHeater = new Heater(waterPrepareTempSet, waterPrepareTemp, waterPrepareHeaterOn, waterPrepareHeaterButton, "baniaWaterPrepareHeater", "rest-room/WaterPrepareHeaterHeader");

buttonsLogic(MainHeater);
buttonsLogic(MediumHeater);
buttonsLogic(TamburHeater);
buttonsLogic(WaterPrepareHeater);
