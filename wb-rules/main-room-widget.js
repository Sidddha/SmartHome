var heaterState = new PersistentStorage("heater-states", {global: true});
var lightState = new PersistentStorage("light-states", {global: true});

var mainRoomTamburCarpetMemoryCell = heaterState["mainRoomTamburCarpet"];
var mainRoomTamburHeaterMemoryCell = heaterState["mainRoomTamburHeater"];
var mainRoomHeaterMemoryCell = heaterState["mainRoomHeater"];

var mainRoomOutdoorLightMemoryCell = lightState["mainRoomOutdoorLight"];

defineVirtualDevice("main-room", {
    title: "MainRoom" ,
    readonly: false, 
    cells: {
        Header: {
            title: "header",
            type: "text",
            value: "Первый этаж"
          },        
        Temperature: {
            title: "Temperature",
            type: "temperature",
            value: dev["wb-msw-v3_201/Temperature"]
            },
        Humidity: {
            title: "Humidity",
            type: "rel_humidity",
            value: dev["wb-msw-v3_201/Humidity"]
            },
        HeaterControl: {
            title: "Установка температуры",
            type: "range",
            value: 22,
            min: 5,
            max: 30
        },
        TamburCarpetButton: {
            type: "pushbutton",
            value: false
        },
        TamburHeaterButton: {
            type: "pushbutton",
            value: false
        },
        HeaterButton: {
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
            value: lightState["mainOutdoorLight"]
        },
        TamburCarpetHeader: {
            title: "header",
            type: "text",
            value: heaterState["tamburCarpet"]
          }, 
        TamburHeaterHeader: {
            title: "header",
            type: "text",
            value: heaterState["tamburHeater"]
          }, 
        HeaterHeader: {
            title: "header",
            type: "text",
            value: heaterState["mainHeater"]
          },  
        SecondFloorHeader: {
            title: "header",
            type: "text",
            value: "Второй этаж"
          },        
        Temperature2: {
            title: "Temperature2",
            type: "temperature",
            value: dev["wb-ms_90/Temperature"]
            },
        Humidity2: {
            title: "Humidity2",
            type: "rel_humidity",
            value: dev["wb-ms_90/Humidity"]
            }                                             
    }
})
