/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : i_storage.js
* Created at  : 2021-04-13
* Updated at  : 2021-04-13
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

const Interface      = require("@jeefo/utils/class/interface");
const virtual_method = require("@jeefo/utils/class/virtual_method");

class IOAuth2Storage extends Interface {
    constructor () {
        super(IOAuth2Storage);

        const {prototype} = IOAuth2Storage;
        const methods = [
            "get_user",
            "get_client",
            "get_token",
            "store_token",
            "update_token",
            "get_authorization_code",
            "store_authorization_code",
            "revoke_authorization_code",
        ];

        for (const method of methods) {
            if (this[method] === prototype[method]) this[method]();
        }
    }

    get_user                  () { virtual_method(); }
    get_client                () { virtual_method(); }
    get_token                 () { virtual_method(); }
    store_token               () { virtual_method(); }
    update_token              () { virtual_method(); }
    get_authorization_code    () { virtual_method(); }
    store_authorization_code  () { virtual_method(); }
    revoke_authorization_code () { virtual_method(); }
}

module.exports = IOAuth2Storage;
