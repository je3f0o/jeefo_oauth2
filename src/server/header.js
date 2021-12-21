/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : header.js
* Created at  : 2020-11-11
* Updated at  : 2021-04-12
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals*/
/* exported*/

// ignore:end

const is_object = require("@jeefo/utils/is/object");

class OAuth2Header {
    constructor (headers) {
        this.map = new Map();
        if (is_object(headers)) {
            for (const [key, value] of Object.entries(headers)) {
                this.set(key, value);
            }
        }
    }

    get (key)        { return this.map.get(key.toLowerCase()); }
    set (key, value) { this.map.set(key.toLowerCase(), value); }

    entries () { return this.map.entries(); }
}

module.exports = OAuth2Header;
