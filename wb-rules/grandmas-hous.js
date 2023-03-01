var heaterState = new PersistentStorage("heater-states", {global: true});
var lightState = new PersistentStorage("light-states", {global: true});

heaterState["gmHousHeater"] = "OFF";
lightState["gmOutdoorLight"] = "OFF";

var heaterHisteresis = 0.5;

var gmHousTemp = "wb-ms_132/Temperature";
var gmHousHeaterOn = "wb-mr3_34/K1";
var gmHousTempSet = "grandmas-hous/HeaterControl";
var gmHousHeaterButton = "grandmas-hous/HeaterButton";
var gmHousHeaterHeader = "grandmas-hous/HeaterHeader";
var gmHousHeaterMemoryCell = heaterState["gmHousHeater"];

defineVirtualDevice('grandmas-hous', {
    title: 'GrandmasHaus' ,
    readonly: false,
    cells: {
      Temperature: {
          title: "Temperature",
	        type: "temperature",
	        value: dev["wb-ms_132/Temperature"]
	    },
      Humidity: {
          title: "Humidity",
	        type: "rel_humidity",
	        value: dev["wb-ms_132/Humidity"]
	    },
      HeaterControl: {
          type: "range",
          value: 22, 
          min:5,
          max: 30
      },
      HeaterButton: {
          type: "pushbutton",
          value: false
      },
      OutdoorLightButton: {
          type: "pushbutton",
          value: false
      },
      LightHeader: {
          title: "header",
          type: "text",
          value: lightState["gmOutdoorLight"]
      },
      HeaterHeader: {
          title: "header",
          type: "text",
          value: heaterState["gmHousHeater"]
      }   
    }
})

function buttonsLogic(device) {
  defineRule({
      when: function() {
          return dev[device.button_control];
      },
      then: function() {
          switch(device.getMode()) {
              case "AUTO":
                  device.setMode("ON");
                  device.checkState();
                  break;
              case "ON":
                  device.setMode("OFF");
                  device.checkState();
                  break;
              case "OFF":
                  device.setMode("AUTO");
                  device.checkState();
                break;
          }    
      }
  });
}

function Device(set_param, actual_param, device_control, button_control, memory_cell, header_control, histeresis) {
  this.set_param = set_param;
  this.actual_param = actual_param;
  this.device_control = device_control;
  this.button_control = button_control;
  this.memory_cell = memory_cell;
  this.header_control = header_control;
  this.histeresis = histeresis;
}

Device.prototype.setMode = function(mode) {
  this.memory_cell = mode;
  getControl(this.header_control).setValue(this.memory_cell);
}

Device.prototype.getMode = function() {
  return this.memory_cell;	
}

Device.prototype.checkState = function() {
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

var gmHousHeater = new Device(gmHousTempSet, gmHousTemp, gmHousHeaterOn, gmHousHeaterButton, gmHousHeaterMemoryCell, gmHousHeaterHeader, heaterHisteresis);

function stateCheck(device) {
  defineRule({
      whenChanged: function() {
          return dev[device.set_param] || dev[device.actual_param];
      },
      then: function() {
          device.checkState();
          log(device.memory_cell + " check");
      }
  })
}

buttonsLogic(gmHousHeater);
stateCheck(gmHousHeater);