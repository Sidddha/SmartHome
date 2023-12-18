var Device = function (set_param, actual_param, device_control, button_control, histeresis, global_button, self_auto) {
    var dvc = device_control.split("/");
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
    this.device_header = dvc[0];
    this.device_control = dvc[1];
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
    global.globalLightSet,
    global.globalOutdoorLightLux,
    global.mainRoomOutdoorLightState,
    global.mainRoomOutdoorLightButton,
    global.globalIlluminanceHisteresis,
    global.globalLightButton);

var gmOutdoorLight = new Device(
    global.globalLightSet,
    global.globalOutdoorLightLux,
    global.gmHouseOutdoorLightState,
    global.gmHouseOutdoorLightButton,
    global.globalIlluminanceHisteresis,
    global.globalLightButton);

// var mainRoomHeater = new Device(mainRoomTempSet, 
//                                 mainRoomTemp, 
//                                 mainRoomHeaterState, 
//                                 mainRoomHeaterButton, 
//                                 mainRoomHeaterHeader, 
//                                 globalHeaterHisteresis,);

var mainRoomTamburCarpet = new Device(
    global.mainRoomTempSet,
    global.mainRoomTemp,
    global.mainRoomTamburCarpetState,
    global.mainRoomTamburCarpetButton,
    global.globalHeaterHisteresis,
    global.globalHeaterButton,
    global.mainRoomTamburCarpetAuto);

var mainRoomTamburHeater = new Device(
    global.mainRoomTempSet,
    global.mainRoomTemp,
    global.mainRoomTamburHeaterState,
    global.mainRoomTamburHeaterButton,
    global.globalHeaterHisteresis,
    global.globalHeaterButton);

var baniaMainHeater = new Device(
    global.baniaRestRoomTempSet,
    global.baniaRestRoomTemp,
    global.baniaMainHeaterState,
    global.baniaMainHeaterButton,
    global.globalHeaterHisteresis,
    global.globalHeaterButton);

var baniaMediumHeater = new Device(
    global.baniaRestRoomTempSet,
    global.baniaRestRoomTemp,
    global.baniaMediumHeaterState,
    global.baniaMediumHeaterButton,
    global.globalHeaterHisteresis,
    global.globalHeaterButton);

var baniaTamburHeater = new Device(
    global.baniaRestRoomTempSet,
    global.baniaRestRoomTemp,
    global.baniaTamburHeaterState,
    global.baniaTamburHeaterButton,
    global.globalHeaterHisteresis,
    global.globalHeaterButton,
    global.baniaTamburHeaterAuto);

var waterPrepareHeater = new Device(
    global.baniaWaterPrepareTempSet,
    global.baniaWaterPrepareTemp,
    global.baniaWaterPrepareHeaterState,
    global.baniaWaterPrepareHeaterButton,
    global.globalHeaterHisteresis,
    global.globalHeaterButton);

var gmHouseHeater = new Device(
    global.gmHouseTempSet,
    global.gmHouseTemp,
    global.gmHouseHeaterState,
    global.gmHouseHeaterButton,
    global.globalHeaterHisteresis,
    global.globalHeaterButton);

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
