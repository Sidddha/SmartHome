////////////////////////////////////
//*********Global variables****** */
////////////////////////////////////
 
var firstStart = "start/FirstStart";

var heaterHisteresis = 0.5;

var GlobalHeaterState = new PersistentStorage("global-heater-states", {global: true});
var heaterState = new PersistentStorage("heater-states", {global: true});
var lightState = new PersistentStorage("light-states", {global: true});

GlobalHeaterState["globalHeater"] = "OFF";
lightState["global"] = "OFF";

var globalHeaterButton = "global/GlobalHeaterButton";
var globalHeaterHeader = "global/HeaderGH";
var globalHeaterMemoryCell = GlobalHeaterState["globalHeater"];

var outdoorLightLux = "wb-ms_138/Illuminance";

var illuminanceHisteresis = 2;

var globalLightButton = "global/GlobalLightButton";
var globalLightHeader = "global/GlobalLightHeader";
var globalLightSet = "global/LightControl";
var globalLightMemoryCell = lightState["global"];

////////////////////////////////////
//*********Main room variables*****/
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
var mainRoomOutdoorLightOn = "wb-mr6c_24/K4";

var mainRoomTemp = "wb-msw-v3_201/Temperature";
var mainRoomTempSet = "main-room/HeaterControl";

var mainRoomTamburCarpetButton = "main-room/TamburCarpetButton";
var mainRoomTamburHeaterButton = "main-room/TamburHeaterButton";
var mainRoomHeaterButton = "main-room/HeaterButton";
var mainOutdoorLightButton = "main-room/OutdoorLightButton";

var mainRoomTamburCarpetHeader = "main-room/TamburCarpetHeader";
var mainRoomTamburHeaterHeader = "main-room/TamburHeaterHeader";
var mainRoomHeaterHeader = "main-room/HeaterHeader";
var mainRoomOutdoorLightHeader = "main-room/OutdoorLightHeader";

var main

////////////////////////////////////
//***Grandmothers hous variables****/
////////////////////////////////////

var gmHousTemp = "wb-ms_132/Temperature";
var gmHousHeaterOn = "wb-mr3_34/K1";
var gmHousTempSet = "grandmas-hous/HeaterControl";
var gmHousHeaterButton = "grandmas-hous/HeaterButton";
var gmHousHeaterHeader = "grandmas-hous/HeaterHeader";

var gmOutdoorLightOn = "wb-mr3_34/K3";
var gmOutdoorLightButton = "grandmas-hous/OutdoorLightButton";
var gmOutdoorLightHeader = "grandmas-hous/OutdoorLightHeader";

heaterState["gmHousHeater"] = "OFF";
lightState["gmOutdoorLight"] = "OFF";

var gmHousOutdoorLightMemoryCell = lightState["gmOutdoorLight"];
var gmHousHeaterMemoryCell = heaterState["gmHousHeater"];

////////////////////////////////////
//*********Bania variables*********/
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

var Device = function(set_param, actual_param, device_control, button_control, memory_cell, header_control, histeresis, external_topic, track_mqtt) {
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
        this.track_mqtt = track_mqtt;
    }

  }
  
  Device.prototype.setMode = function(mode) {
    this.memory_cell = mode;
    getControl(this.header_control).setValue(this.memory_cell);
    debug(this.header_control);
  }
  
  Device.prototype.getMode = function() {
    return this.memory_cell;	
  }
  Device.prototype.getValue = function() {
    switch(this.external_topic) {
        case false: 
            return dev[this.device_control];
        case true:
            trackMqtt(this.track_mqtt, function(message){
                return message.value;
              });
              break;
    }
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

        case true:
            switch(this.memory_cell) {
                case "AUTO":
                    if(dev[this.actual_param] > (dev[this.set_param] + this.histeresis)) {
                        publish(this.device_control, "false");
                        debug("publish to: " + this.device_control);
                        debug(this.header_control + " set to " + false);
                        return;
                    }
                    if(dev[this.actual_param] < (dev[this.set_param] - this.histeresis)) {
                        publish(this.device_control, "true");
                        debug("publish to: " + this.device_control);
                        debug(this.header_control + " set to " + true);
                        return;
                    }
                    break;
                case "ON":
                    publish(this.device_control, "true");
                    debug("publish to: " + this.device_control);
                    debug(this.header_control + " set to " + true);
                    break;
                case "OFF":
                    publish(this.device_control, "false");
                    debug("publish to: " + this.device_control);
                    debug(this.header_control + " set to " + false);
                    break;
                default:
                    publish(this.device_control, "false");
                    debug("publish to: " + this.device_control);
                    debug(this.header_control + " set to " + false);
                    break;           
            }
                break;
            default:
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
    }

  }

function check_state(device) {
        defineRule({
            whenChanged: function() {
                // log("function: check_state. Device: {},device mode: {}, device state: {}, set value {}, actual value {}", device.device_control, device.memory_cell, device.getValue(), dev[device.set_param], dev[device.actual_param]);
                return dev[device.set_param, device.actual_param];
            },
            then: function() {
                device.checkState();
                //log("Device {} set to {}", device.header_control, device.getValue());
            }
        })  
    }


function button(device) {
    defineRule({
        when: function() {
            return dev[device.button_control];
        },
        then: function() {
            restrict = readConfig("/etc/wb-rules-pre-start/on-start-restrict.json");
            if(restrict.restrict_buttons) {
                log("button {} restricted", device.button_control);
                return;
            } else {
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
            log("function: button. Device: {}, device state: {}", device.header_control, device.getValue());
            }  
        }
    })
}
    



function global_button(devices, global_button, global_memory_cell, global_header) {

    defineRule({
        when: function() {
        return dev[global_button];
        },
        then: function() {
            restrict = readConfig("/etc/wb-rules-pre-start/on-start-restrict.json");
            if(restrict.restrict_buttons) {
                log("function: global_button restricted")
                return;
            } else {            
                switch(global_memory_cell) {
                    case "AUTO":    
                        global_memory_cell = "ON";
                        getControl(global_header).setValue(global_memory_cell);
                        break;
                    case "ON":
                        global_memory_cell = "OFF";
                        getControl(global_header).setValue(global_memory_cell);
                        break;
                    case "OFF":
                        global_memory_cell = "AUTO";
                        getControl(global_header).setValue(global_memory_cell);
                        break;
                    default:
                        global_memory_cell = "OFF";
                        getControl(global_header).setValue(global_memory_cell);
                        break;

                };

                for( i = 0; i < devices.length; ++i) {
                    device = devices[i];
                    device.setMode(global_memory_cell);
                    device.checkState();
                    debug(i + " " + device.getButton())
                    log("function: global_button. Device: {}, device state: {}", device.header_control, device.getValue());

                }
            }
        }
    })
}

var mainOutdoorLight = new Device(globalLightSet, outdoorLightLux, mainRoomOutdoorLightOn, mainOutdoorLightButton, mainRoomOutdoorLightMemoryCell, mainRoomOutdoorLightHeader, illuminanceHisteresis);
var gmOutdoorLight = new Device(globalLightSet, outdoorLightLux, gmOutdoorLightOn, gmOutdoorLightButton, gmHousOutdoorLightMemoryCell, gmOutdoorLightHeader, illuminanceHisteresis);

var mainRoomHeater = new Device(mainRoomTempSet, mainRoomTemp, mainRoomHeaterOn, mainRoomHeaterButton, mainRoomHeaterMemoryCell, mainRoomHeaterHeader, heaterHisteresis, true, "stat/tasmota_C6208D/POWER");
var mainRoomTamburCarpet = new Device(mainRoomTempSet, mainRoomTemp, mainRoomTamburCarpetOn, mainRoomTamburCarpetButton, mainRoomTamburCarpetMemoryCell, mainRoomTamburCarpetHeader, heaterHisteresis);
var mainRoomTamburHeater = new Device(mainRoomTempSet, mainRoomTemp, mainRoomTamburHeaterOn, mainRoomTamburHeaterButton, mainRoomTamburHeaterMemoryCell, mainRoomTamburHeaterHeader, heaterHisteresis);
var baniaMainHeater = new Device(restRoomTempSet, restRoomTemp, mainHeaterOn, mainHeaterButton, mainHeaterMemoryCell, mainHeaterHeader, heaterHisteresis);
var baniaMediumHeater = new Device(restRoomTempSet, restRoomTemp, mediumHeaterOn, mediumHeaterButton, mediumHeaterMemoryCell, mediumHeaterHeader, heaterHisteresis);
var baniaTamburHeater = new Device(restRoomTempSet, restRoomTemp, tamburHeaterOn, tamburHeaterButton, tamburHeaterMemoryCell, tamburHeaterHeader, heaterHisteresis);
var waterPrepareHeater = new Device(waterPrepareTempSet, waterPrepareTemp, waterPrepareHeaterOn, waterPrepareHeaterButton, waterPrepareMemoryCell, waterPrepareHeaterHeader, heaterHisteresis);
var gmHousHeater = new Device(gmHousTempSet, gmHousTemp, gmHousHeaterOn, gmHousHeaterButton, gmHousHeaterMemoryCell, gmHousHeaterHeader, heaterHisteresis);

var heaters = [
    baniaMainHeater,
    baniaMediumHeater,
    baniaTamburHeater,
    waterPrepareHeater,
    gmHousHeater,
    mainRoomHeater,
    mainRoomTamburCarpet,
    mainRoomTamburHeater
]

var lights = [
    mainOutdoorLight,
    gmOutdoorLight
]

global_button(heaters, globalHeaterButton, globalHeaterMemoryCell, globalHeaterHeader);
global_button(lights, globalLightButton, globalLightMemoryCell, globalLightHeader);

button(baniaMainHeater);
button(baniaMediumHeater);
button(baniaTamburHeater);
button(waterPrepareHeater);
button(gmHousHeater);
button(mainRoomHeater);
button(mainRoomTamburCarpet);
button(mainRoomTamburHeater);

button(mainOutdoorLight);
button(gmOutdoorLight);


check_state(baniaMainHeater);
check_state(baniaMediumHeater);
check_state(baniaTamburHeater);
check_state(waterPrepareHeater);
check_state(gmHousHeater);
check_state(mainRoomHeater);
check_state(mainRoomTamburCarpet);
check_state(mainRoomTamburHeater);

check_state(mainOutdoorLight);
check_state(gmOutdoorLight);