"use strict";

import cookie from "cookie-cutter";

const BASE_URL = "/api";

export default {
    set(key, value) {
        return cookie.set(key, value);
    },

    get(key) {
        return cookie.get(key);
    }
};
