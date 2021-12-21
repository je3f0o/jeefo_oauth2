/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : invalid_request.js
* Created at  : 2020-11-10
* Updated at  : 2021-04-15
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

const description = `
The request is missing a required parameter, includes an
invalid parameter value, includes a parameter more than
once, or is otherwise malformed.
`.split('\n').map(l => l.trim()).filter(Boolean).join(' ');

class InvalidRequest extends IOAuth2Error {
    constructor (message = description) {
        super(400, "invalid_request", message);
    }
}

module.exports = InvalidRequest;
