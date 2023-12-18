defineVirtualDevice("bania-widget", {
    title: "BaniaWidget" ,
    readonly: false, 
    cells: {
        HeaderRestRoom: {
            title: "Комната отдыха",
            type: "text",
            value: "Комната отдыха"
        },
        TemperatureRestRoom: {
            title: "Температура",
            type: "temperature",
            value: dev[global.baniaRestRoomTemp]
	    },
        HumidityRestRoom: {
            title: "Влажность",
            type: "rel_humidity",
            value: dev[global.baniaRestRoomHum]
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
            value: dev[global.baniaMainHeaterState]
        },
        MediumHeaterButton: {
            title: "Средний радиатор",
            type: "switch",
            value: dev[global.baniaMediumHeaterState]
        },
        TamburHeaterButton: {
            title: "Радиатор в тамбуре",
            type: "switch",
            value: dev[global.baniaTamburHeaterState]
        },
        TamburHeaterAuto: {
            title: "Отключить Авто-режим",
            type: "switch",
            value: true 
        },        
        HeaderWaterPrepare: {
            title: "Комната водоподготовки",
            type: "text",
            value: "Комната водоподготовки"
        },
        TemperatureWaterPrepareRoom: {
            title: "Температура КВП",
            type: "temperature",
            value: dev[global.baniaWaterPrepareTemp]
        },
        HumidityWaterPrepareRoom: {
            title: "Влажность. КВП",
            type: "rel_humidity",
            value: dev[global.baniaWaterPrepareHum]
        },
        WaterPrepareHeaterControl: {
            title: "Регулировка температуры",
            type: "range",
            value: 22,
            min: 5,
            max: 30
        },
        WaterPrepareHeaterButton: {
            title: "Радиатор. КВП",
            type: "switch",
            value: dev[global.baniaWaterPrepareHeaterState]
        },
        TemperatureBarrel1: {
            title: "Температура в бочке",
            type: "temperature",
            value: dev[global.baniaTempBarrel1]
	    },
        TemperatureBarrel2: {
            title: "Температура в бочке",
            type: "temperature",
            value: dev[global.baniaTempBarrel2]
	    },
        HeaderUnderfloor: {
            title: "Подвал",
            type: "text",
            value: "Подвал"
        },
        TemperatureUnderfloor: {
            title: "Температура в подвале",
            type: "temperature",
            value: dev[global.baniaUnderfloorTemperature]
	    },
        HumidityUnderfloor: {
            title: "Влажность в подвале",
            type: "rel_humidity",
            value: dev[global.baniaUnderfloorHumidity]
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
    whenChanged: global.baniaRestRoomTemp,
    then: function(value) {
        dev["bania-widget/TemperatureRestRoom"] = value;
    }
});

defineRule({
    whenChanged: global.baniaRestRoomHum,
    then: function(value) {
        dev["bania-widget/HumidityRestRoom"] = value;
    }
});

defineRule({
    whenChanged: global.baniaWaterPrepareTemp,
    then: function(value) {
        dev["bania-widget/TemperatureWaterPrepareRoom"] = value;
    }
});

defineRule({
    whenChanged: global.baniaWaterPrepareHum,
    then: function(value) {
        dev["bania-widget/HumidityWaterPrepareRoom"] = value;
    }
});

defineRule({
    whenChanged: global.baniaTempBarrel1,
    then: function(value) {
        dev["bania-widget/TemperatureBarrel1"] = value;
    }
});

defineRule({
    whenChanged: global.baniaTempBarrel2,
    then: function(value) {
        dev["bania-widget/TemperatureBarrel2"] = value;
    }
});

defineRule({
    whenChanged: global.baniaUnderfloorTemperature,
    then: function(value) {
        dev["bania-widget/TemperatureUnderfloor"] = value;
    }
});

defineRule({
    whenChanged: global.baniaUnderfloorHumidity,
    then: function(value) {
        dev["bania-widget/HumidityUnderfloor"] = value;
    }
});