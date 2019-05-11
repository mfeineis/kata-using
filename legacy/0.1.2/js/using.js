define([], function () {
    "use strict";

    const freeze = Object.freeze;
    const slice = [].slice;

    function forEachKey(it, next) {
        Object.keys(it).forEach(next);
    }

    function clone(it) {
        return JSON.parse(JSON.stringify(it));
    }

    function trace() {
        console.log.apply(console, ['----<TRACE>-'].concat(slice.call(arguments)));
    }

    function compile(def) {

        function lens(state) {
            const projection = {};
            forEachKey(def, function (key) {
                const root = def[key];
                if (!root) {
                    return;
                }
                let value = state;
                let deadEnd = false;
                root.forEach(function (part) {
                    if (!value) {
                        deadEnd = true;
                        return;
                    }
                    value = value[part];
                });
                if (deadEnd) {
                    return;
                }
                if (value === undefined) {
                    return;
                }
                projection[key] = value;
            });
            return projection;
        }

        lens.mutate = function mutate(state, newValues) {
            const patches = {};
            forEachKey(newValues, function (key) {
                let lasttree = null;
                let lastpart = null;
                let subtree = state;

                const path = def[key] || [];

                path.forEach(function (part) {
                    lasttree = subtree;
                    lastpart = part;
                    subtree = subtree[part];
                });

                if (lastpart === null) {
                    return;
                }

                patches[path.join(".")] = 1;

                if (subtree !== newValues[key]) {
                    //trace("lens.set", newValues[key]);
                    lasttree[lastpart] = newValues[key];
                } else {
                    //trace("lens.set unnecessary");
                }
            });
            return patches;
        };

        const myPatches = {};
        forEachKey(def, function (key) {
            myPatches[def[key].join(".")] = 1;
        });

        lens.sees = function sees(patches) {
            //trace("lens.sees", patches, "? <- mine", myPatches);
            const patchKeys = Object.keys(patches);
            const len = patchKeys.length;
            for (let i = 0; i < len; i += 1) {
                if (myPatches[patchKeys[i]]) {
                    return true;
                }
            }
            return false;
        };

        return freeze(lens);
    }

    function focus(View, lens) {
        const compiledLens = compile(lens);

        function view(state) {
            return View(compiledLens(state));
        }

        view.mutate = compiledLens.mutate;

        view.sees = compiledLens.sees;

        return freeze(view);
    }

    function weave(View, state) {
        state = clone(state || {});
        const listeners = [];

        function v() {
            return View(state);
        }
        v.lens = View;

        v.listen = function listen(lensed, next) {
            listeners.push({
                next: next,
                sees: lensed.sees,
            });
        };

        v.over = function over(lensed, value) {
            //trace("over", value);
            const patches = lensed.mutate(state, value);
            //trace("over", value, "->", patches);

            listeners.forEach(function (it) {
                //trace("checking if lens sees", value, "?", it.sees(state, value));
                if (it.sees(patches)) {
                    it.next(state);
                }
            });
        };

        return freeze(v);
    }

    function using(View, lens, initialState) {
        return weave(focus(View, lens), initialState);
    }

    using.focus = focus;
    using.trace = trace;
    using.weave = weave;

    return freeze(using);
});
