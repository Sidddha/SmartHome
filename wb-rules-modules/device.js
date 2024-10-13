
// var DeviceModule = (function() {

    var Device = function (title, setpoint_param, actual_param, device, button, global_button, histeresis) {
        this.title = title;
        var dev = device.split("/");
        var but = button.split("/");
        var gbut = global_button.split("/");
        var sparam = setpoint_param.split("/");
        var aparam = actual_param.split("/");
        this.setpoint_param = setpoint_param;
        this.setpoint_param_header = sparam[0];
        this.setpoint_param_control = sparam[1];
        this.actual_param = actual_param;
        this.actual_param_header = aparam[0];
        this.actual_param_control = aparam[1];
        this.device = device;
        this.device_header = dev[0];
        this.device_control = dev[1];
        this.button = button;
        this.button_header = but[0];
        this.button_control = but[1];
        this.global_button = global_button;
        this.global_button_header = gbut[0];
        this.global_button_control = gbut[1];
        this.histeresis = histeresis;
        this.globalMode = false;
        this.autoMode = false;
    };
    /** Privat methods **/

    Device.prototype.setAutoMode = function(mode) {
        getDevice(this.button_header).getControl(this.button_control).setReadonly(mode);  
        log("{} auto mode set to {}", this.button, mode);
        this.autoMode = mode;
    };

    Device.prototype.getAutoMode = function() {
        return this.autoMode;
        // return getDevice(this.global_button_header).getControl(this.global_button_control).getValue();
    };

    Device.prototype.getGlobalButton = function() {
        return this.global_button;
    }

    Device.prototype.setDeviceState = function(value) {
        getDevice(this.device_header).getControl(this.device_control).setValue(value);
        log("{} set to {}", this.device, value);
    };

    Device.prototype.getDeviceState = function() {
        return getDevice(this.device_header).getControl(this.device_control).getValue();
    };

    Device.prototype.setButtonState = function(value) {
        getDevice(this.button_header).getControl(this.button_control).setValue(value);
    };
    
    Device.prototype.getButtonState = function() {
        return getDevice(this.button_header).getControl(this.button_control).getValue();
    };

    Device.prototype.getActualParamValue = function() {
        return getDevice(this.actual_param_header).getControl(this.actual_param_control).getValue();
    };

    Device.prototype.getSetpointParamValue = function() {
        return getDevice(this.setpoint_param_header).getControl(this.setpoint_param_control).getValue();
    };

    Device.prototype.getActualParamControl = function() {
        return this.actual_param;
    };

    Device.prototype.getSetpointParamControl = function() {
        return this.setpoint_param;
    };

    Device.prototype.getButtonControl = function() {
        return this.button;
    };
    
    Device.prototype.getDeviceControl = function() {
        return this.device_control;
    };
    
    Device.prototype.getDevice = function() {
        return this.device;
    };
    
    Device.prototype.updateState = function() {
        if (this.getAutoMode()) {
            if (this.getActualParamValue() > (this.getSetpointParamValue() + this.histeresis)) {
                this.setButtonState(false);
                this.setDeviceState(false);
    
                return;
            }
            if (this.getActualParamValue() < (this.getSetpointParamValue() - this.histeresis)) {
                this.setButtonState(true);
                this.setDeviceState(true);
                return;
            }
        } else {
            this.setDeviceState(this.getButtonState());
        }
    };

    /** Public functions **/

    Device.prototype.setSetpointParamValue = function (value) {
        getDevice(this.setpoint_param_header).getControl(this.setpoint_param_control).setValue(value);
    };

    Device.prototype.updateRule = function () {
        defineRule(("Update state " + this.title), {
            whenChanged: [this.getSetpointParamControl(), this.getActualParamControl()],
            then: function (newValue, devName, cellName) {
                if (this.getAutoMode()) {
                    log("{}/{} changed:", devName, cellName);
                    this.updateState();
                }
            }
        });
    };

    Device.prototype.updateMode = function () {
        defineRule(("Update mode " + this.title), {
            whenChanged: function () {
                return dev[this.getGlobalButton()];
            },
            then: function (value) {
                log("New value: {}", value);
                sthis.etAutoMode(value);
                this.updateState();
            }
        });
    };

    Device.prototype.checkButton = function () {
        defineRule(("Check button " + this.title), {
            whenChanged: function () {
                return dev[this.getButtonControl()];
            },
            then: function () {
                log("Button {} pressed:", this.getButtonControl());
                this.updateState();
            }
        });
    };

    Device.prototype.checkGlobalButton = function () {
        this.globBtnRule = defineRule(("Check global button {}", this.title), {
            whenChanged: function () {
                return dev[this.getGlobalButton()];
            },
            then: function (newValue, devName, cellName) {
                log("{}/{} pressed:", devName, cellName);
                this.setAutoMode(newValue);
                this.updateState();
            }
        });
    };

    Device.prototype.enableGlobalOperation = function () {
        enableRule(this.globBtnRule);
        this.setAutoMode(true);
    };

    Device.prototype.disableGlobalOperation = function () {
        disableRule(this.globBtnRule);
        this.setAutoMode(false);
    };

//     return {
//         Device: Device
//     };
// })();

exports.Device = Device;



