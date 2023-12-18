import { global } from "./constants";
import { mainRoom } from "./constants";
import { bania } from "./constants";
import { gmHouse } from "./constants";

var Device = function (set_param, actual_param, device_control, button_control, histeresis, global_button, self_auto) {
    var dev = device_control.split("/");
    var but = button_control.split("/");
    var sparam = set_param.split("/");
    var aparam = actual_param.split("/");
    var globbut = global_button.split("/");
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
    this.global_button = global_button;
    this.global_button_header = globbut[0];
    this.global_button_control = globbut[1];
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
Device.prototype.getSelfAutoValue = function() {
    if(this.is_self_auto)
        return getDevice(this.self_auto_header).getControl(this.self_auto_control).getValue();
    else 
        return false;
}
Device.prototype.getGlobalButtonValue = function() {
    return getDevice(this.global_button_header).getControl(this.global_button_control).getValue();
}
Device.prototype.updateState = function () {
    if (this.getModeAuto()) {
        defineRule({
            whenChanged: [this.getSetParamControl(), this.getActualParamControl(), this.global_button, this.self_auto],
            then: function (newValue, devName, cellName) {
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
            }
        });
    } else {
        defineRule({
            whenChanged: this.getButtonControl(),
            then: function (newValue) {
                this.setDeviceValue(newValue);
            }
        })
    }
}
Device.prototype.updateMode = function() {
    defineRule({
        when: function() {
            return cron("@every 1s");
        },
        then: function () {
            if(this.getModeAuto()) {
                this.setModeAuto(true);            
            } else {
                this.setModeAuto(false)
            }
        }
    });
}
Device.prototype.button = function() {
    defineRule({
        whenChanged: this.getButtonControl(),
        then: function () {
            log("Button {} pressed:", this.getButtonControl());
            this.updateState();
        }
    });
}
Device.prototype.globalButton = function() {
    defineRule({
        whenChanged: this.global_button,
        then: function (newValue, devName, cellName) {
            log("{}/{} pressed:", devName, cellName);
            this.setModeAuto(newValue);
        }
    });
}

var mainOutdoorLight = new Device(
    global.LightSet,
    global.OutdoorLightLux,
    mainRoom.OutdoorLightState,
    mainRoom.OutdoorLightButton,
    global.IlluminanceHisteresis,
    global.LightButton);

var gmOutdoorLight = new Device(
    global.LightSet,
    global.OutdoorLightLux,
    gmHouse.OutdoorLightState,
    gmHouse.OutdoorLightButton,
    global.IlluminanceHisteresis,
    global.LightButton);

// var mainRoomHeater = new Device(mainRoomTempSet, 
//                                 mainRoomTemp, 
//                                 mainRoomHeaterState, 
//                                 mainRoomHeaterButton, 
//                                 mainRoomHeaterHeader, 
//                                 global.HeaterHisteresis,);

var mainRoomTamburCarpet = new Device(
    mainRoom.TempSet,
    mainRoom.Temp,
    mainRoom.TamburCarpetState,
    mainRoom.TamburCarpetButton,
    global.HeaterHisteresis,
    global.HeaterButton,
    mainRoom.TamburCarpetAuto);

var mainRoomTamburHeater = new Device(
    mainRoom.TempSet,
    mainRoom.Temp,
    mainRoom.TamburHeaterState,
    mainRoom.TamburHeaterButton,
    global.HeaterHisteresis,
    global.HeaterButton);

var baniaMainHeater = new Device(
    bania.restRoomTempSet,
    bania.restRoomTemp,
    bania.mainHeaterState,
    bania.mainHeaterButton,
    global.HeaterHisteresis,
    global.HeaterButton);

var baniaMediumHeater = new Device(
    bania.restRoomTempSet,
    bania.restRoomTemp,
    bania.mediumHeaterState,
    bania.mediumHeaterButton,
    global.HeaterHisteresis,
    global.HeaterButton);

var baniaTamburHeater = new Device(
    bania.restRoomTempSet,
    bania.restRoomTemp,
    bania.tamburHeaterState,
    bania.tamburHeaterButton,
    global.HeaterHisteresis,
    global.HeaterButton,
    bania.TamburHeaterAuto);

var waterPrepareHeater = new Device(
    bania.waterPrepareTempSet,
    bania.waterPrepareTemp,
    bania.waterPrepareHeaterState,
    bania.waterPrepareHeaterButton,
    global.HeaterHisteresis,
    global.HeaterButton);

var gmHouseHeater = new Device(
    gmHouse.TempSet,
    gmHouse.Temp,
    gmHouse.HeaterState,
    gmHouse.HeaterButton,
    global.HeaterHisteresis,
    global.HeaterButton);

var heaters = [
    baniaMainHeater,
    baniaMediumHeater,
    baniaTamburHeater,
    waterPrepareHeater,
    gmHouseHeater,
    // mainRoom.Heater,
    mainRoomTamburCarpet,
    mainRoomTamburHeater
];

var lights = [
    mainOutdoorLight,
    gmOutdoorLight
];

for(var i = 0; i < heaters.length; i++) {
    heaters[i].updateMode();
    heaters[i].updateState();
    heaters[i].button();
    heaters[i].globalButton();   
}

for(var i = 0; i < lights.length; i++) {
    lights[i].updateMode();
    lights[i].updateState();
    lights[i].button();
    lights[i].globalButton();   
}
