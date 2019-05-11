using("stuff-widget", ["bus", "ui", "ui-dom", "fetch@1.0.0"], (bus, ui, dom, fetch) => {
    const { createElement, define } = dom;
    const { useContext, useState } = ui;

    function EvilContext() {}

    define("my-counter", () => {
        const getEvil = useContext(EvilContext);

        const [getCounter, setCounter] = useState(0);
        const dec = (ev) => setCounter(getCounter() - 1);
        const inc = (ev) => setCounter(getCounter() + 1);
        const reset = (ev) => setCounter(0);

        return (props) => [
            ["button", { class: "btn btn-default", onClick: dec }, "-"],
            ["span", { class: "text-bold" }, `counter: ${getCounter()}`],
            ["button", { class: "btn btn-default", onClick: inc }, "+"],
            ["button", { class: "btn btn-default", onClick: reset }, "(reset)"],
            ["button", { class: "btn btn-default", onClick: getEvil().launch }, "Launch Rockets!"],
        ];
    });

    return (root, config) => {
        const cleanup = () => {};

        fetch("http://example.org/stuff").then((stuff) => {
            console.log("stuff", stuff);
            bus.send("stuff-fetched", stuff);

            const counter = createElement("my-counter", {
                stuff,
            });
            root.appendChild(counter);

        }).catch((error) => {
            console.error(error);
            cleanup();
        });

        return cleanup;
    };
});