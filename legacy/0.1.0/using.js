(function (window, factory) {

    window["using"] = factory(window, "0.1.0");

}(typeof window === "undefined" ? self : window, (window, version) => {

    const Base = {
        extension: () => {},
    };

    Base.extension("base/browser@0.1.0", () => {
        if (typeof module !== "undefined" && module.exports) {
            return null;
        }

        // ... pull common polyfills?

        return {
            document,
            window,
        };
    });
    Base.extension("base/nodejs@0.1.0", () => {
        // ...
    });

    const Core = {
        extension: () => {},
    };

    Core.extension("core/fetch@0.1.0", ({ window }) => {
        // ... pull in the polyfill?
        return function fetch(url, options) {
            return window.fetch(url, options);
        };
    });

    Core.extension("core/websocket@0.1.0", ({ window }) => {
        // ... pull in the polyfill?
        return function WebSocket() {
            // ...
        };
    });

    Core.extension("core/bus@0.1.0", ({ window }) => ({
        send: (topic, data = {}) => {
        },
        subscribe: (topic, options = {}) => {
        },
    }));

    function using(name, coreDeps, factory) {
    }
    using.Base = Base;
    using.Core = Core;
    using.toString = function () {
        return `You're running "using@${version}"`;
    };
    using.version = version;

    return using;
}));