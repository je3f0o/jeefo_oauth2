/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : unauthorized.js
* Created at  : 2020-11-10
* Updated at  : 2020-11-11
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

const IOAuth2Error = require("./i_oauth_error");

const get_error_type = v => v ? "unauthorized_client" : null;

class Unauthorized extends IOAuth2Error {
    constructor (message = null) {
        super(401, get_error_type(message), message);
    }
}

module.exports = Unauthorized;
