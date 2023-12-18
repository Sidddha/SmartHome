defineVirtualDevice("main-room", {
    title: "MainRoom" ,
    readonly: false, 
    cells: {
        Header: {
            title: "Первый этаж",
            type: "text",
            value: "Первый этаж"
          },        
        Temperature: {
            title: "Температура",
            type: "temperature",
            value: dev[mainRoomTemp]
            },
        Humidity: {
            title: "Влажность",
            type: "rel_humidity",
            value: dev[mainRoomHum]
            },
        HeaterControl: {
            title: "Регулировка температуры",
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
        TamburCarpetAuto: {
            title: "Отключить Авто-режим",
            type: "switch",
            value: true 
        },
        TamburHeaterButton: {
            title: "Радиатор в тамбуре",
            type: "switch",
            value: dev[mainRoomTamburHeaterState]
        },
        // HeaterButton: {
        //     title: "Радиатор в комнате",
        //     type: "switch",
        //     value: dev[mainRoomHeaterState]
        // },
        OutdoorLightButton: {
            title: "Уличное освещение",
            type: "switch",
            value: dev[mainRoomOutdoorLightState]
        },
        SecondFloorHeader: {
            title: "Второй этаж",
            type: "text",
            value: "Второй этаж"
          },        
        Temperature2: {
            title: "Температура. Второй этаж",
            type: "temperature",
            value: dev[SecondFloorTemp]
            },
        Humidity2: {
            title: "Влажность Второй этаж",
            type: "rel_humidity",
            value: dev[SecondFloorHum]
            }                                             
    }
})

defineRule({
    whenChanged: mainRoomTemp,
    then: function(value) {
        dev["main-room/Temperature"] = value;
    }
});

defineRule({
    whenChanged: mainRoomHum,
    then: function(value) {
        dev["main-room/Humidity"] = value;
    }
});

defineRule({
    whenChanged: mainRoomSecondFloorTemp,
    then: function(value) {
        dev["main-room/Temperature2"] = value;
    }
});

defineRule({
    whenChanged: mainRoomSecondFloorHum,
    then: function(value) {
        dev["main-room/Humidity2"] = value;
    }
});
