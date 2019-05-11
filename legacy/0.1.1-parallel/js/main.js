/* global using */

function View(props) {
    return [
        "button", { onClick: ["sayhello"] },
        "Hello, ", props.who, "! (", props.apiKey, ")",
    ];
}

const state = {
    config: {
        apiKey: "key12345",
    },
    who: "World",
};

const lens = using.lens({
    apiKey: ["config", "apiKey"],
    who: ["who"],
});

const App = using.connect(View, lens);

console.log("before", using.render(App(state)));

lens.set({
    apiKey: "newApiKey",
    who: "Universe",
}, state);

console.log("after", using.render(App(state)));

using.render(using.store(), [App], document.querySelector("#root"));

