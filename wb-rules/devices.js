// import { DeviceModule } from "../wb-rules-modules/device";


var DeviceModule = require("../wb-rules-modules/device");


var mainOutdoorLight = new DeviceModule.Device(
    globalLightSet,
    outdoorLightLux,
    mainRoomOutdoorLightState,
    mainOutdoorLightButton,
    globalLightButton,
    illuminanceHisteresis);

var gmOutdoorLight = new DeviceModule.Device(
    globalLightSet,
    outdoorLightLux,
    gmOutdoorLightState,
    gmOutdoorLightButton,
    globalLightButton,
    illuminanceHisteresis);

// var mainRoomHeater = new DeviceModule.Device(mainRoomTempSet, 
//                                 mainRoomTemp, 
//                                 mainRoomHeaterState, 
//                                 mainRoomHeaterButton, 
//                                 globalHeaterButton,
//                                 mainRoomHeaterHeader, 
//                                 heaterHisteresis,);

var mainRoomTamburCarpet = new DeviceModule.Device(
    mainRoomTempSet,
    mainRoomTemp,
    mainRoomTamburCarpetState,
    mainRoomTamburCarpetButton,
    globalHeaterButton,
    heaterHisteresis);

var mainRoomTamburHeater = new DeviceModule.Device(
    mainRoomTempSet,
    mainRoomTemp,
    mainRoomTamburHeaterState,
    mainRoomTamburHeaterButton,
    globalHeaterButton,
    heaterHisteresis);

var baniaMainHeater = new DeviceModule.Device(
    restRoomTempSet,
    restRoomTemp,
    mainHeaterState,
    mainHeaterButton,
    globalHeaterButton,
    heaterHisteresis);

var baniaMediumHeater = new DeviceModule.Device(
    restRoomTempSet,
    restRoomTemp,
    mediumHeaterState,
    mediumHeaterButton,
    globalHeaterButton,
    heaterHisteresis);

var baniaTamburHeater = new DeviceModule.Device(
    restRoomTempSet,
    restRoomTemp,
    tamburHeaterState,
    tamburHeaterButton,
    globalHeaterButton,
    heaterHisteresis);

var waterPrepareHeater = new DeviceModule.Device(
    waterPrepareTempSet,
    waterPrepareTemp,
    waterPrepareHeaterState,
    waterPrepareHeaterButton,
    globalHeaterButton,
    heaterHisteresis);

var gmHouseHeater = new DeviceModule.Device(
    gmHouseTempSet,
    gmHouseTemp,
    gmHouseHeaterState,
    gmHouseHeaterButton,
    globalHeaterButton,
    heaterHisteresis);

var devices = [
    baniaMainHeater,
    baniaMediumHeater,
    baniaTamburHeater,
    waterPrepareHeater,
    gmHouseHeater,
    // mainRoomHeater,
    mainRoomTamburCarpet,
    mainRoomTamburHeater,
    mainOutdoorLight,
    gmOutdoorLight
];


devices.forEach(function(device) {
    device.updateRule();
    device.updateMode();
    device.checkButton();
    device.checkGlobalButton();
});

