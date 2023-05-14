var GlobalHeaterState = new PersistentStorage("global-heater-states", {global: true});

GlobalHeaterState["globalHeater"] = "OFF";

var globalHeaterButton = "global-heater/GlobalHeaterButton";
var globalHeaterHeader = "global-heater/HeaderGH";

exports.buttonLogic = function(device) {
    module.static.device = device;
    defineRule({
        when: function() {
            return dev[module.static.device.getButton()];
        },
        then: function() {
            switch(module.static.device.getMode()) {
                case "AUTO":
                    module.static.device.setMode("ON");
                    module.static.device.checkState();
                    break;
                case "ON":
                    module.static.device.setMode("OFF");
                    module.static.device.checkState();
                    break;
                case "OFF":
                    module.static.device.setMode("AUTO");
                    module.static.device.checkState();
                  break;
            }    
        }
    })
  }

  exports.globalButtonLogic = function(devices) {

    defineRule({
        when: function() {
        return dev[globalHeaterButton];
        },
        then: function() {
        switch(GlobalHeaterState["globalHeater"]) {
            case "AUTO":    
            GlobalHeaterState["globalHeater"] = "ON";
            getControl(globalHeaterHeader).setValue(GlobalHeaterState["globalHeater"]);
            break;
            case "ON":
            GlobalHeaterState["globalHeater"] = "OFF";
            getControl(globalHeaterHeader).setValue(GlobalHeaterState["globalHeater"]);
            break;
            case "OFF":
            GlobalHeaterState["globalHeater"] = "AUTO";
            getControl(globalHeaterHeader).setValue(GlobalHeaterState["globalHeater"]);
            break;
        };

        for( i = 0; i < devices.length; ++i) {
            module.static.device = devices[i];
            module.static.device.setMode(GlobalHeaterState["globalHeater"]);
            log(i + " " + module.static.device.getButton())
        }

        }
    })
}