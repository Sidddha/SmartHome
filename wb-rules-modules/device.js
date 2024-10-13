
var DeviceModule = (function() {

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

    function setAutoMode(mode) {
        getDevice(this.button_header).getControl(this.button_control).setReadonly(mode);  
        log("{} auto mode set to {}", this.button, mode);
        this.autoMode = mode;
    };

    function getAutoMode() {
        return this.autoMode;
        // return getDevice(this.global_button_header).getControl(this.global_button_control).getValue();
    };

    function getGlobalButton() {
        return this.global_button;
    }

    function setDeviceState(value) {
        getDevice(this.device_header).getControl(this.device_control).setValue(value);
        log("{} set to {}", this.device, value);
    };

    function getDeviceState() {
        return getDevice(this.device_header).getControl(this.device_control).getValue();
    };

    function setButtonState(value) {
        getDevice(this.button_header).getControl(this.button_control).setValue(value);
    };
    
    function getButtonState() {
        return getDevice(this.button_header).getControl(this.button_control).getValue();
    };

    function getActualParamValue() {
        return getDevice(this.actual_param_header).getControl(this.actual_param_control).getValue();
    };

    function getSetpointParamValue() {
        return getDevice(this.setpoint_param_header).getControl(this.setpoint_param_control).getValue();
    };

    function getActualParamControl() {
        return this.actual_param;
    };

    function getSetpointParamControl() {
        return this.setpoint_param;
    };

    function getButtonControl() {
        return this.button;
    };
    
    function getDeviceControl() {
        return this.device_control;
    };
    
    function getDevice() {
        return this.device;
    };
    
    function updateState() {
        if (getAutoMode()) {
            if (getActualParamValue() > (getSetpointParamValue() + this.histeresis)) {
                setButtonState(false);
                setDeviceState(false);
    
                return;
            }
            if (getActualParamValue() < (getSetpointParamValue() - this.histeresis)) {
                setButtonState(true);
                setDeviceState(true);
                return;
            }
        } else {
            setDeviceState(getButtonState());
        }
    };

    /** Public functions **/

    Device.prototype.setSetpointParamValue = function (value) {
        getDevice(this.setpoint_param_header).getControl(this.setpoint_param_control).setValue(value);
    };

    Device.prototype.updateRule = function () {
        defineRule(("Update state {}", this.title), {
            whenChanged: [getSetpointParamControl(), getActualParamControl()],
            then: function (newValue, devName, cellName) {
                if (getAutoMode()) {
                    log("{}/{} changed:", devName, cellName);
                    updateState();
                }
            }
        });
    };

    Device.prototype.updateMode = function () {
        defineRule(("Update mode {}", this.title), {
            whenChanged: function () {
                return dev[getGlobalButton()];
            },
            then: function (value) {
                log("New value: {}", value);
                setAutoMode(value);
                updateState();
            }
        });
    };

    Device.prototype.checkButton = function () {
        defineRule(("Check button {}", this.title), {
            whenChanged: function () {
                return dev[getButtonControl()];
            },
            then: function () {
                log("Button {} pressed:", getButtonControl());
                updateState();
            }
        });
    };

    Device.prototype.checkGlobalButton = function () {
        this.globBtnRule = defineRule(("Check global button {}", this.title), {
            whenChanged: function () {
                return dev[getGlobalButton()];
            },
            then: function (newValue, devName, cellName) {
                log("{}/{} pressed:", devName, cellName);
                setAutoMode(newValue);
                updateState();
            }
        });
    };

    Device.prototype.enableGlobalOperation = function () {
        enableRule(this.globBtnRule);
        setAutoMode(true);
    };

    Device.prototype.disableGlobalOperation = function () {
        disableRule(this.globBtnRule);
        setAutoMode(false);
    };

    return {
        Device: Device
    };
})();

exports.Device = DeviceModule.Device;



