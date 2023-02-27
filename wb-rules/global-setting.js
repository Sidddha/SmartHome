var GlobalHeaterState = new PersistentStorage("global-heater-states", {global: true});

GlobalHeaterState["globalHeater"] = "auto";

var heaterState = new PersistentStorage("heater-states", {global: true});

heaterState["baniaMediumHeater"];
heaterState["baniaTamburHeater"];
heaterState["baniaMainHeater"];
heaterState["baniaWaterPrepareHeater"];

 var mainHeaterOn = "wb-mr6c_214/K3";
var mediumHeaterOn = "wb-mr6c_214/K4";
var tamburHeaterOn = "wb-mr6c_214/K5";
var waterPrepareHeaterOn = "wb-mr6c_214/K6";

var restRoomTemp = "wb-msw-v3_49/Temperature";
var waterPrepareTemp = "wb-ms_187/Temperature";

var globalHeaterButton = "global-heater/GlobalHeaterButton";
var globalHeaterHeader = "global-heater/HeaderGH";

var mainHeaterButton = "rest-room/MainHeaterButton";
var mediumHeaterButton = "rest-room/MediumHeaterButton";
var tamburHeaterButton = "rest-room/TamburHeaterButton";
var waterPrepareHeaterButton = "rest-room/WaterPrepareHeaterButton";

var restRoomTempSet = "rest-room/MainHeaterControl";
var waterPrepareTempSet = "rest-room/WaterPrepareHeaterControl";

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
function Heater(set_temp, room_temp, heater_control, button_control, memory_cell, header_control) {
    this.set_temp = set_temp;
    this.room_temp = room_temp;
    this.heater_control = heater_control;
    this.button_control = button_control;
    this.memory_cell = memory_cell;
    this.header_control = header_control;
}

Heater.prototype.setMode = function(mode) {
    heaterState[this.memory_cell] = mode;
    getControl(this.header_control).setValue(heaterState[this.memory_cell]);
}

Heater.prototype.getMode = function() {
    return heaterState[this.memory_cell];	
}

Heater.prototype.checkState = function() {
    switch(heaterState[this.memory_cell]) {
        case "auto":
            if((dev[this.room_temp] < (dev[this.set_temp]- 0.5)) && !dev[this.heater_control]) getControl(this.heater_control).setValue(true);
            if((dev[this.room_temp] < (dev[this.set_temp] + 0.5)) && dev[this.heater_control]) getControl(this.heater_control).setValue(false);
            else getControl(this.heater_control).setValue(false);
            break;
        case "On":
            getControl(this.heater_control).setValue(true);
            break;
        case "Off":
            getControl(this.heater_control).setValue(false)
            break;
    }
}

var MainHeater = new Heater(restRoomTempSet, restRoomTemp, mainHeaterOn, mainHeaterButton, "baniaMainHeater", "rest-room/MainHeaterHeader");
var MediumHeater = new Heater(restRoomTempSet, restRoomTemp, mediumHeaterOn, mediumHeaterButton, "baniaMeduimHeater", "rest-room/MediumHeaterHeader");
var TamburHeater = new Heater(restRoomTempSet, restRoomTemp, tamburHeaterOn, tamburHeaterButton, "baniaTamburHeater", "rest-room/TamburHeaterHeader");
var WaterPrepareHeater = new Heater(waterPrepareTempSet, waterPrepareTemp, waterPrepareHeaterOn, waterPrepareHeaterButton, "baniaWaterPrepareHeater", "rest-room/WaterPrepareHeaterHeader");

defineRule({
	when: function() {
      return dev["global-heater/GlobalHeaterButton"];
    },
  	then: function() {
      switch(GlobalHeaterState["globalHeater"]) {
        case "auto":
          GlobalHeaterState["globalHeater"] = "On";
          getControl(globalHeaterHeader).setValue(GlobalHeaterState["globalHeater"]);
          break;
        case "On":
          GlobalHeaterState["globalHeater"] = "Off";
          getControl(globalHeaterHeader).setValue(GlobalHeaterState["globalHeater"]);
          break;
        case "Off":
          GlobalHeaterState["globalHeater"] = "auto";
          getControl(globalHeaterHeader).setValue(GlobalHeaterState["globalHeater"]);
          break;
      }
    setHeaterState(MainHeater);
    setHeaterState(MediumHeater);
    setHeaterState(TamburHeater);
    setHeaterState(WaterPrepareHeater);  
    }
})

function stateCheck(heater) {
    defineRule( {
        whenChanged: function() {
            return dev[heater.room_temp] && dev[heater.set_temp];
        },
        then: function() {
            heater.checkState();
        } 
    })
    
}

function setHeaterState(heater) {  
    heater.setMode(GlobalHeaterState["globalHeater"]);
    heater.checkState();
}


stateCheck(MainHeater);
stateCheck(MediumHeater);
stateCheck(TamburHeater);
stateCheck(WaterPrepareHeater);


