////////////////////////////////////
//*********Global variables****** */
////////////////////////////////////

var heaterHisteresis = 0.5;

var globalHeaterButton = "global/GlobalHeaterButton";
var outdoorLightLux = "wb-ms_138/Illuminance";

var illuminanceHisteresis = 2;

var globalLightButton = "global/GlobalLightButton";
var globalLightSet = "global/LightControl";

////////////////////////////////////
//*********Main room variables*****/
////////////////////////////////////

var mainRoomTamburCarpetState= "wb-mr6c_24/K3";
var mainRoomTamburHeaterState= "wb-mr6c_24/K2";
var mainRoomHeaterState= "cmnd/tasmota_C6208D/POWER";
var mainRoomOutdoorLightState= "wb-mr6c_24/K4";

var mainRoomTemp = "wb-msw-v3_201/Temperature";
var mainRoomHum = "wb-msw-v3_201/Humidity";
var mainRoomTempSet = "main-room/HeaterControl";

var mainRoomTamburCarpetButton = "main-room/TamburCarpetButton";
var mainRoomTamburHeaterButton = "main-room/TamburHeaterButton";
var mainRoomHeaterButton = "main-room/HeaterButton";
var mainOutdoorLightButton = "main-room/OutdoorLightButton";

////////////////////////////////////
//***Grandmothers hous variables****/
////////////////////////////////////

var gmHouseTemp = "wb-ms_132/Temperature";
var gmHouseHum = "wb-ms_132/Humidity";
var gmHouseHeaterState = "wb-mr3_34/K1";
var gmHouseTempSet = "grandmas-house/HeaterControl";
var gmHouseHeaterButton = "grandmas-house/HeaterButton";

var gmOutdoorLightState= "wb-mr3_34/K3";
var gmOutdoorLightButton = "grandmas-house/OutdoorLightButton";

////////////////////////////////////
//*********Bania variables*********/
////////////////////////////////////

var mainHeaterState= "wb-mr6c_214/K3";
var mediumHeaterState= "wb-mr6c_214/K4";
var tamburHeaterState= "wb-mr6c_214/K5";
var waterPrepareHeaterState= "wb-mr6c_214/K6";

var restRoomTemp = "wb-msw-v3_49/Temperature";
var restRoomHum = "wb-msw-v3_49/Humidity";
var waterPrepareTemp = "wb-ms_187/Temperature";
var waterPrepareHum = "wb-ms_187/Humidity";
var tempBarrel1 = "wb-ms_187/External Sensor 1";
var tempBarrel2 = "wb-ms_187/External Sensor 2"
var underfloorTemperature = "wb-ms_239/Temperature";
var underfloorHumidity = "wb-ms_239/Humidity";

var mainHeaterButton = "bania-widget/MainHeaterButton";
var mediumHeaterButton = "bania-widget/MediumHeaterButton";
var tamburHeaterButton = "bania-widget/TamburHeaterButton";
var waterPrepareHeaterButton = "bania-widget/WaterPrepareHeaterButton";

var restRoomTempSet = "bania-widget/MainHeaterControl";
var waterPrepareTempSet = "bania-widget/WaterPrepareHeaterControl";

/////////////////////////////////////////

var Device = function(set_param, actual_param, device_control, button_control, histeresis) {
    var dev = device_control.split("/");
    var but = button_control.split("/");
    this.set_param = set_param;
    this.actual_param = actual_param;
    this.device_control = device_control;
    this.device = dev[0];
    this.control = dev[1];
    this.button = button_control;
    this.button_header = but[0];
    this.button_control = but[1];
    this.histeresis = histeresis;
  }
  
  Device.prototype.setModeAuto = function(mode) {
    getDevice(this.button_header).getControl(this.button_control).setReadonly(mode);
    log("{} auto mode set to {}", this.button, mode);
  }
  
  Device.prototype.getModeAuto = function() {
    return getDevice(this.button_header).getControl(this.button_control).getReadonly();
  }
  Device.prototype.setValue = function(value) {
    getDevice(this.device).getControl(this.control).setValue(value);
    log("{} set to {}", this.device_control, value);
  }
  Device.prototype.getValue = function() {
    return getDevice(this.device).getControl(this.control).getValue();
  }
  Device.prototype.getActualParam = function() {
    return this.actual_param;	
  }
  Device.prototype.getSetParam = function() {
    return this.set_param;	
  }
  Device.prototype.getButtonControl = function() {
    return this.button;	
  }
  Device.prototype.getDeviceControl = function() {
    return this.device_control;
  }
  
  Device.prototype.updateState = function(newValue) {
    if(this.getModeAuto()) {
        if(getDevice(this.device).getControl(this.actual_param).getValue() > (getDevice(this.device).getControl(this.set_param).getValue() + this.histeresis)) {
            getDevice(this.button_header).getControl(this.button_control).setValue(false);
            getDevice(this.device).getControl(this.control).setValue(false);
           return;
        }
        if(getDevice(this.device).getControl(this.actual_param).getValue() < (getDevice(this.device).getControl(this.set_param).getValue() - this.histeresis)) {
            getDevice(this.button_header).getControl(this.button_control).setValue(true);
            getDevice(this.device).getControl(this.control).setValue(true);
            return;
        }
    } else {
        switch(newValue) {
            case true:
                getDevice(this.device).getControl(this.control).setValue(true);
                break;
            case false:
                getDevice(this.device).getControl(this.control).setValue(false);
                break;
            default:
                getDevice(this.device).getControl(this.control).setValue(false);
                break;          
        }
    }
  }

function check_state(device) {
        defineRule({
            whenChanged: [device.getSetParam(), device.getActualParam()],
            then: function(newValue, devName, cellName) {
                if(device.getModeAuto()){
                    var newValue = dev[device.getButtonControl()];
                    device.updateState(newValue);
                    log("{}/{} changed. Device {} set to {}. Auto mode {}", devName, cellName, device.getDeviceControl(), newValue, device.getModeAuto());
                }
            }
        })  
    }


function button(device) {
    defineRule({
        whenChanged: device.getButtonControl(),
        then: function(newValue) {
            log("Button {} pressed. Device {} set to {}", device.getButtonControl(), device.getDeviceControl(), newValue);
            switch(newValue) {
                case true:
                    device.updateState(newValue);
                    break;
                case false:
                    device.updateState(newValue);
                    break;
                default:
                    device.updateState(newValue);
                    break;   
            }  
        }  
    })
}
    



function global_button(devices, global_button) {

    defineRule({
        whenChanged: global_button,
        then: function(newValue) {
            devices.forEach(function (device) {
                device.setModeAuto(newValue);
            });
        }
    })
}

var mainOutdoorLight = new Device(globalLightSet, 
                                  outdoorLightLux, 
                                  mainRoomOutdoorLightState, 
                                  mainOutdoorLightButton, 
                                  illuminanceHisteresis);

var gmOutdoorLight = new Device(globalLightSet, 
                                outdoorLightLux, 
                                gmOutdoorLightState, 
                                gmOutdoorLightButton, 
                                illuminanceHisteresis);

// var mainRoomHeater = new Device(mainRoomTempSet, 
//                                 mainRoomTemp, 
//                                 mainRoomHeaterState, 
//                                 mainRoomHeaterButton, 
//                                 mainRoomHeaterHeader, 
//                                 heaterHisteresis,);

var mainRoomTamburCarpet = new Device(mainRoomTempSet, 
                                      mainRoomTemp, 
                                      mainRoomTamburCarpetState, 
                                      mainRoomTamburCarpetButton, 
                                      heaterHisteresis);

var mainRoomTamburHeater = new Device(mainRoomTempSet, 
                                      mainRoomTemp, 
                                      mainRoomTamburHeaterState, 
                                      mainRoomTamburHeaterButton, 
                                      heaterHisteresis);

var baniaMainHeater = new Device(restRoomTempSet, 
                                 restRoomTemp, 
                                 mainHeaterState, 
                                 mainHeaterButton, 
                                 heaterHisteresis);

var baniaMediumHeater = new Device(restRoomTempSet, 
                                   restRoomTemp, 
                                   mediumHeaterState, 
                                   mediumHeaterButton, 
                                   heaterHisteresis);

var baniaTamburHeater = new Device(restRoomTempSet, 
                                   restRoomTemp, 
                                   tamburHeaterState, 
                                   tamburHeaterButton, 
                                   heaterHisteresis);

var waterPrepareHeater = new Device(waterPrepareTempSet, 
                                    waterPrepareTemp, 
                                    waterPrepareHeaterState, 
                                    waterPrepareHeaterButton, 
                                    heaterHisteresis);
                                    
var gmHouseHeater = new Device(gmHouseTempSet, 
                              gmHouseTemp, 
                              gmHouseHeaterState, 
                              gmHouseHeaterButton, 
                              heaterHisteresis);

var heaters = [
    baniaMainHeater,
    baniaMediumHeater,
    baniaTamburHeater,
    waterPrepareHeater,
    gmHouseHeater,
    // mainRoomHeater,
    mainRoomTamburCarpet,
    mainRoomTamburHeater
]

var lights = [
    mainOutdoorLight,
    gmOutdoorLight
]

global_button(heaters, globalHeaterButton);
global_button(lights, globalLightButton);

heaters.forEach(function (device) {
    button(device);
    check_state(device);
    
});

lights.forEach(function (device) {
    button(device);
    check_state(device);
    
});
