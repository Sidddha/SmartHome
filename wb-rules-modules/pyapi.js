var Control = function (id) {
    this.dev = id.split("/")[0];
    this.ctrl = id.split("/")[1];
};

Control.prototype.getValue = function () {
    return getDevice(this.dev).getControl(this.ctrl).getValue();
};

Control.prototype.setValue = function (value) {
    getDevice(this.dev).getControl(this.ctrl).setValue(value);
};

exports.Control = Control;