////////////////////////////////////
//*********Global constants****** */
////////////////////////////////////

var globalHeaterHisteresis = 0.5;
var globalHeaterButton = "global/GlobalHeaterButton";
var globalOutdoorLightLux = "wb-ms_138/Illuminance";
var globalIlluminanceHisteresis = 2;
var globalLightButton = "global/GlobalLightButton";
var globalLightSet = "global/LightControl";

////////////////////////////////////
//*********Main room constants*****/
////////////////////////////////////

var mainRoomTamburCarpetState = "wb-mr6c_24/K3";
var mainRoomTamburHeaterState = "wb-mr6c_24/K2";
var mainRoomHeaterState = "cmnd/tasmota_C6208D/POWER";
var mainRoomOutdoorLightState = "wb-mr6c_24/K4";

var mainRoomTemp = "wb-msw-v3_201/Temperature";
var mainRoomHum = "wb-msw-v3_201/Humidity";
var mainRoomTempSet = "main-room/HeaterControl";
var mainRoomSecondFloorTemp = "wb-ms_90/Temperature";
var mainRoomSecondFloorHum = "wb-ms_90/Humidity";

var mainRoomTamburCarpetButton = "main-room/TamburCarpetButton";
var mainRoomTamburHeaterButton = "main-room/TamburHeaterButton";
var mainRoomHeaterButton = "main-room/HeaterButton";
var mainRoomOutdoorLightButton = "main-room/OutdoorLightButton";
var mainRoomTamburCarpetAuto = "main-room/TamburCarpetAuto";

////////////////////////////////////
//***Grandmothers hous constants****/
////////////////////////////////////

var gmHouseTemp = "wb-ms_132/Temperature";
var gmHouseHum = "wb-ms_132/Humidity";
var gmHouseHeaterState = "wb-mr3_34/K1";
var gmHouseTempSet = "grandmas-house/HeaterControl";
var gmHouseHeaterButton = "grandmas-house/HeaterButton";

var gmHouseOutdoorLightState = "wb-mr3_34/K3";
var gmHouseOutdoorLightButton = "grandmas-house/OutdoorLightButton";

////////////////////////////////////
//*********Bania constants*********/
////////////////////////////////////

var baniaMainHeaterState = "wb-mr6c_214/K3";
var baniaMediumHeaterState = "wb-mr6c_214/K4";
var baniaTamburHeaterState = "wb-mr6c_214/K5";
var baniaWaterPrepareHeaterState = "wb-mr6c_214/K6";

var baniaRestRoomTemp = "wb-msw-v3_49/Temperature";
var baniaRestRoomHum = "wb-msw-v3_49/Humidity";
var baniaWaterPrepareTemp = "wb-ms_187/Temperature";
var baniaWaterPrepareHum = "wb-ms_187/Humidity";
var baniaTempBarrel1 = "wb-ms_187/External Sensor 1";
var baniaTempBarrel2 = "wb-ms_187/External Sensor 2"
var baniaUnderfloorTemperature = "wb-ms_239/Temperature";
var baniaUnderfloorHumidity = "wb-ms_239/Humidity";

var baniaMainHeaterButton = "bania-widget/MainHeaterButton";
var baniaMediumHeaterButton = "bania-widget/MediumHeaterButton";
var baniaTamburHeaterButton = "bania-widget/TamburHeaterButton";
var baniaWaterPrepareHeaterButton = "bania-widget/WaterPrepareHeaterButton";
var baniaTamburHeaterAuto = "bania-widget/TamburHeaterAuto";

var baniaRestRoomTempSet = "bania-widget/MainHeaterControl";
var baniaWaterPrepareTempSet = "bania-widget/WaterPrepareHeaterControl";