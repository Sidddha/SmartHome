var SystemModule = (function() {
    var System = function () {
        this.serial_number = "system/Short SN";
        this.uptime = "system/Current uptime";
        this.on_battery = "power_status/working on battery";
        this.v_in = "power_status/Vin";
    };

    return {
        System: System
    };
})();

exports.System = SystemModule.System;