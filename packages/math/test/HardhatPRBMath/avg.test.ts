import type { BigNumber } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";
import { expect } from "earljs";
import fp from "evm-fp";
import forEach from "mocha-each";

export function shouldBehaveLikeAvg(): void {
  context("when both operands are zero", function () {
    it("returns 0", function () {
      const x: BigNumber = Zero;
      const y: BigNumber = Zero;
      const expected: BigNumber = Zero;
      expect(expected).toEqual(this.hre.prb.math.avg(x, y));
    });
  });

  context("when one operand is zero and the other is not zero", function () {
    const testSets = [
      [fp("-3"), fp("0"), fp("-1.5")],
      [fp("0"), fp("-3"), fp("-1.5")],
      [fp("0"), fp("3"), fp("1.5")],
      [fp("3"), fp("0"), fp("1.5")],
    ];

    forEach(testSets).it("takes %e and %e and returns %e", function (x: BigNumber, y: BigNumber, expected: BigNumber) {
      expect(expected).toEqual(this.hre.prb.math.avg(x, y));
    });
  });

  context("when one operand is negative and the other is positive", function () {
    const testSets = [
      [fp("-4"), fp("4"), fp("0")],
      [fp("-2"), fp("8"), fp("3")],
      [fp("4"), fp("-4"), fp("0")],
      [fp("8"), fp("-2"), fp("3")],
    ];

    forEach(testSets).it("takes %e and %e and returns %e", function (x: BigNumber, y: BigNumber, expected: BigNumber) {
      expect(expected).toEqual(this.hre.prb.math.avg(x, y));
    });
  });

  context("when both operands are negative", function () {
    const testSets = [
      [fp("-100"), fp("-200"), fp("-150")],
      [fp("-4"), fp("-8"), fp("-6")],
      [fp("-1"), fp("-2"), fp("-1.5")],
      [fp("-1"), fp("-1"), fp("-1")],
    ];

    forEach(testSets).it("takes %e and %e and returns %e", function (x: BigNumber, y: BigNumber, expected: BigNumber) {
      expect(expected).toEqual(this.hre.prb.math.avg(x, y));
    });
  });

  context("when both operands are positive", function () {
    context("when both operands are odd", function () {
      const testSets = [
        [fp("1e-18"), fp("1e-18"), fp("1e-18")],
        [fp("3e-18"), fp("7e-18"), fp("5e-18")],
        [fp("99e-18"), fp("199e-18"), fp("149e-18")],
      ];

      forEach(testSets).it(
        "takes %e and %e and returns %e",
        function (x: BigNumber, y: BigNumber, expected: BigNumber) {
          expect(expected).toEqual(this.hre.prb.math.avg(x, y));
        },
      );
    });

    context("when both operands are even", function () {
      const testSets = [
        [fp("2"), fp("2"), fp("2")],
        [fp("4"), fp("8"), fp("6")],
        [fp("100"), fp("200"), fp("150")],
      ];

      forEach(testSets).it(
        "takes %e and %e and returns %e",
        function (x: BigNumber, y: BigNumber, expected: BigNumber) {
          expect(expected).toEqual(this.hre.prb.math.avg(x, y));
        },
      );
    });

    context("when one operand is even and the other is odd", function () {
      const testSets = [
        [fp("1e-18"), fp("2e-18"), fp("1e-18")],
        [fp("3e-18"), fp("8e-18"), fp("5e-18")],
        [fp("99e-18"), fp("200e-18"), fp("149e-18")],
      ];

      forEach(testSets).it(
        "takes %e and %e and returns %e",
        function (x: BigNumber, y: BigNumber, expected: BigNumber) {
          expect(expected).toEqual(this.hre.prb.math.avg(x, y));
        },
      );
    });
  });
}
