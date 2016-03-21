///<reference path="../typings/main.d.ts"/>

import sayHello from '../src/index';
import * as assert from 'assert';

describe("sayHello", ()=> {
    it("should return Hello!", ()=> {
        assert.equal(sayHello(), "Hello!");
    });
});
