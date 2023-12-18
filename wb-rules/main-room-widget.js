import { mainRoom } from "./constants";

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
            value: dev[mainRoom.Temp]
            },
        Humidity: {
            title: "Влажность",
            type: "rel_humidity",
            value: dev[mainRoom.Hum]
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
            value: dev[mainRoom.TamburCarpetState]
        },
        TamburCarpetAuto: {
            title: "Отключить Авто-режим",
            type: "switch",
            value: true 
        },
        TamburHeaterButton: {
            title: "Радиатор в тамбуре",
            type: "switch",
            value: dev[mainRoom.TamburHeaterState]
        },
        // HeaterButton: {
        //     title: "Радиатор в комнате",
        //     type: "switch",
        //     value: dev[mainRoom.HeaterState]
        // },
        OutdoorLightButton: {
            title: "Уличное освещение",
            type: "switch",
            value: dev[mainRoom.OutdoorLightState]
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
            title: "Влажность. Второй этаж",
            type: "rel_humidity",
            value: dev[SecondFloorHum]
            }                                             
    }
})

defineRule({
    whenChanged: mainRoom.Temp,
    then: function(value) {
        dev["main-room/Temperature"] = value;
    }
});

defineRule({
    whenChanged: 
        mainRoom.Hum,
    then: function(value) {
        dev["main-room/Humidity"] = value;
    }
});

defineRule({
    whenChanged: SecondFloorTemp,
    then: function(value) {
        dev["main-room/Temperature2"] = value;
    }
});

defineRule({
    whenChanged: SecondFloorHum,
    then: function(value) {
        dev["main-room/Humidity2"] = value;
    }
});
