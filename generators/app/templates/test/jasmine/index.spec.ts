///<reference path="../typings/main.d.ts"/>

import sayHello from '../src/index';

describe("sayHello", ()=> {
    it("should return Hello!", ()=> {
        expect(sayHello()).toBe("Hello!");
    });
});
