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
            value: dev[bglobal.aniaRestRoomTemp]
	    },
        HumidityRestRoom: {
            title: "Влажность",
            type: "rel_humidity",
            value: dev[baniaRestRoomHum]
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
            value: dev[baniaMainHeaterState]
        },
        MediumHeaterButton: {
            title: "Средний радиатор",
            type: "switch",
            value: dev[baniaMediumHeaterState]
        },
        TamburHeaterButton: {
            title: "Радиатор в тамбуре",
            type: "switch",
            value: dev[baniaTamburHeaterState]
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
            value: dev[baniaWaterPrepareTemp]
        },
        HumidityWaterPrepareRoom: {
            title: "Влажность. КВП",
            type: "rel_humidity",
            value: dev[baniaWaterPrepareHum]
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
            value: dev[baniaWaterPrepareHeaterState]
        },
        TemperatureBarrel1: {
            title: "Температура в бочке",
            type: "temperature",
            value: dev[baniaTempBarrel1]
	    },
        TemperatureBarrel2: {
            title: "Температура в бочке",
            type: "temperature",
            value: dev[baniaTempBarrel2]
	    },
        HeaderUnderfloor: {
            title: "Подвал",
            type: "text",
            value: "Подвал"
        },
        TemperatureUnderfloor: {
            title: "Температура в подвале",
            type: "temperature",
            value: dev[baniaUnderfloorTemperature]
	    },
        HumidityUnderfloor: {
            title: "Влажность в подвале",
            type: "rel_humidity",
            value: dev[baniaUnderfloorHumidity]
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
    whenChanged: baniaRestRoomTemp,
    then: function(value) {
        dev["bania-widget/TemperatureRestRoom"] = value;
    }
});

defineRule({
    whenChanged: baniaRestRoomHum,
    then: function(value) {
        dev["bania-widget/HumidityRestRoom"] = value;
    }
});

defineRule({
    whenChanged: baniaWaterPrepareTemp,
    then: function(value) {
        dev["bania-widget/TemperatureWaterPrepareRoom"] = value;
    }
});

defineRule({
    whenChanged: baniaWaterPrepareHum,
    then: function(value) {
        dev["bania-widget/HumidityWaterPrepareRoom"] = value;
    }
});

defineRule({
    whenChanged: baniaTempBarrel1,
    then: function(value) {
        dev["bania-widget/TemperatureBarrel1"] = value;
    }
});

defineRule({
    whenChanged: baniaTempBarrel2,
    then: function(value) {
        dev["bania-widget/TemperatureBarrel2"] = value;
    }
});

defineRule({
    whenChanged: baniaUnderfloorTemperature,
    then: function(value) {
        dev["bania-widget/TemperatureUnderfloor"] = value;
    }
});

defineRule({
    whenChanged: baniaUnderfloorHumidity,
    then: function(value) {
        dev["bania-widget/HumidityUnderfloor"] = value;
    }
});