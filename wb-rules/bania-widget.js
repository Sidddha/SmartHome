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
            title: "Temperature",
            type: "temperature",
            value: dev[restRoomTemp]
	    },
        HumidityRestRoom: {
            title: "Humidity",
            type: "rel_humidity",
            value: dev[restRoomHum]
	    },
        MainHeaterHeader: {
            title: "MainHeater",
            type: "text",
            value: "Большой радиатор"
        },
        MainHeaterControl: {
            type: "range",
            value: 22,
            min: 5,
            max: 30
        },
        MainHeaterButton: {
            type: "switch",
            value: dev[mainHeaterState]
        },
        MediumHeaterHeader: {
            title: "MediumHeater",
            type: "text",
            value: "Средний радиатор"
        },          
        MediumHeaterButton: {
            type: "switch",
            value: dev[mediumHeaterState]
        }, 
        TamburHeaterHeader: {
            title: "TamburHeater",
            type: "text",
            value: "Радиатор в тамбуре"
        },
        TamburHeaterButton: {
            type: "switch",
            value: dev[tamburHeaterState]
        },              
        HeaderWaterPrepare: {
            title: "WaterPrepare",
            type: "text",
            value: "Комната водоподготовки"
        },    
        TemperatureWaterPrepareRoom: {
            title: "Temperature",
            type: "temperature",
            value: dev[waterPrepareTemp]
        },
        HumidityWaterPrepareRoom: {
            title: "Humidity",
            type: "rel_humidity",
            value: dev[waterPrepareHum]
        },
        WaterPrepareHeaterControl: {
            type: "range",
            value: 22,
            min: 5,
            max: 30
        },        
        WaterPrepareHeaterHeader: {
            title: "WaterPrepareHeater",
            type: "text",
            value: "Радиатор"
        },
        WaterPrepareHeaterButton: {
            type: "switch",
            value: dev[waterPrepareHeaterState]
        },
        TemperatureBarrel1: {
            title: "Temperature",
            type: "temperature",
            value: dev[tempBarrel1]
	    },
        TemperatureBarrel2: {
            title: "Temperature",
            type: "temperature",
            value: dev[tempBarrel2]
	    },              
        HeaderUnderfloor: {
            title: "Underfloor",
            type: "text",
            value: "Подвал"
        },       
        TemperatureUnderfloor: {
            title: "UnderfloorTemperature",
            type: "temperature",
            value: dev[underfloorTemperature]
	    },
        HumidityUnderfloor: {
            title: "Humidity",
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

