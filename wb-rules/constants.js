////////////////////////////////////
//*********Global constants****** */
////////////////////////////////////

var global = {
    HeaterHisteresis: 0.5,
    HeaterButton: "global/GlobalHeaterButton",
    OutdoorLightLux: "wb-ms_138/Illuminance",
    IlluminanceHisteresis: 2,
    LightButton: "global/GlobalLightButton",
    LightSet: "global/LightControl"
};
export {global};

////////////////////////////////////
//*********Main room constants*****/
////////////////////////////////////

var mainRoom = {
    TamburCarpetState: "wb-mr6c_24/K3",
    TamburHeaterState: "wb-mr6c_24/K2",
    HeaterState: "cmnd/tasmota_C6208D/POWER",
    OutdoorLightState: "wb-mr6c_24/K4",

    Temp: "wb-msw-v3_201/Temperature",
    Hum: "wb-msw-v3_201/Humidity",
    TempSet: "main-room/HeaterControl",

    TamburCarpetButton: "main-room/TamburCarpetButton",
    TamburHeaterButton: "main-room/TamburHeaterButton",
    HeaterButton: "main-room/HeaterButton",
    OutdoorLightButton: "main-room/OutdoorLightButton",
    TamburCarpetAuto: "main-room/TamburCarpetAuto"
};
export {mainRoom};

////////////////////////////////////
//***Grandmothers hous constants****/
////////////////////////////////////

var gmHouse = {
    Temp: "wb-ms_132/Temperature",
    Hum: "wb-ms_132/Humidity",
    HeaterState: "wb-mr3_34/K1",
    TempSet: "grandmas-house/HeaterControl",
    HeaterButton: "grandmas-house/HeaterButton",

    OutdoorLightState: "wb-mr3_34/K3",
    OutdoorLightButton: "grandmas-house/OutdoorLightButton"
};
export {gmHouse};

////////////////////////////////////
//*********Bania constants*********/
////////////////////////////////////

 var bania = {
    mainHeaterState: "wb-mr6c_214/K3",
    mediumHeaterState: "wb-mr6c_214/K4",
    tamburHeaterState: "wb-mr6c_214/K5",
    waterPrepareHeaterState: "wb-mr6c_214/K6",

    restRoomTemp: "wb-msw-v3_49/Temperature",
    restRoomHum: "wb-msw-v3_49/Humidity",
    waterPrepareTemp: "wb-ms_187/Temperature",
    waterPrepareHum: "wb-ms_187/Humidity",
    tempBarrel1: "wb-ms_187/External Sensor 1",
    tempBarrel2: "wb-ms_187/External Sensor 2",
    underfloorTemperature: "wb-ms_239/Temperature",
    underfloorHumidity: "wb-ms_239/Humidity",

    mainHeaterButton: "bania-widget/MainHeaterButton",
    mediumHeaterButton: "bania-widget/MediumHeaterButton",
    tamburHeaterButton: "bania-widget/TamburHeaterButton",
    waterPrepareHeaterButton: "bania-widget/WaterPrepareHeaterButton",
    TamburHeaterAuto: "bania-widget/TamburHeaterAuto",

    restRoomTempSet: "bania-widget/MainHeaterControl",
    waterPrepareTempSet: "bania-widget/WaterPrepareHeaterControl"
 };
 export {bania};