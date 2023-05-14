exports.device = function(set_param, actual_param, device_control, button_control, memory_cell, header_control, histeresis) {
    this.set_param = set_param;
    this.actual_param = actual_param;
    this.device_control = device_control;
    this.button_control = button_control;
    this.memory_cell = memory_cell;
    this.header_control = header_control;
    this.histeresis = histeresis;
  }
  
exports.setMode = function(mode) {
    this.memory_cell = mode;
    getControl(this.header_control).setValue(this.memory_cell);
    log(this.header_control);
  }
  
exports.getMode = function() {
    return this.memory_cell;	
  }

exports.getSetParam = function() {
    return this.set_param;	
  }
exports.getActualParam = function() {
    return this.actual_param;	
  }
exports.getSetParam = function() {
    return this.set_param;	
  }
exports.getButton = function() {
    return this.button_control;	
  }
  
exports.checkState = function() {
    switch(this.memory_cell) {
        case "AUTO":
            if(dev[this.actual_param] > (dev[this.set_param] + this.histeresis)) {
              dev[this.device_control] = false;
              return;
            }
            if(dev[this.actual_param] < (dev[this.set_param] - this.histeresis)) {
              dev[this.device_control] = true;
              return;
            }
            break;
        case "ON":
            dev[this.device_control] = true;
            break;
        case "OFF":
            dev[this.device_control] = false;
            break;
    }
  }
/*
exports.button = function() {
    defineRule({
        when: function() {
            return dev[module.getButton()];
        },
        then: function() {
            switch(this.memory_cell) {
                case "AUTO":
                    module.setMode("ON");
                    module.checkState();
                    break;
                case "ON":
                    module.setMode("OFF");
                    module.checkState();
                    break;
                case "OFF":
                    module.setMode("AUTO");
                    module.checkState();
                  break;
            }  
        }
    })
  }
*/