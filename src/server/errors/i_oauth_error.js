/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : i_oauth_error.js
* Created at  : 2020-11-10
* Updated at  : 2020-11-10
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

const Interface = require("@jeefo/utils/class/interface");

class IOAuth2Error extends Interface {
    constructor (status, error, error_description) {
        super(IOAuth2Error);

        this.status  = status;
        this.body    = error ? {error, error_description} : null;
        this.headers = new Map();
    }
}

module.exports = IOAuth2Error;
