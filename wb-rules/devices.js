////////////////////////////////////
//*********Global variables****** */
////////////////////////////////////

var heaterHisteresis = 0.5;

var globalHeaterButton = "global/GlobalHeaterButton";
var globalHeaterHeader = "global/HeaderGH";

var outdoorLightLux = "wb-ms_138/Illuminance";

var illuminanceHisteresis = 2;

var globalLightButton = "global/GlobalLightButton";
var globalLightHeader = "global/GlobalLightHeader";
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

var mainRoomTamburCarpetHeader = "main-room/TamburCarpetHeader";
var mainRoomTamburHeaterHeader = "main-room/TamburHeaterHeader";
var mainRoomHeaterHeader = "main-room/HeaterHeader";
var mainRoomOutdoorLightHeader = "main-room/OutdoorLightHeader";

////////////////////////////////////
//***Grandmothers hous variables****/
////////////////////////////////////

var gmHouseTemp = "wb-ms_132/Temperature";
var gmHouseHum = "wb-ms_132/Humidity";
var gmHouseHeaterState = "wb-mr3_34/K1";
var gmHouseTempSet = "grandmas-hous/HeaterControl";
var gmHouseHeaterButton = "grandmas-hous/HeaterButton";
var gmHouseHeaterHeader = "grandmas-hous/HeaterHeader";

var gmOutdoorLightState= "wb-mr3_34/K3";
var gmOutdoorLightButton = "grandmas-hous/OutdoorLightButton";
var gmOutdoorLightHeader = "grandmas-hous/OutdoorLightHeader";

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

var mainHeaterHeader = "bania-widget/MainHeaterHeader";
var mediumHeaterHeader = "bania-widget/MediumHeaterHeader";
var tamburHeaterHeader = "bania-widget/TamburHeaterHeader";
var waterPrepareHeaterHeader = "bania-widget/WaterPrepareHeaterHeader";

var restRoomTempSet = "bania-widget/MainHeaterControl";
var waterPrepareTempSet = "bania-widget/WaterPrepareHeaterControl";

/////////////////////////////////////////

var Device = function(set_param, actual_param, device_control, button_control, header_control, histeresis) {
    this.set_param = set_param;
    this.actual_param = actual_param;
    this.device_control = device_control;
    this.button_control = button_control;
    this.header_control = header_control;
    this.histeresis = histeresis;
  }
  
  Device.prototype.setModeAuto = function(mode) {
    getControl(this.header_control).setReadonly(mode);
    debug(this.header_control);
  }
  
  Device.prototype.getModeAuto = function() {
    return getControl(this.header_control).getReadonly();
  }
  Device.prototype.setValue = function(value) {
    getControl(this.header_control).setValue(value);
  }
  Device.prototype.getValue = function() {
    return getControl(this.header_control).getValue();
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
    if(this.getModeAuto()) {
        if(getControl(this.actual_param).getValue() > (getControl(this.set_param).getValue() + this.histeresis)) {
          getControl(this.device_control).setValue(false);
          debug(this.header_control + " set to " + false);
          return;
        }
        if(getControl(this.actual_param).getValue() < (getControl(this.set_param).getValue() - this.histeresis)) {
            getControl(this.device_control).setValue(true);
            debug(this.header_control + " set to " + true);
            return;
        }
    } else {
        switch(getControl(this.button_control)) {
            case true:
                getControl(this.device_control).setValue(true);
                debug(this.header_control + " set to " + true);
                break;
            case false:
                getControl(this.device_control).setValue(false);
                debug(this.header_control + " set to " + false);
                break;
            default:
                getControl(this.device_control).setValue(false);
                debug(this.header_control + " set to " + false);
                break;          
        }
    }
  }

function check_state(device) {
        defineRule({
            whenChanged: [device.set_param, device.actual_param],
            then: function() {
                device.checkState();
                debug("Device {} set to {}", device.header_control, device.getValue());
            }
        })  
    }


function button(device) {
    defineRule({
        when: function() {
            return dev[device.getButton()];
        },
        then: function(newValue) {

            switch(newValue) {
                case true:
                    device.setValue(true);
                    device.checkState();
                    break;
                case false:
                    device.setValue(false);
                    device.checkState();
                    break;
                default:
                    device.setValue(false);
                    device.checkState();
                    break;   
            }  
            debug("function: button. Device: {}, device state: {}", device.header_control, device.getValue());
            }  
        }
    )
}
    



function global_button(devices, global_button) {

    defineRule({
        when: function() {
        return dev[global_button];
        },
        then: function(newValue) {
          
            if(newValue) {
                for(device in devices) {
                    device.setModeAuto(true);
                    debug("function: global_button. Device: {}, device state: {}", device.header_control, device.getValue());
                }
            } else {
                for(device in devices) {
                    device.setModeAuto(false);
                    debug("function: global_button. Device: {}, device state: {}", device.header_control, device.getValue());

                }
            }
            for(device in devices) {
                device.checkState();
            }
        }
    })
}

var mainOutdoorLight = new Device(globalLightSet, 
                                  outdoorLightLux, 
                                  mainRoomOutdoorLightState, 
                                  mainOutdoorLightButton, 
                                  mainRoomOutdoorLightHeader, 
                                  illuminanceHisteresis);

var gmOutdoorLight = new Device(globalLightSet, 
                                outdoorLightLux, 
                                gmOutdoorLightState, 
                                gmOutdoorLightButton, 
                                gmOutdoorLightHeader, 
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
                                      mainRoomTamburCarpetHeader, 
                                      heaterHisteresis);

var mainRoomTamburHeater = new Device(mainRoomTempSet, 
                                      mainRoomTemp, 
                                      mainRoomTamburHeaterState, 
                                      mainRoomTamburHeaterButton, 
                                      mainRoomTamburHeaterHeader, 
                                      heaterHisteresis);

var baniaMainHeater = new Device(restRoomTempSet, 
                                 restRoomTemp, 
                                 mainHeaterState, 
                                 mainHeaterButton, 
                                 mainHeaterHeader, 
                                 heaterHisteresis);

var baniaMediumHeater = new Device(restRoomTempSet, 
                                   restRoomTemp, 
                                   mediumHeaterState, 
                                   mediumHeaterButton, 
                                   mediumHeaterHeader, 
                                   heaterHisteresis);

var baniaTamburHeater = new Device(restRoomTempSet, 
                                   restRoomTemp, 
                                   tamburHeaterState, 
                                   tamburHeaterButton, 
                                   tamburHeaterHeader, 
                                   heaterHisteresis);

var waterPrepareHeater = new Device(waterPrepareTempSet, 
                                    waterPrepareTemp, 
                                    waterPrepareHeaterState, 
                                    waterPrepareHeaterButton, 
                                    waterPrepareHeaterHeader, 
                                    heaterHisteresis);
                                    
var gmHouseHeater = new Device(gmHouseTempSet, 
                              gmHouseTemp, 
                              gmHouseHeaterState, 
                              gmHouseHeaterButton, 
                              gmHouseHeaterHeader, 
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

for(device in heaters) {
    button(device);
    check_state(device);
}

for(device in lights) {
    button(device);
    check_state(device);    
}
