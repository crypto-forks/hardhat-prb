import { BigNumber } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";
import { expect } from "earljs";
import forEach from "mocha-each";

import { bn } from "../shared/helpers";

export function shouldBehaveLikeDiv(): void {
  context("when the inputs are invalid", function () {
    const testSets = [
      [Zero, "0"],
      [undefined, undefined],
      [null, null],
      [true, false],
      [2.71, 3.14],
      [{ x: 100 }, { y: 200 }],
      [function () {}, function () {}],
    ];

    forEach(testSets).it("takes two %Ts and throws an error", function (x: any, y: any) {
      expect(() => this.hre.prb.math.div(x, y)).toThrow(`Invalid inputs in "div" method: x: ${x}, y: ${y}`);
    });
  });
}
