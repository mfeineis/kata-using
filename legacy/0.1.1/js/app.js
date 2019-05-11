
define([], function () {

    function App(props) {
        console.log("App", "props", props);
        return ["b", "Hello, ", props.who, "! (", props.apiKey, ")"];
    }

    return App;
});
