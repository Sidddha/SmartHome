defineVirtualDevice( "start", {
    title: "start",
    readonly: false,
    cells: {
        FirstStart: {
            title: "firstStart",
            type: "switch",
            value: true,
            forceDefault: true
        },
        Trigger: {
            type: "pushbutton",
            value: false
        }
    }

})