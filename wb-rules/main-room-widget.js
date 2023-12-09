var mainRoomTamburCarpetState= "wb-mr6c_24/K3";
var mainRoomTamburHeaterState= "wb-mr6c_24/K2";
var mainRoomHeaterState= "cmnd/tasmota_C6208D/POWER";
var mainRoomOutdoorLightState= "wb-mr6c_24/K4";

var mainRoomTemp = "wb-msw-v3_201/Temperature";
var mainRoomHum = "wb-msw-v3_201/Humidity";


defineVirtualDevice("main-room", {
    title: "MainRoom" ,
    readonly: false, 
    cells: {
        Header: {
            title: "FirstFLoor",
            type: "text",
            value: "Первый этаж"
          },        
        Temperature: {
            title: "Temperature",
            type: "temperature",
            value: dev[mainRoomTemp]
            },
        Humidity: {
            title: "Humidity",
            type: "rel_humidity",
            value: dev[mainRoomHum]
            },
        HeaterControl: {
            title: "Установка температуры",
            type: "range",
            value: 22,
            min: 5,
            max: 30
        },
        TamburCarpetButton: {
            title: "Коврик в тамбуре",
            type: "switch",
            value: dev[mainRoomTamburCarpetState]
        },
        TamburHeaterButton: {
            title: "Радиатор в тамбуре",
            type: "switch",
            value: dev[mainRoomTamburHeaterState]
        },
        HeaterButton: {
            title: "Радиатор в комнате",
            type: "switch",
            value: dev[mainRoomHeaterState]
        },
        OutdoorLightButton: {
            title: "Уличное освещение",
            type: "switch",
            value: dev[mainRoomOutdoorLightState]
        },
        SecondFloorHeader: {
            title: "SecondFloor",
            type: "text",
            value: "Второй этаж"
          },        
        Temperature2: {
            title: "Температура",
            type: "temperature",
            value: dev["wb-ms_90/Temperature"]
            },
        Humidity2: {
            title: "Влажность",
            type: "rel_humidity",
            value: dev["wb-ms_90/Humidity"]
            }                                             
    }
})
