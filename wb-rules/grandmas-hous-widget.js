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
            type: "deg C",
            value: dev[gmHouseTemp]
        },
        Humidity: {
            title: "Влажность",
            type: "%, RH",
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

defineRule({
    whenChanged: function() {
        return dev[gmHouseTemp];
    },
    then: function(value) {
        dev["grandmas-house/Temperature"] = value;
    }
});

defineRule({
    whenChanged: function() {
        return dev[gmHouseHum];
    },
    then: function(value) {
        dev["grandmas-house/Humidity"] = value;
    }
});