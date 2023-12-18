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
            value: dev[gmHouseOutdoorLightState]
        }
    }
})

defineRule({
    whenChanged: gmHouseTemp,
    then: function(value) {
        dev["grandmas-house/Temperature"] = value;
    }
});

defineRule({
    whenChanged: gmHouseHum,
    then: function(value) {
        dev["grandmas-house/Humidity"] = value;
    }
});