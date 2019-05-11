
require(["app"], function (App) {

    const persistedState = JSON.parse(localStorage.getItem("app.state") || "null");
    console.log("persisted state", persistedState);

    const state = persistedState || {
        config: {
            apiKey: "xyz314159265",
        },
        who: "World",
    };

    const appLensDef = {
        apiKey: ["config", "apiKey"],
        who: ["who"],
    };

    function compile(def) {
        function lens(state) {
            const projection = {};
            Object.keys(def).forEach(function (key) {
                let value = state;
                def[key].forEach(function (part) {
                    value = value[part];
                });
                projection[key] = value;
            });
            return projection;
        }
        lens.set = function set(state, newValues) {
            Object.keys(newValues).forEach(function (key) {
                let lasttree = null;
                let lastpart = null;
                let subtree = state;
                def[key].forEach(function (part) {
                    lasttree = subtree;
                    lastpart = part;
                    subtree = subtree[part];
                });

                if (subtree !== newValues[key]) {
                    console.log("lens.set", newValues[key]);
                    lasttree[lastpart] = newValues[key];
                } else {
                    console.log("lens.set unnecessary");
                }
            });
        };
        return lens;
    }

    const appLens = compile(appLensDef);

    console.log("before", App(appLens(state)));
    appLens.set(state, { who: "Universe" });
    //localStorage.setItem("app.state", JSON.stringify(state));

    console.log("after", App(appLens(state)));
    appLens.set(state, { who: "Universe" });
});
