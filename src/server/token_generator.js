/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : token_generator.js
* Created at  : 2021-04-14
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

const {randomBytes} = require("crypto");

const SEED = [
    "abcdefghijklmnopqrstuvwxyz",
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "0123456789",
    "!@^*-_+.?;~",
].join('');
const SEED_LENGTH    = SEED.length;
const DEFAULT_LENGTH = 64;

module.exports = (options = {}) => {
    if (options.generator) return options.generator;

    const length = options.length || DEFAULT_LENGTH;
    return () => {
        let result  = '';
        for (let i of randomBytes(length)) {
            i = i % SEED_LENGTH;
            result += SEED[i];
        }
        return result;
    };
};
