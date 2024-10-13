var Cell = function (id) {
    this.dev = id.split("/")[0];
    this.ctrl = id.split("/")[1];
};

Cell.prototype.getValue = function () {
    return getDevice(this.dev).getControl(this.ctrl).getValue();
};

Cell.prototype.setValue = function (value) {
    getDevice(this.dev).getControl(this.ctrl).setValue(value);
};

exports.Cell = Cell;