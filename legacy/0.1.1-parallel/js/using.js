
function using() {
}

using.store = function store(state) {
    return {
        subscribe: function subscribe() {
        },
    };
};

using.connect = function connect(View, lens) {
    return function (state) {
        return View(lens(state));
    };
};

using.render = function render(it) {
    return it;
};

using.lens = function lens(def) {

    function get(state) {
        const projection = {};
        Object.keys(def).forEach(function (key) {
            let subTree = state;
            def[key].forEach(function (part) {
                subTree = subTree[part];
            });
            projection[key] = subTree;
        });
        return projection;
    }

    get.set = function set(values, state) {
        Object.keys(values).forEach(function (key) {
            let subTree = state;
            let lastTree = null;
            const path = def[key] || [];
            path.forEach(function (part) {
                lastTree = subTree;
                subTree = subTree[part];
            });

            lastTree[path[path.length - 1]] = values[key];
        });
    };

    return get;
};

