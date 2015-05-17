"use strict";

export default (lifetime = 60 * 1000 * 10) => {
    let _caches = new WeakMap();

    return {
        set: (key, value) => {
            let now = Date.now();

            _caches[key] = {
                _time: now,
                _value: value
            };
        },

        get: (key) => {
            if (typeof _caches[key] === "undefined") {
                return undefined;
            }

            let now = Date.now();

            if (_caches[key]._time + lifetime < now) {
                return undefined;
            } else {
                return _caches[key]._value;
            }
        }
    };
};
