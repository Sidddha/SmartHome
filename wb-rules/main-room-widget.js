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
            title: "Temperature2",
            type: "temperature",
            value: dev["wb-ms_90/Temperature"]
            },
        Humidity2: {
            title: "Humidity2",
            type: "rel_humidity",
            value: dev["wb-ms_90/Humidity"]
            }                                             
    }
})
