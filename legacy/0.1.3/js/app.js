define(["using"], function (using) {

    function SubView(props) {
        return ["i", props.where];
    }

    const Sub = using.focus(SubView, {
        where: ["episodes", "sozen"],
    });

    function MainView(props) {
        return ["b", "Hello, ", props.who, "! (", props.apiKey, ")"];//, [Sub]];
    }

    const Main = using.focus(MainView, {
        apiKey: ["config", "apiKey"],
        who: ["who"],
    });

    return function App() {
        return using.weave(Main, {
            config: {
                apiKey: "xyz314159265",
            },
            episodes: {
                sozen: "Sozen's Comet'",
            },
            who: "World",
        });
    };
});
