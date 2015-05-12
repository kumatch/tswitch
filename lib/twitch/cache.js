
module.exports = function (lifetime) {
    var _caches = {};

    lifetime = lifetime || 60 * 1000 * 10;

    return {
        set: function (name, value) {
            var now = Date.now();

            _caches[name] = {
                _time: now,
                _value: value
            };
        },

        get: function (name) {
            if (typeof _caches[name] === "undefined") {
                return undefined;
            }

            var now = Date.now();
            if (_caches[name]._time + lifetime < now) {
                return undefined;
            } else {
                return _caches[name]._value;
            }
        }
    };
};
