import { bania } from "./constants";

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
            value: dev[bania.restRoomTemp]
	    },
        HumidityRestRoom: {
            title: "Влажность",
            type: "rel_humidity",
            value: dev[bania.restRoomHum]
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
            value: dev[bania.mainHeaterState]
        },
        MediumHeaterButton: {
            title: "Средний радиатор",
            type: "switch",
            value: dev[bania.mediumHeaterState]
        },
        TamburHeaterButton: {
            title: "Радиатор в тамбуре",
            type: "switch",
            value: dev[bania.tamburHeaterState]
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
            title: "Температура. КВП",
            type: "temperature",
            value: dev[bania.waterPrepareTemp]
        },
        HumidityWaterPrepareRoom: {
            title: "Влажность. КВП",
            type: "rel_humidity",
            value: dev[bania.waterPrepareHum]
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
            value: dev[bania.waterPrepareHeaterState]
        },
        TemperatureBarrel1: {
            title: "Температура в бочке",
            type: "temperature",
            value: dev[bania.tempBarrel1]
	    },
        TemperatureBarrel2: {
            title: "Температура в бочке",
            type: "temperature",
            value: dev[bania.tempBarrel2]
	    },
        HeaderUnderfloor: {
            title: "Подвал",
            type: "text",
            value: "Подвал"
        },
        TemperatureUnderfloor: {
            title: "Температура в подвале",
            type: "temperature",
            value: dev[bania.underfloorTemperature]
	    },
        HumidityUnderfloor: {
            title: "Влажность в подвале",
            type: "rel_humidity",
            value: dev[bania.underfloorHumidity]
	    }
        // OutdoorLightButton: {
        //     type: "switch",
        //     value: false
        // },
        // OutdoorLightHeader: {
        //     title: "OutdoorLight",
        //     type: "text",
        //     value: lightState["bania.OutdoorLight"]
        // }
    }
})


defineRule({
    whenChanged: bania.restRoomTemp,
    then: function(value) {
        dev["bania-widget/TemperatureRestRoom"] = value;
    }
});

defineRule({
    whenChanged: bania.restRoomHum,
    then: function(value) {
        dev["bania-widget/HumidityRestRoom"] = value;
    }
});

defineRule({
    whenChanged: bania.waterPrepareTemp,
    then: function(value) {
        dev["bania-widget/TemperatureWaterPrepareRoom"] = value;
    }
});

defineRule({
    whenChanged: bania.waterPrepareHum,
    then: function(value) {
        dev["bania-widget/HumidityWaterPrepareRoom"] = value;
    }
});

defineRule({
    whenChanged: bania.tempBarrel1,
    then: function(value) {
        dev["bania-widget/TemperatureBarrel1"] = value;
    }
});

defineRule({
    whenChanged: bania.tempBarrel2,
    then: function(value) {
        dev["bania-widget/TemperatureBarrel2"] = value;
    }
});

defineRule({
    whenChanged: bania.underfloorTemperature,
    then: function(value) {
        dev["bania-widget/TemperatureUnderfloor"] = value;
    }
});

defineRule({
    whenChanged: bania.underfloorHumidity,
    then: function(value) {
        dev["bania-widget/HumidityUnderfloor"] = value;
    }
});