var GlobalHeaterState = new PersistentStorage("global-heater-states", {global: true});

GlobalHeaterState["globalHeater"] = "OFF";

var heaterState = new PersistentStorage("heater-states", {global: true});
var lightState = new PersistentStorage("light-states", {global: true});

lightState["gmOutdoorLight"] = "OFF";

////////////////////////////////////


var globalHeaterButton = "global-heater/GlobalHeaterButton";
var globalHeaterHeader = "global-heater/HeaderGH";

var heaterHisteresis = 0.5;


////////////////////////////////////

heaterState["baniaMediumHeater"];
heaterState["baniaTamburHeater"];
heaterState["baniaMainHeater"];
heaterState["baniaWaterPrepareHeater"];

var mainHeaterMemoryCell = heaterState["baniaMainHeater"];
var mediumHeaterMemoryCell = heaterState["baniaMediumHeater"];
var tamburHeaterMemoryCell = heaterState["baniaTamburHeater"];
var waterPrepareMemoryCell = heaterState["baniaWaterPrepareHeater"];

var mainHeaterOn = "wb-mr6c_214/K3";
var mediumHeaterOn = "wb-mr6c_214/K4";
var tamburHeaterOn = "wb-mr6c_214/K5";
var waterPrepareHeaterOn = "wb-mr6c_214/K6";

var restRoomTemp = "wb-msw-v3_49/Temperature";
var waterPrepareTemp = "wb-ms_187/Temperature";

var mainHeaterButton = "rest-room/MainHeaterButton";
var mediumHeaterButton = "rest-room/MediumHeaterButton";
var tamburHeaterButton = "rest-room/TamburHeaterButton";
var waterPrepareHeaterButton = "rest-room/WaterPrepareHeaterButton";

var mainHeaterHeader = "rest-room/MainHeaterHeader";
var mediumHeaterHeader = "rest-room/MediumHeaterHeader";
var tamburHeaterHeader = "rest-room/TamburHeaterHeader";
var waterPrepareHeaterHeader = "rest-room/WaterPrepareHeaterHeader";

var restRoomTempSet = "rest-room/MainHeaterControl";
var waterPrepareTempSet = "rest-room/WaterPrepareHeaterControl";

//////////////////////////////////////

heaterState["gmHousHeater"] = "OFF";

var gmHousTemp = "wb-ms_132/Temperature";
var gmHousHeaterOn = "wb-mr3_34/K1";
var gmHousTempSet = "grandmas-hous/HeaterControl";
var gmHousHeaterButton = "grandmas-hous/HeaterButton";
var gmHousHeaterHeader = "grandmas-hous/HeaterHeader";
var gmHousHeaterMemoryCell = heaterState["gmHousHeater"];

defineVirtualDevice('global-heater', {
    title: 'GlobalHeater' ,
    readonly: false,
    cells: {
      GlobalHeaterButton: {
          type: "pushbutton",
          value: false
      },
      HeaderGH: {
          title: "header",
          type: "text",
          value: GlobalHeaterState["globalHeater"]
      }   
    }
})

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

var MainHeater = new Device(restRoomTempSet, restRoomTemp, mainHeaterOn, mainHeaterButton, mainHeaterMemoryCell, mainHeaterHeader, heaterHisteresis);
var MediumHeater = new Device(restRoomTempSet, restRoomTemp, mediumHeaterOn, mediumHeaterButton, mediumHeaterMemoryCell, mediumHeaterHeader, heaterHisteresis);
var TamburHeater = new Device(restRoomTempSet, restRoomTemp, tamburHeaterOn, tamburHeaterButton, tamburHeaterMemoryCell, tamburHeaterHeader, heaterHisteresis);
var WaterPrepareHeater = new Device(waterPrepareTempSet, waterPrepareTemp, waterPrepareHeaterOn, waterPrepareHeaterButton, waterPrepareMemoryCell, waterPrepareHeaterHeader, heaterHisteresis);

var gmHousHeater = new Device(gmHousTempSet, gmHousTemp, gmHousHeaterOn, gmHousHeaterButton, gmHousHeaterMemoryCell, gmHousHeaterHeader, heaterHisteresis);

defineRule({
	when: function() {
      return dev["global-heater/GlobalHeaterButton"];
    },
  	then: function() {
      switch(GlobalHeaterState["globalHeater"]) {
        case "AUTO":
          GlobalHeaterState["globalHeater"] = "ON";
          getControl(globalHeaterHeader).setValue(GlobalHeaterState["globalHeater"]);
          break;
        case "ON":
          GlobalHeaterState["globalHeater"] = "OFF";
          getControl(globalHeaterHeader).setValue(GlobalHeaterState["globalHeater"]);
          break;
        case "OFF":
          GlobalHeaterState["globalHeater"] = "AUTO";
          getControl(globalHeaterHeader).setValue(GlobalHeaterState["globalHeater"]);
          break;
      }

    setHeaterState(MainHeater);
    setHeaterState(MediumHeater);
    setHeaterState(TamburHeater);
    setHeaterState(WaterPrepareHeater);  
    setHeaterState(gmHousHeater);  

    }
})

function stateCheck(device) {
    defineRule( {
        whenChanged: function() {
            return dev[device.set_param] && dev[device.actual_param];
        },
        then: function() {
            device.checkState();
        } 
    })
    
}

function setHeaterState(device) {  
    device.setMode(GlobalHeaterState["globalHeater"]);
    device.checkState();
}


stateCheck(MainHeater);
stateCheck(MediumHeater);
stateCheck(TamburHeater);
stateCheck(WaterPrepareHeater);
stateCheck(gmHousHeater);


