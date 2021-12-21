/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : response.js
* Created at  : 2020-11-10
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

class OAuth2Response {
    constructor (status = 200, options = {}) {
        this.status  = status;
        this.headers = new Map(options.headers);
        this.body    = null;
    }

    redirect (url) {
        this.headers.set('Location', url);
        this.status = 302;
    }
}

module.exports = OAuth2Response;
