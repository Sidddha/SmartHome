var heaterState = new PersistentStorage("heater-states", {global: true}); 
var lightState = new PersistentStorage("light-states", {global: true}); 
lightState["baniaOutdoorLight"] = "OFF";

var heaterHisteresis = 0.5;


////////////////////////////////////

heaterState["baniaMediumHeater"];
heaterState["baniaTamburHeater"];
heaterState["baniaMainHeater"];
heaterState["baniaWaterPrepareHeater"];

var mainHeaterMemoryCell = heaterState["baniaMainHeater"];
var mediumHeaterMemoryCell = heaterState["baniaMediumHeater"];
var tamburHeaterMemoryCell = heaterState["baniaTamburHeater"];
var waterPrepareMemoryCell = heaterState["baniaWaterPrepareHeater"];

var mainHeaterOn = "wb-mr6c_214/K3";
var mediumHeaterOn = "wb-mr6c_214/K4";
var tamburHeaterOn = "wb-mr6c_214/K5";
var waterPrepareHeaterOn = "wb-mr6c_214/K6";

var restRoomTemp = "wb-msw-v3_49/Temperature";
var waterPrepareTemp = "wb-ms_187/Temperature";

var mainHeaterButton = "rest-room/MainHeaterButton";
var mediumHeaterButton = "rest-room/MediumHeaterButton";
var tamburHeaterButton = "rest-room/TamburHeaterButton";
var waterPrepareHeaterButton = "rest-room/WaterPrepareHeaterButton";

var mainHeaterHeader = "rest-room/MainHeaterHeader";
var mediumHeaterHeader = "rest-room/MediumHeaterHeader";
var tamburHeaterHeader = "rest-room/TamburHeaterHeader";
var waterPrepareHeaterHeader = "rest-room/WaterPrepareHeaterHeader";

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

function Device(set_param, actual_param, device_control, button_control, memory_cell, header_control, histeresis) {
    this.set_param = set_param;
    this.actual_param = actual_param;
    this.device_control = device_control;
    this.button_control = button_control;
    this.memory_cell = memory_cell;
    this.header_control = header_control;
    this.histeresis = histeresis;
  }
  
  Device.prototype.setMode = function(mode) {
    this.memory_cell = mode;
    getControl(this.header_control).setValue(this.memory_cell);
  }
  
  Device.prototype.getMode = function() {
    return this.memory_cell;	
  }
  
  Device.prototype.checkState = function() {
    switch(this.memory_cell) {
        case "AUTO":
            if(dev[this.actual_param] > (dev[this.set_param] + this.histeresis)) {
              dev[this.device_control] = false;
              return;
            }
            if(dev[this.actual_param] < (dev[this.set_param] - this.histeresis)) {
              dev[this.device_control] = true;
              return;
            }
            break;
        case "ON":
            dev[this.device_control] = true;
            break;
        case "OFF":
            dev[this.device_control] = false;
            break;
    }
  }


function buttonsLogic(device) {
    defineRule({
        when: function() {
            return dev[device.button_control];
        },
        then: function() {
            switch(device.getMode()) {
                case "AUTO":
                    device.setMode("ON");
                	device.checkState();
                    break;
                case "ON":
                    device.setMode("OFF");
                	device.checkState();
                    break;
                case "OFF":
                    device.setMode("AUTO");
                    device.checkState();
                	break;
            }    
        }
    });
}


var MainHeater = new Device(restRoomTempSet, restRoomTemp, mainHeaterOn, mainHeaterButton, mainHeaterMemoryCell, mainHeaterHeader, heaterHisteresis);
var MediumHeater = new Device(restRoomTempSet, restRoomTemp, mediumHeaterOn, mediumHeaterButton, mediumHeaterMemoryCell, mediumHeaterHeader, heaterHisteresis);
var TamburHeater = new Device(restRoomTempSet, restRoomTemp, tamburHeaterOn, tamburHeaterButton, tamburHeaterMemoryCell, tamburHeaterHeader, heaterHisteresis);
var WaterPrepareHeater = new Device(waterPrepareTempSet, waterPrepareTemp, waterPrepareHeaterOn, waterPrepareHeaterButton, waterPrepareMemoryCell, waterPrepareHeaterHeader, heaterHisteresis);

function stateCheck(device) {
    defineRule({
        whenChanged: function() {
            return dev[device.set_param] || dev[device.actual_param];
        },
        then: function() {
            device.checkState();
            log(device.memory_cell + " check");
        }
    })
}


buttonsLogic(MainHeater);
buttonsLogic(MediumHeater);
buttonsLogic(TamburHeater);
buttonsLogic(WaterPrepareHeater);

stateCheck(MainHeater);
stateCheck(MediumHeater);
stateCheck(TamburHeater);
stateCheck(WaterPrepareHeater);
