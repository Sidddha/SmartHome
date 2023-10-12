var CollectValues = function (name, control) {
    this.name = name;
    this.control = control;

}
CollectValues.prototype.formatDate = function (date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
CollectValues.prototype.getValues = function () {
    date = new Date();
    date = CollectValues.formatDate(date);
    defineRule(this.name, {
        when: cron("@dayli"),
        then: function () {
            runShellCommand(("wb-mqtt-db-cli --from {} --decimal-places 1 -a {} -o /mnt/sdcard/monitoring_db/{} --timeout 10", date, this.control, this.name), {
                captureOutput: false
            });
        }
    });
}

var MainRoomTemp = new CollectValues("MainRoomTemp", "wb-msw-v3_201/Temperature");
var BaniaTemp = new CollectValues("BaniaTemp", "wb-msw-v3_49/Temperature");
var gmHousTemp = new CollectValues("gmHousTemp", "wb-ms_132/Temperature");
var outdoorTemp = new CollectValues("outdoorTemp", "wb-ms_138/Temperature");

mainRoomTemp.getValues();
BaniaTemp.getValues();
gmHousTemp.getValues();
outdoorTemp.getValues();

// defineRule("RunPythoScript", {
//     when: cron("@dayli"),
//     then: function () {
//         spawn("python3 /mnt/sdcard/monitoring_db/monitoring.py");
//     }
// });
