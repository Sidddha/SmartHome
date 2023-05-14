var heaterState = new PersistentStorage("heater-states", {global: true}); 
var lightState = new PersistentStorage("light-states", {global: true}); 

var baniaOutdoorLightMemoryCell = lightState["baniaOutdoorLight"];

var mainHeaterMemoryCell = heaterState["baniaMainHeater"];
var mediumHeaterMemoryCell = heaterState["baniaMediumHeater"];
var tamburHeaterMemoryCell = heaterState["baniaTamburHeater"];
var waterPrepareMemoryCell = heaterState["baniaWaterPrepareHeater"];

defineVirtualDevice('rest-room', {
    title: 'RestRoom' ,
    readonly: false, 
    cells: {
        HeaderRestRoom: {
            title: "header",
            type: "text",
            value: "Комната отдыха"
        },
        TemperatureRestRoom: {
            title: "Temperature",
            type: "temperature",
            value: dev["wb-msw-v3_49/Temperature"]
	    },
        HumidityRestRoom: {
            title: "Humidity",
            type: "rel_humidity",
            value: dev["wb-msw-v3_49/Humidity"]
	    },
        MainHeaterControl: {
            type: "range",
            value: 22,
            min: 5,
            max: 30
        },
        MainHeaterButton: {
            type: "pushbutton",
            value: false
        },
        MediumHeaterButton: {
            type: "pushbutton",
            value: false
        }, 
        TamburHeaterButton: {
            type: "pushbutton",
            value: false
        },              
        OutdoorLightButton: {
            type: "pushbutton",
            value: false
        },
        OutdoorLightHeader: {
            title: "header",
            type: "text",
            value: lightState["baniaOutdoorLight"]
        },
        MainHeaterHeader: {
            title: "header",
            type: "text",
            value: heaterState["baniaMainHeater"]
        },
        MediumHeaterHeader: {
            title: "header",
            type: "text",
            value: heaterState["baniaMediumHeater"]
        },          
        TamburHeaterHeader: {
            title: "header",
            type: "text",
            value: heaterState["baniaTamburHeater"]
        },
        HeaderWaterPrepare: {
            title: "header",
            type: "text",
            value: "Комната водоподготовки"
        },    
        WaterPrepareHeaterControl: {
            type: "range",
            value: 22,
            min: 5,
            max: 30
        },        
        WaterPrepareHeaterButton: {
            type: "pushbutton",
            value: false
        },
        WaterPrepareHeaterHeader: {
            title: "header",
            type: "text",
            value: heaterState["baniaWaterPrepareHeater"]
        },
        TemperatureWaterPrepareRoom: {
            title: "Temperature",
            type: "temperature",
            value: dev["wb-ms_187/Temperature"]
	    },
        HumidityWaterPrepareRoom: {
            title: "Humidity",
            type: "rel_humidity",
            value: dev["wb-ms_187/Humidity"]
	    },
        TemperatureBarrel1: {
            title: "Temperature",
            type: "temperature",
            value: dev["wb-ms_187/External Sensor 1"]
	    },
        TemperatureBarrel2: {
            title: "Temperature",
            type: "temperature",
            value: dev["wb-ms_187/External Sensor 2"]
	    },              
        HeaderUnderfloor: {
            title: "header",
            type: "text",
            value: "Подвал"
        },       
        TemperatureUnderfloor: {
            title: "Temperature",
            type: "temperature",
            value: dev["wb-ms_239/Temperature"]
	    },
        HumidityUnderfloor: {
            title: "Humidity",
            type: "rel_humidity",
            value: dev["wb-ms_239/Humidity"]
	    }
    }
})