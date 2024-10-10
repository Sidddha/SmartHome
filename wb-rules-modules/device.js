
exports.Device = function (set_param, actual_param, device_control, button_control, histeresis) {
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
}

exports.setModeAuto = function (mode) {
    getDevice(this.button_header).getControl(this.button_control).setReadonly(mode);
    log("{} auto mode set to {}", this.button, mode);
}

exports.setDeviceValue = function (value) {
    getDevice(this.device_header).getControl(this.device_control).setValue(value);
    log("{} set to {}", this.device, value);
}

exports.setButtonValue = function (value) {
    getDevice(this.button_header).getControl(this.button_control).setValue(value);
}

exports.getModeAuto = function () {
    return getDevice(this.button_header).getControl(this.button_control).getReadonly();
}

exports.getDeviceValue = function () {
    return getDevice(this.device_header).getControl(this.device_control).getValue();
}

exports.getActualParamValue = function () {
    return getDevice(this.actual_param_header).getControl(this.actual_param_control).getValue();
}

exports.getSetParamValue = function () {
    return getDevice(this.set_param_header).getControl(this.set_param_control).getValue();
}

exports.getActualParamControl = function () {
    return this.actual_param;
}

exports.getSetParamControl = function () {
    return this.set_param;
}

exports.getButtonControl = function () {
    return this.button;
}

exports.getButtonValue = function () {
    return getDevice(this.button_header).getControl(this.button_control).getValue();
}

exports.getDeviceControl = function () {
    return this.device_control;
}

exports.updateState = function (funcName) {
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
        whenChanged: function () {
            return dev[global_button];
        },
        then: function (value) {
            log("update_mode: device: {}, value: {}", device.getDeviceControl(), value);
            device.setModeAuto(value);
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

// function global_button(devices, global_button) {

//     defineRule({
//         whenChanged: global_button,
//         then: function (newValue, devName, cellName) {
//             log("{}/{} pressed:", devName, cellName);
//             devices.forEach(function (device) {
//                 device.setModeAuto(newValue);
//             });
//         }
//     });
// }