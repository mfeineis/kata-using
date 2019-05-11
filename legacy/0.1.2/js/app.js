define(["using"], function (using) {

    function View(props) {
        return ["b", "Hello, ", props.who, "! (", props.apiKey, ")"];
    }

    const lens = {
        apiKey: ["config", "apiKey"],
        who: ["who"],
    };

    return function App() {
        return using(View, lens, {
            config: {
                apiKey: "xyz314159265",
            },
            who: "World",
        });
    };
});
