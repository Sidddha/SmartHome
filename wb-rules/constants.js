////////////////////////////////////
//*********Global constants****** */
////////////////////////////////////

global.globalHeaterHisteresis = 0.5;
global.globalHeaterButton = "global/GlobalHeaterButton";
global.globalOutdoorLightLux = "wb-ms_138/Illuminance";
global.globalIlluminanceHisteresis = 2;
global.globalLightButton = "global/GlobalLightButton";
global.globalLightSet = "global/LightControl";

////////////////////////////////////
//*********Main room constants*****/
////////////////////////////////////

global.mainRoomTamburCarpetState = "wb-mr6c_24/K3";
global.mainRoomTamburHeaterState = "wb-mr6c_24/K2";
global.mainRoomHeaterState = "cmnd/tasmota_C6208D/POWER";
global.mainRoomOutdoorLightState = "wb-mr6c_24/K4";

global.mainRoomTemp = "wb-msw-v3_201/Temperature";
global.mainRoomHum = "wb-msw-v3_201/Humidity";
global.mainRoomTempSet = "main-room/HeaterControl";
global.mainRoomSecondFloorTemp = "wb-ms_90/Temperature";
global.mainRoomSecondFloorHum = "wb-ms_90/Humidity";

global.mainRoomTamburCarpetButton = "main-room/TamburCarpetButton";
global.mainRoomTamburHeaterButton = "main-room/TamburHeaterButton";
global.mainRoomHeaterButton = "main-room/HeaterButton";
global.mainRoomOutdoorLightButton = "main-room/OutdoorLightButton";
global.mainRoomTamburCarpetAuto = "main-room/TamburCarpetAuto";

////////////////////////////////////
//***Grandmothers hous constants****/
////////////////////////////////////

global.gmHouseTemp = "wb-ms_132/Temperature";
global.gmHouseHum = "wb-ms_132/Humidity";
global.gmHouseHeaterState = "wb-mr3_34/K1";
global.gmHouseTempSet = "grandmas-house/HeaterControl";
global.gmHouseHeaterButton = "grandmas-house/HeaterButton";

global.gmHouseOutdoorLightState = "wb-mr3_34/K3";
global.gmHouseOutdoorLightButton = "grandmas-house/OutdoorLightButton";

////////////////////////////////////
//*********Bania constants*********/
////////////////////////////////////

global.baniaMainHeaterState = "wb-mr6c_214/K3";
global.baniaMediumHeaterState = "wb-mr6c_214/K4";
global.baniaTamburHeaterState = "wb-mr6c_214/K5";
global.baniaWaterPrepareHeaterState = "wb-mr6c_214/K6";

global.baniaRestRoomTemp = "wb-msw-v3_49/Temperature";
global.baniaRestRoomHum = "wb-msw-v3_49/Humidity";
global.baniaWaterPrepareTemp = "wb-ms_187/Temperature";
global.baniaWaterPrepareHum = "wb-ms_187/Humidity";
global.baniaTempBarrel1 = "wb-ms_187/External Sensor 1";
global.baniaTempBarrel2 = "wb-ms_187/External Sensor 2"
global.baniaUnderfloorTemperature = "wb-ms_239/Temperature";
global.baniaUnderfloorHumidity = "wb-ms_239/Humidity";

global.baniaMainHeaterButton = "bania-widget/MainHeaterButton";
global.baniaMediumHeaterButton = "bania-widget/MediumHeaterButton";
global.baniaTamburHeaterButton = "bania-widget/TamburHeaterButton";
global.baniaWaterPrepareHeaterButton = "bania-widget/WaterPrepareHeaterButton";
global.baniaTamburHeaterAuto = "bania-widget/TamburHeaterAuto";

global.baniaRestRoomTempSet = "bania-widget/MainHeaterControl";
global.baniaWaterPrepareTempSet = "bania-widget/WaterPrepareHeaterControl";