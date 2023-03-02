
var heaterHisteresis = 0.5;

var GlobalHeaterState = new PersistentStorage("global-heater-states", {global: true});
var heaterState = new PersistentStorage("heater-states", {global: true});
var lightState = new PersistentStorage("light-states", {global: true});

GlobalHeaterState["globalHeater"] = "OFF";

var globalHeaterButton = "global-heater/GlobalHeaterButton";
var globalHeaterHeader = "global-heater/HeaderGH";

////////////////////////////////////

heaterState["mainRoomTamburCarpet"] = "OFF";
heaterState["mainRoomTamburHeater"] = "OFF";
heaterState["mainRoomHeater"] = "OFF";

lightState["mainRoomOutdoorLight"] = "OFF";

var mainRoomTamburCarpetMemoryCell = heaterState["mainRoomTamburCarpet"];
var mainRoomTamburHeaterMemoryCell = heaterState["mainRoomTamburHeater"];
var mainRoomHeaterMemoryCell = heaterState["mainRoomHeater"];

var mainRoomOutdoorLightMemoryCell = lightState["mainRoomOutdoorLight"];

var mainRoomTamburCarpetOn = "wb-mr6c_24/K3";
var mainRoomTamburHeaterOn = "wb-mr6c_24/K2";
var mainRoomHeaterOn = "cmnd/tasmota_C6208D/POWER";

var mainRoomTemp = "wb-msw-v3_201/Temperature";
var mainRoomTempSet = "main-room/HeaterControl";

var mainRoomTamburCarpetButton = "main-room/TamburCarpetButton";
var mainRoomTamburHeaterButton = "main-room/TamburHeaterButton";
var mainRoomHeaterButton = "main-room/HeaterButton";

var mainRoomTamburCarpetHeader = "main-room/TamburCarpetHeader";
var mainRoomTamburHeaterHeader = "main-room/TamburHeaterHeader";
var mainRoomHeaterHeader = "main-room/HeaterHeader";

////////////////////////////////////

var gmHousTemp = "wb-ms_132/Temperature";
var gmHousHeaterOn = "wb-mr3_34/K1";
var gmHousTempSet = "grandmas-hous/HeaterControl";
var gmHousHeaterButton = "grandmas-hous/HeaterButton";
var gmHousHeaterHeader = "grandmas-hous/HeaterHeader";

heaterState["gmHousHeater"] = "OFF";

var gmHousHeaterMemoryCell = heaterState["gmHousHeater"];

////////////////////////////////////

heaterState["baniaMainHeater"] = "OFF";
heaterState["baniaMediumHeater"] = "OFF";
heaterState["baniaTamburHeater"] = "OFF";
heaterState["baniaWaterPrepareHeater"] = "OFF";

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

/////////////////////////////////////////

var Device = function(set_param, actual_param, device_control, button_control, memory_cell, header_control, histeresis, external_topic) {
    this.set_param = set_param;
    this.actual_param = actual_param;
    this.device_control = device_control;
    this.button_control = button_control;
    this.memory_cell = memory_cell;
    this.header_control = header_control;
    this.histeresis = histeresis;
    if(external_topic == undefined) {
        this.external_topic = false;
    } else {
        this.external_topic = external_topic;
    }

  }
  
  Device.prototype.setMode = function(mode) {
    this.memory_cell = mode;
    getControl(this.header_control).setValue(this.memory_cell);
    log(this.header_control);
  }
  
  Device.prototype.getMode = function() {
    return this.memory_cell;	
  }

  Device.prototype.getSetParam = function() {
    return this.set_param;	
  }
  Device.prototype.getActualParam = function() {
    return this.actual_param;	
  }
  Device.prototype.getSetParam = function() {
    return this.set_param;	
  }
  Device.prototype.getButton = function() {
    return this.button_control;	
  }
  
  Device.prototype.checkState = function() {
    debug(this.header_control + "external is: " + this.external_topic);
    switch(this.external_topic) {
        case false:
            switch(this.memory_cell) {
                case "AUTO":
                    if(dev[this.actual_param] > (dev[this.set_param] + this.histeresis)) {
                      dev[this.device_control] = false;
                      debug(this.header_control + " set to " + false);
                      return;
                    }
                    if(dev[this.actual_param] < (dev[this.set_param] - this.histeresis)) {
                      dev[this.device_control] = true;
                      debug(this.header_control + " set to " + true);
                      return;
                    }
                    break;
                case "ON":
                    dev[this.device_control] = true;
                    debug(this.header_control + " set to " + true);
                    break;
                case "OFF":
                    dev[this.device_control] = false;
                    debug(this.header_control + " set to " + false);
                    break;
                default:
                    dev[this.device_control] = false;
                    debug(this.header_control + " set to " + false);
                    break;           
            }
            break;
        case true:
            switch(this.memory_cell) {
                case "AUTO":
                    if(dev[this.actual_param] > (dev[this.set_param] + this.histeresis)) {
                        publish(this.device_control, "false");
                        log("publish to: " + this.device_control);
                        debug(this.header_control + " set to " + false);
                        return;
                    }
                    if(dev[this.actual_param] < (dev[this.set_param] - this.histeresis)) {
                        publish(this.device_control, "true");
                        log("publish to: " + this.device_control);
                        debug(this.header_control + " set to " + true);
                        return;
                    }
                    break;
                case "ON":
                    publish(this.device_control, "true");
                    log("publish to: " + this.device_control);
                    debug(this.header_control + " set to " + true);
                    break;
                case "OFF":
                    publish(this.device_control, "false");
                    log("publish to: " + this.device_control);
                    debug(this.header_control + " set to " + false);
                    break;
                default:
                    publish(this.device_control, "false");
                    log("publish to: " + this.device_control);
                    debug(this.header_control + " set to " + false);
                    break;           
            }
            break;
    }

  }

function checkState(device) {
        defineRule({
            whenChanged: function() {
                return dev[device.set_param] || dev[device.actual_param];
            },
            then: function() {
                device.checkState();
            }
        })  
    }


function button(device) {
    defineRule({
        when: function() {
            return dev[device.button_control];
        },
        then: function() {
            switch(device.memory_cell) {
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
                default:
                    device.setMode("OFF");
                    device.checkState();
                    break;                   
            }  
        }
    })
}
    



function globalButton(devices) {

    defineRule({
        when: function() {
        return dev[globalHeaterButton];
        },
        then: function() {
        switch(GlobalHeaterState["globalHeater"]) {
            case "AUTO":    
                GlobalHeaterState["globalHeater"] = "ON";
                getControl(globalHeaterHeader).setValue(GlobalHeaterState["globalHeater"]);
                break;
            case "ON":
                GlobalHeaterState["globalHeater"] = "OFF";
                getControl(globalHeaterHeader).setValue(GlobalHeaterState["globalHeater"]);
                break;
            case "OFF":
                GlobalHeaterState["globalHeater"] = "AUTO";
                getControl(globalHeaterHeader).setValue(GlobalHeaterState["globalHeater"]);
                break;
            default:
                GlobalHeaterState["globalHeater"] = "OFF";
                getControl(globalHeaterHeader).setValue(GlobalHeaterState["globalHeater"]);
                break;

        };

        for( i = 0; i < devices.length; ++i) {
            device = devices[i];
            device.setMode(GlobalHeaterState["globalHeater"]);
            device.checkState();
            log(i + " " + device.getButton())
        }

        }
    })
}

var mainRoomHeater = new Device(mainRoomTempSet, mainRoomTemp, mainRoomHeaterOn, mainRoomHeaterButton, mainRoomHeaterMemoryCell, mainRoomHeaterHeader, heaterHisteresis, true);
var mainRoomTamburCarpet = new Device(mainRoomTempSet, mainRoomTemp, mainRoomTamburCarpetOn, mainRoomTamburCarpetButton, mainRoomTamburCarpetMemoryCell, mainRoomTamburCarpetHeader, heaterHisteresis);
var mainRoomTamburHeater = new Device(mainRoomTempSet, mainRoomTemp, mainRoomTamburHeaterOn, mainRoomTamburHeaterButton, mainRoomTamburHeaterMemoryCell, mainRoomTamburHeaterHeader, heaterHisteresis);
var baniaMainHeater = new Device(restRoomTempSet, restRoomTemp, mainHeaterOn, mainHeaterButton, mainHeaterMemoryCell, mainHeaterHeader, heaterHisteresis);
var baniaMediumHeater = new Device(restRoomTempSet, restRoomTemp, mediumHeaterOn, mediumHeaterButton, mediumHeaterMemoryCell, mediumHeaterHeader, heaterHisteresis);
var baniaTamburHeater = new Device(restRoomTempSet, restRoomTemp, tamburHeaterOn, tamburHeaterButton, tamburHeaterMemoryCell, tamburHeaterHeader, heaterHisteresis);
var waterPrepareHeater = new Device(waterPrepareTempSet, waterPrepareTemp, waterPrepareHeaterOn, waterPrepareHeaterButton, waterPrepareMemoryCell, waterPrepareHeaterHeader, heaterHisteresis);
var gmHousHeater = new Device(gmHousTempSet, gmHousTemp, gmHousHeaterOn, gmHousHeaterButton, gmHousHeaterMemoryCell, gmHousHeaterHeader, heaterHisteresis);

var devices = [
    baniaMainHeater,
    baniaMediumHeater,
    baniaTamburHeater,
    waterPrepareHeater,
    gmHousHeater,
    mainRoomHeater,
    mainRoomTamburCarpet,
    mainRoomTamburHeater
]

globalButton(devices);

button(baniaMainHeater);
button(baniaMediumHeater);
button(baniaTamburHeater);
button(waterPrepareHeater);
button(gmHousHeater);
button(mainRoomHeater);
button(mainRoomTamburCarpet);
button(mainRoomTamburHeater);


checkState(baniaMainHeater);
checkState(baniaMediumHeater);
checkState(baniaTamburHeater);
checkState(waterPrepareHeater);
checkState(gmHousHeater);
checkState(mainRoomHeater);
checkState(mainRoomTamburCarpet);
checkState(mainRoomTamburHeater);
