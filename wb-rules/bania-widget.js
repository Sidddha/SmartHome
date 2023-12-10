var mainHeaterState= "wb-mr6c_214/K3";
var mediumHeaterState= "wb-mr6c_214/K4";
var tamburHeaterState= "wb-mr6c_214/K5";
var waterPrepareHeaterState= "wb-mr6c_214/K6";

var restRoomTemp = "wb-msw-v3_49/Temperature";
var restRoomHum = "wb-msw-v3_49/Humidity";
var waterPrepareTemp = "wb-ms_187/Temperature";
var waterPrepareHum = "wb-ms_187/Humidity";
var tempBarrel1 = "wb-ms_187/External Sensor 1";
var tempBarrel2 = "wb-ms_187/External Sensor 2"
var underfloorTemperature = "wb-ms_239/Temperature";
var underfloorHumidity = "wb-ms_239/Humidity";

defineVirtualDevice("bania-widget", {
    title: "BaniaWidget" ,
    readonly: false, 
    cells: {
        HeaderRestRoom: {
            title: "RestRoom",
            type: "text",
            value: "Комната отдыха"
        },
        TemperatureRestRoom: {
            title: "Температура",
            type: "temperature",
            value: dev[restRoomTemp]
	    },
        HumidityRestRoom: {
            title: "Влажность",
            type: "rel_humidity",
            value: dev[restRoomHum]
	    },
        MainHeaterControl: {
            title: "Регулировка температуры",
            type: "range",
            value: 22,
            min: 5,
            max: 30
        },
        MainHeaterButton: {
            title: "Большой радиатор",
            type: "switch",
            value: dev[mainHeaterState]
        },
        MediumHeaterButton: {
            title: "Средний радиатор",
            type: "switch",
            value: dev[mediumHeaterState]
        },
        TamburHeaterButton: {
            title: "Радиатор в тамбуре",
            type: "switch",
            value: dev[tamburHeaterState]
        },
        HeaderWaterPrepare: {
            title: "Комната водоподготовки",
            type: "text",
            value: "Комната водоподготовки"
        },
        TemperatureWaterPrepareRoom: {
            title: "Температура",
            type: "temperature",
            value: dev[waterPrepareTemp]
        },
        HumidityWaterPrepareRoom: {
            title: "Влажность",
            type: "rel_humidity",
            value: dev[waterPrepareHum]
        },
        WaterPrepareHeaterControl: {
            title: "Регулировка температуры",
            type: "range",
            value: 22,
            min: 5,
            max: 30
        },
        WaterPrepareHeaterButton: {
            title: "Радиатор",
            type: "switch",
            value: dev[waterPrepareHeaterState]
        },
        TemperatureBarrel1: {
            title: "Температура в бочке",
            type: "temperature",
            value: dev[tempBarrel1]
	    },
        TemperatureBarrel2: {
            title: "Температура в бочке",
            type: "temperature",
            value: dev[tempBarrel2]
	    },
        HeaderUnderfloor: {
            title: "Подвал",
            type: "text",
            value: "Подвал"
        },
        TemperatureUnderfloor: {
            title: "Температура в подвале",
            type: "temperature",
            value: dev[underfloorTemperature]
	    },
        HumidityUnderfloor: {
            title: "Влажность в подвале",
            type: "rel_humidity",
            value: dev[underfloorHumidity]
	    }
        // OutdoorLightButton: {
        //     type: "switch",
        //     value: false
        // },
        // OutdoorLightHeader: {
        //     title: "OutdoorLight",
        //     type: "text",
        //     value: lightState["baniaOutdoorLight"]
        // }
    }
})


defineRule({
    whenChanged: function() {
        return dev[restRoomTemp];
    },
    then: function(value) {
        dev["bania-widget/TemperatureRestRoom"] = value;
    }
});

defineRule({
    whenChanged: function() {
        return dev[restRoomHum];
    },
    then: function(value) {
        dev["bania-widget/HumidityRestRoom"] = value;
    }
});

// defineRule({
//     whenChanged: function() {
//         return dev[mainHeaterState];
//     },
//     then: function(value) {
//         dev["bania-widget/MainHeaterButton"] = value;
//     }
// });

// defineRule({
//     whenChanged: function() {
//         return dev[mediumHeaterState];
//     },
//     then: function(value) {
//         dev["bania-widget/MediumHeaterButton"] = value;
//     }
// });

// defineRule({
//     whenChanged: function() {
//         return dev[tamburHeaterState];
//     },
//     then: function(value) {
//         dev["bania-widget/TamburHeaterButton"] = value;
//     }
// });

defineRule({
    whenChanged: function() {
        return dev[waterPrepareTemp];
    },
    then: function(value) {
        dev["bania-widget/TemperatureWaterPrepareRoom"] = value;
    }
});

defineRule({
    whenChanged: function() {
        return dev[waterPrepareHum];
    },
    then: function(value) {
        dev["bania-widget/HumidityWaterPrepareRoom"] = value;
    }
});

// defineRule({
//     whenChanged: function() {
//         return dev[waterPrepareHeaterState];
//     },
//     then: function(value) {
//         dev["bania-widget/WaterPrepareHeaterButton"] = value;
//     }
// });

defineRule({
    whenChanged: function() {
        return dev[tempBarrel1];
    },
    then: function(value) {
        dev["bania-widget/TemperatureBarrel1"] = value;
    }
});

defineRule({
    whenChanged: function() {
        return dev[tempBarrel2];
    },
    then: function(value) {
        dev["bania-widget/TemperatureBarrel2"] = value;
    }
});

defineRule({
    whenChanged: function() {
        return dev[underfloorTemperature];
    },
    then: function(value) {
        dev["bania-widget/TemperatureUnderfloor"] = value;
    }
});

defineRule({
    whenChanged: function() {
        return dev[underfloorHumidity];
    },
    then: function(value) {
        dev["bania-widget/HumidityUnderfloor"] = value;
    }
});