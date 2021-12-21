/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : invalid_grant.js
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

const description = `
The provided authorization grant (e.g., authorization
code, resource owner credentials) or refresh token is
invalid, expired, revoked, does not match the redirection
URI used in the authorization request, or was issued to
another client.
`.split('\n').map(l => l.trim()).filter(Boolean).join(' ');

class InvalidGrant extends IOAuth2Error {
    constructor () {
        super(400, "invalid_grant", description);
    }
}

module.exports = InvalidGrant;
