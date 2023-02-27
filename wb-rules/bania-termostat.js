var mainHeaterOn = "wb-mr6c_214/K3";
var mediumHeaterOn = "wb-mr6c_214/K4";
var tamburHeaterOn = "wb-mr6c_214/K5";
var waterPrepareHeaterOn = "wb-mr6c_214/K6";

var restRoomTemp = "wb-msw-v3_49/Temperature";
var waterPrepareTemp = "wb-ms_187/Temperature";

var globalHeaterButton = "global-heater/GlobalHeaterButton";
var mainHeaterButton = "rest-room/MainHeaterButton";
var mediumHeaterButton = "rest-room/MediumHeaterButton";
var tamburHeaterButton = "rest-room/TamburHeaterButton";
var waterPrepareHeaterButton = "rest-room/WaterPrepareHeaterButton";

var restRoomTempSet = "rest-room/MainHeaterControl";
var waterPrepareTempSet = "rest-room/WaterPrepareHeaterControl";

var heaterState = new PersistentStorage("heater-states", {global: true});

heaterState["baniaMediumHeater"];
heaterState["baniaTamburHeater"];
heaterState["baniaMainHeater"];
heaterState["baniaWaterPrepareHeater"];

var GlobalHeaterState = new PersistentStorage("global-heater-states", {global: true});

GlobalHeaterState["globalHeater"];

function stateCheck(name, heaters_memory_cell, room_temp, control, set_temp) {
    defineRule(name, {
        whenChanged: function() {
            return room_temp;
        },
        then: function() {
            switch(heaters_memory_cell) {
                case "auto":
                    if((room_temp < (set_temp - 0.5)) && !control) control = true;
                    if((room_temp < (set_temp + 0.5)) && control) control = false;
                    else control = false;
                    break;
                case "On":
                    control = true;
                    break;
                case "Off":
                    control = false;
                    break;
            }
        } 
    })
    
}

stateCheck("mainHeaterCheck", "baniaMainHeater", restRoomTemp, mainHeaterOn, restRoomTempSet);
stateCheck("mediumHeaterCheck", "baniaMediumHeater", restRoomTemp, mediumHeaterOn, restRoomTempSet);
stateCheck("tamburHeaterCheck", "baniaTamburHeater", restRoomTemp, tamburHeaterOn, restRoomTempSet);
stateCheck("waterprepareHeaterCheck", "baniaWaterPrepareHeater", waterPrepareTemp, waterPrepareHeaterOn, waterPrepareTempSet);

