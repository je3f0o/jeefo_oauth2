/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : implementation_error.js
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

const IOAuth2Error = require("./i_oauth_error");

class ImplementationError extends IOAuth2Error {
    constructor (message = "Please contact your developer.") {
        super(500, "implementation_error", message);
    }
}

module.exports = ImplementationError;
