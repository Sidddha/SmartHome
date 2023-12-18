////////////////////////////////////
//*********Global constants****** */
////////////////////////////////////

const globalHeaterHisteresis = 0.5;
const globalHeaterButton = "global/GlobalHeaterButton";
const globalOutdoorLightLux = "wb-ms_138/Illuminance";
const globalIlluminanceHisteresis = 2;
const globalLightButton = "global/GlobalLightButton";
const globalLightSet = "global/LightControl";

////////////////////////////////////
//*********Main room constants*****/
////////////////////////////////////

const mainRoomTamburCarpetState = "wb-mr6c_24/K3";
const mainRoomTamburHeaterState = "wb-mr6c_24/K2";
const mainRoomHeaterState = "cmnd/tasmota_C6208D/POWER";
const mainRoomOutdoorLightState = "wb-mr6c_24/K4";

const mainRoomTemp = "wb-msw-v3_201/Temperature";
const mainRoomHum = "wb-msw-v3_201/Humidity";
const mainRoomTempSet = "main-room/HeaterControl";
const mainRoomSecondFloorTemp = "wb-ms_90/Temperature";
const mainRoomSecondFloorHum = "wb-ms_90/Humidity";

const mainRoomTamburCarpetButton = "main-room/TamburCarpetButton";
const mainRoomTamburHeaterButton = "main-room/TamburHeaterButton";
const mainRoomHeaterButton = "main-room/HeaterButton";
const mainRoomOutdoorLightButton = "main-room/OutdoorLightButton";
const mainRoomTamburCarpetAuto = "main-room/TamburCarpetAuto";

////////////////////////////////////
//***Grandmothers hous constants****/
////////////////////////////////////

const gmHouseTemp = "wb-ms_132/Temperature";
const gmHouseHum = "wb-ms_132/Humidity";
const gmHouseHeaterState = "wb-mr3_34/K1";
const gmHouseTempSet = "grandmas-house/HeaterControl";
const gmHouseHeaterButton = "grandmas-house/HeaterButton";

const gmHouseOutdoorLightState = "wb-mr3_34/K3";
const gmHouseOutdoorLightButton = "grandmas-house/OutdoorLightButton";

////////////////////////////////////
//*********Bania constants*********/
////////////////////////////////////

const baniaMainHeaterState = "wb-mr6c_214/K3";
const baniaMediumHeaterState = "wb-mr6c_214/K4";
const baniaTamburHeaterState = "wb-mr6c_214/K5";
const baniaWaterPrepareHeaterState = "wb-mr6c_214/K6";

const baniaRestRoomTemp = "wb-msw-v3_49/Temperature";
const baniaRestRoomHum = "wb-msw-v3_49/Humidity";
const baniaWaterPrepareTemp = "wb-ms_187/Temperature";
const baniaWaterPrepareHum = "wb-ms_187/Humidity";
const baniaTempBarrel1 = "wb-ms_187/External Sensor 1";
const baniaTempBarrel2 = "wb-ms_187/External Sensor 2"
const baniaUnderfloorTemperature = "wb-ms_239/Temperature";
const baniaUnderfloorHumidity = "wb-ms_239/Humidity";

const baniaMainHeaterButton = "bania-widget/MainHeaterButton";
const baniaMediumHeaterButton = "bania-widget/MediumHeaterButton";
const baniaTamburHeaterButton = "bania-widget/TamburHeaterButton";
const baniaWaterPrepareHeaterButton = "bania-widget/WaterPrepareHeaterButton";
const baniaTamburHeaterAuto = "bania-widget/TamburHeaterAuto";

const baniaRestRoomTempSet = "bania-widget/MainHeaterControl";
const baniaWaterPrepareTempSet = "bania-widget/WaterPrepareHeaterControl";