var mainRoomTamburCarpetState= "wb-mr6c_24/K3";
var mainRoomTamburHeaterState= "wb-mr6c_24/K2";
var mainRoomHeaterState= "cmnd/tasmota_C6208D/POWER";
var mainRoomOutdoorLightState= "wb-mr6c_24/K4";

var mainRoomTemp = "wb-msw-v3_201/Temperature";
var mainRoomHum = "wb-msw-v3_201/Humidity";
var SecondFloorTemp = "wb-ms_90/Temperature";
var SecondFloorHum = "wb-ms_90/Humidity";


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
            type: "deg C",
            value: dev[mainRoomTemp]
            },
        Humidity: {
            title: "Влажность",
            type: "%, RH",
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
            type: "deg C",
            value: dev[SecondFloorTemp]
            },
        Humidity2: {
            title: "Влажность. Второй этаж",
            type: "%, RH",
            value: dev[SecondFloorHum]
            }                                             
    }
})

defineRule({
    whenChanged: function() {
        return dev[mainRoomTemp];
    },
    then: function(value) {
        dev["main-room/Temperature"] = value;
    }
});

defineRule({
    whenChanged: function() {
        return dev[mainRoomHum];
    },
    then: function(value) {
        dev["main-room/Humidity"] = value;
    }
});

defineRule({
    whenChanged: function() {
        return dev[SecondFloorTemp];
    },
    then: function(value) {
        dev["main-room/Temperature2"] = value;
    }
});

defineRule({
    whenChanged: function() {
        return dev[SecondFloorHum];
    },
    then: function(value) {
        dev["main-room/Humidity2"] = value;
    }
});
