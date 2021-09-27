import type { BigNumber } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";
import { expect } from "earljs";
import fp from "evm-fp";
import forEach from "mocha-each";

export function shouldBehaveLikeFrac(): void {
  context("when x is zero", function () {
    it("returns 0", function () {
      const x: BigNumber = Zero;
      const expected: BigNumber = Zero;
      expect(expected).toEqual(this.hre.prb.math.frac(x));
    });
  });

  context("when x is not zero", function () {
    context("when x is negative", function () {
      const testSets = [
        [fp("-4.2"), fp("-0.2")],
        [fp("-3.14"), fp("-0.14")],
        [fp("-2"), Zero],
        [fp("-1.125"), fp("-0.125")],
        [fp("-1"), Zero],
        [fp("-0.5"), fp("-0.5")],
        [fp("-0.1"), fp("-0.1")],
      ];

      forEach(testSets).it("takes %e and returns %e", function (x: BigNumber, expected: BigNumber) {
        expect(expected).toEqual(this.hre.prb.math.frac(x));
      });
    });

    context("when x is positive", function () {
      const testSets = [
        [fp("0.1"), fp("0.1")],
        [fp("0.5"), fp("0.5")],
        [fp("1"), Zero],
        [fp("1.125"), fp("0.125")],
        [fp("2"), Zero],
        [fp("3.14"), fp("0.14")],
        [fp("4.2"), fp("0.2")],
      ];

      forEach(testSets).it("takes %e and returns %e", function (x: BigNumber, expected: BigNumber) {
        expect(expected).toEqual(this.hre.prb.math.frac(x));
      });
    });
  });
}
