/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : invalid_argument.js
* Created at  : 2020-11-14
* Updated at  : 2020-11-15
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

const op = is_instance => is_instance ? "instanceof" : "typeof";

class InvalidArgumnet extends TypeError {
    constructor (name, param, target, is_instance) {
        super(`Invalid argument in \`${name}(${param})\` is not ${
            op(is_instance)
        } ${target}`);
    }
}

module.exports = InvalidArgumnet;
