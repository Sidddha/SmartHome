import { gmHouse } from "./constants";

defineVirtualDevice("grandmas-house", {
    title: "GrandmasHouse",
    readonly: false,
    cells: {
        Temperature: {
            title: "Температура",
            type: "temperature",
            value: dev[gmHouse.Temp]
        },
        Humidity: {
            title: "Влажность",
            type: "rel_humidity",
            value: dev[gmHouse.Hum]
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
            value: dev[gmHouse.HeaterState]
        },
        OutdoorLightButton: {
            title: "Уличное освещение",
            type: "switch",
            value: dev[gmHouse.OutdoorLightState]
        }
    }
})

defineRule({
    whenChanged: gmHouse.Temp,
    then: function(value) {
        dev["grandmas-house/Temperature"] = value;
    }
});

defineRule({
    whenChanged: gmHouse.Hum,
    then: function(value) {
        dev["grandmas-house/Humidity"] = value;
    }
});