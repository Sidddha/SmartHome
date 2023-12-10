var gmHouseTemp = "wb-ms_132/Temperature";
var gmHouseHum = "wb-ms_132/Humidity";
var gmHouseHeaterState = "wb-mr3_34/K1";
var gmOutdoorLightState = "wb-mr3_34/K3";


defineVirtualDevice("grandmas-house", {
    title: "GrandmasHouse",
    readonly: false,
    cells: {
        Temperature: {
            title: "Температура",
            type: "temperature",
            value: dev[gmHouseTemp]
        },
        Humidity: {
            title: "Влажность",
            type: "rel_humidity",
            value: dev[gmHouseHum]
        },
        HeaterControl: {
            title: "Регулировка температуры",
            type: "range",
            value: 22,
            min: 5,
            max: 30
        },
        HeaterButton: {
            title: "Обогреватель",
            type: "switch",
            value: dev[gmHouseHeaterState]
        },
        OutdoorLightButton: {
            title: "Уличное освещение",
            type: "switch",
            value: dev[gmOutdoorLightState]
        }
    }
})

