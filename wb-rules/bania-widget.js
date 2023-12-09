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
            titlt: "Регулировка температура",
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
            title: "MediumHeater",
            type: "switch",
            value: dev[mediumHeaterState]
        },
        TamburHeaterButton: {
            title: "Радиатор в тамбуре",
            type: "switch",
            value: dev[tamburHeaterState]
        },              
        HeaderWaterPrepare: {
            title: "WaterPrepare",
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
            title: "Underfloor",
            type: "text",
            value: "Подвал"
        },       
        TemperatureUnderfloor: {
            title: "Температура",
            type: "temperature",
            value: dev[underfloorTemperature]
	    },
        HumidityUnderfloor: {
            title: "Влажность",
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

