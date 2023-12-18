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

var mainRoomTamburCarpetState = "wb-mr6c_24/K3";
var mainRoomTamburHeaterState = "wb-mr6c_24/K2";
var mainRoomHeaterState = "cmnd/tasmota_C6208D/POWER";
var mainRoomOutdoorLightState = "wb-mr6c_24/K4";

var mainRoomTemp = "wb-msw-v3_201/Temperature";
var mainRoomHum = "wb-msw-v3_201/Humidity";
var mainRoomTempSet = "main-room/HeaterControl";

var mainRoomTamburCarpetButton = "main-room/TamburCarpetButton";
var mainRoomTamburHeaterButton = "main-room/TamburHeaterButton";
var mainRoomHeaterButton = "main-room/HeaterButton";
var mainOutdoorLightButton = "main-room/OutdoorLightButton";
var mainRoomTamburCarpetAuto = "main-room/TamburCarpetAuto";

////////////////////////////////////
//***Grandmothers hous variables****/
////////////////////////////////////

var gmHouseTemp = "wb-ms_132/Temperature";
var gmHouseHum = "wb-ms_132/Humidity";
var gmHouseHeaterState = "wb-mr3_34/K1";
var gmHouseTempSet = "grandmas-house/HeaterControl";
var gmHouseHeaterButton = "grandmas-house/HeaterButton";

var gmOutdoorLightState = "wb-mr3_34/K3";
var gmOutdoorLightButton = "grandmas-house/OutdoorLightButton";

////////////////////////////////////
//*********Bania variables*********/
////////////////////////////////////

var mainHeaterState = "wb-mr6c_214/K3";
var mediumHeaterState = "wb-mr6c_214/K4";
var tamburHeaterState = "wb-mr6c_214/K5";
var waterPrepareHeaterState = "wb-mr6c_214/K6";

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
var baniaTamburHeaterAuto = "bania-widget/TamburHeaterAuto";

var restRoomTempSet = "bania-widget/MainHeaterControl";
var waterPrepareTempSet = "bania-widget/WaterPrepareHeaterControl";

/////////////////////////////////////////
/*
TODO: implement self auto!
*/
var Device = function (set_param, actual_param, device_control, button_control, histeresis, self_auto) {
    var dev = device_control.split("/");
    var but = button_control.split("/");
    var sparam = set_param.split("/");
    var aparam = actual_param.split("/");
    this.set_param = set_param;
    this.set_param_header = sparam[0];
    this.set_param_control = sparam[1];
    this.actual_param = actual_param;
    this.actual_param_header = aparam[0];
    this.actual_param_control = aparam[1];
    this.device = device_control;
    this.device_header = dev[0];
    this.device_control = dev[1];
    this.button = button_control;
    this.button_header = but[0];
    this.button_control = but[1];
    this.histeresis = histeresis;
    if(self_auto == undefined) {
        this.is_self_auto = false;
        this.self_auto_header = undefined;
        this.self_auto_header = undefined;
    } else {
        this.self_auto = self_auto;
        this.is_self_auto = true;
        var sa = self_auto.split("/");
        this.self_auto_header = sa[0];
        this.self_auto_control = sa[1];
    }
}

Device.prototype.setModeAuto = function (mode) {
    if(this.getSelfAuto()) 
        getDevice(this.button_header).getControl(this.button_control).setReadonly(false);    
    else 
        getDevice(this.button_header).getControl(this.button_control).setReadonly(mode);
    log("{} auto mode set to {}", this.button, mode);
}

Device.prototype.setDeviceValue = function (value) {
    getDevice(this.device_header).getControl(this.device_control).setValue(value);
    log("{} set to {}", this.device, value);
}
Device.prototype.setButtonValue = function (value) {
    getDevice(this.button_header).getControl(this.button_control).setValue(value);
}
Device.prototype.setSetParamValue = function (value) {
    return getDevice(this.set_param_header).getControl(this.set_param_control).setValue(value);
}
Device.prototype.getModeAuto = function () {
    return getDevice(this.button_header).getControl(this.button_control).getReadonly();
}
Device.prototype.getDeviceValue = function () {
    return getDevice(this.device_header).getControl(this.device_control).getValue();
}
Device.prototype.getActualParamValue = function () {
    return getDevice(this.actual_param_header).getControl(this.actual_param_control).getValue();
}
Device.prototype.getSetParamValue = function () {
    return getDevice(this.set_param_header).getControl(this.set_param_control).getValue();
}
Device.prototype.getActualParamControl = function () {
    return this.actual_param;
}
Device.prototype.getSetParamControl = function () {
    return this.set_param;
}
Device.prototype.getButtonControl = function () {
    return this.button;
}
Device.prototype.getButtonValue = function () {
    return getDevice(this.button_header).getControl(this.button_control).getValue();
}
Device.prototype.getDeviceControl = function () {
    return this.device_control;
}
Device.prototype.getSelfAuto = function() {
    if(this.is_self_auto)
        return getDevice(this.self_auto_header).getControl(this.self_auto_control).getValue();
    else 
        return false;
}

Device.prototype.updateState = function (funcName) {
    log("Function {}:", funcName);
    if (this.getModeAuto()) {
        if (this.getActualParamValue() > (this.getSetParamValue() + this.histeresis)) {
            this.setButtonValue(false);
            this.setDeviceValue(false);
            return;
        }
        if (this.getActualParamValue() < (this.getSetParamValue() - this.histeresis)) {
            this.setButtonValue(true);
            this.setDeviceValue(true);
            return;
        }
    } else {
        this.setDeviceValue(this.getButtonValue());
    }
}

function update_state(device) {
    defineRule({
        whenChanged: [device.getSetParamControl(), device.getActualParamControl()],
        then: function (newValue, devName, cellName) {
            if (device.getModeAuto()) {
                log("{}/{} changed:", devName, cellName);
                device.updateState("update_state");
            }
        }
    });
}

function update_mode(device, global_button) {
    defineRule({
        when: function() {
            return cron("@every 1s");
        },
        then: function () {
            log("Cron rule. {} update auto mode", device.getDeviceControl());
            if(dev[global_button]) {
                device.setModeAuto(true);            
            } else {
                device.setModeAuto(false)
            }
        }
    });
}

function button(device) {
    defineRule({
        whenChanged: device.getButtonControl(),
        then: function () {
            log("Button {} pressed:", device.getButtonControl());
            device.updateState("button");
        }
    });
}




function global_button(devices, global_button) {

    defineRule({
        whenChanged: global_button,
        then: function (newValue, devName, cellName) {
            log("{}/{} pressed:", devName, cellName);
            devices.forEach(function (device) {
                device.setModeAuto(newValue);
            });
        }
    });
}

var mainOutdoorLight = new Device(
    globalLightSet,
    outdoorLightLux,
    mainRoomOutdoorLightState,
    mainOutdoorLightButton,
    illuminanceHisteresis);

var gmOutdoorLight = new Device(
    globalLightSet,
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

var mainRoomTamburCarpet = new Device(
    mainRoomTempSet,
    mainRoomTemp,
    mainRoomTamburCarpetState,
    mainRoomTamburCarpetButton,
    heaterHisteresis,
    mainRoomTamburCarpetAuto);

var mainRoomTamburHeater = new Device(
    mainRoomTempSet,
    mainRoomTemp,
    mainRoomTamburHeaterState,
    mainRoomTamburHeaterButton,
    heaterHisteresis);

var baniaMainHeater = new Device(
    restRoomTempSet,
    restRoomTemp,
    mainHeaterState,
    mainHeaterButton,
    heaterHisteresis);

var baniaMediumHeater = new Device(
    restRoomTempSet,
    restRoomTemp,
    mediumHeaterState,
    mediumHeaterButton,
    heaterHisteresis);

var baniaTamburHeater = new Device(
    restRoomTempSet,
    restRoomTemp,
    tamburHeaterState,
    tamburHeaterButton,
    heaterHisteresis,
    baniaTamburHeaterAuto);

var waterPrepareHeater = new Device(
    waterPrepareTempSet,
    waterPrepareTemp,
    waterPrepareHeaterState,
    waterPrepareHeaterButton,
    heaterHisteresis);

var gmHouseHeater = new Device(
    gmHouseTempSet,
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
];

var lights = [
    mainOutdoorLight,
    gmOutdoorLight
];

global_button(heaters, globalHeaterButton);
global_button(lights, globalLightButton);

for(var i = 0; i < heaters.length; i++) {
    update_mode(heaters[i], globalHeaterButton);
    button(heaters[i]);
    update_state(heaters[i]);    
}

for(var i = 0; i < lights.length; i++) {
    update_mode(lights[i], globalLightButton);
    button(lights[i]);
    update_state(lights[i]);    
}
