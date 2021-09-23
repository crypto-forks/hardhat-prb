// import { BigNumber } from "@ethersproject/bignumber";
import { expect } from "earljs";
import forEach from "mocha-each";

// import { bn } from "../shared/helpers";

export function shouldBehaveLikeFrac(): void {
  context("when the input is invalid", function () {
    const testSets = [undefined, null, true, 2.71, { x: 100 }, function () {}];

    forEach(testSets).it("takes %T and throws an error", function (x: any) {
      expect(() => this.hre.prb.math.frac(x)).toThrow(`Invalid input in "frac" method: x: ${x}`);
    });
  });
}
