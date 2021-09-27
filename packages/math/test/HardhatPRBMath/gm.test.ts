import type { BigNumber } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";
import fp from "evm-fp";
import { expect } from "earljs";
import forEach from "mocha-each";
import { EPSILON } from "../shared/constants";

export function shouldBehaveLikeGm(): void {
  context("when one of the operands is zero", function () {
    const testSets = [
      [Zero, fp("3.14")],
      [fp("3.14"), Zero],
    ];

    forEach(testSets).it("takes %e and %e and returns 0", function (x: BigNumber, y: BigNumber) {
      const expected: BigNumber = Zero;
      expect(expected).toEqual(this.hre.prb.math.gm(x, y));
    });
  });

  context("when neither of the operands is zero", function () {
    context("when the product of x and y is negative", function () {
      const testSets = [
        [fp("-7.1"), fp("20.05")],
        [fp("-1"), fp("3.14")],
        [fp("3.14"), fp("-1")],
        [fp("7.1"), fp("-20.05")],
      ];

      forEach(testSets).it("takes %e and %e and throws an error", function (x: BigNumber, y: BigNumber) {
        expect(() => this.hre.prb.math.gm(x, y)).toThrow(
          "PRBMath cannot calculate the geometric mean of a negative number",
        );
      });
    });

    context("when the product of x and y is positive", function () {
      const testSets = [
        ["-3.14", "-8.2"],
        ["-2.71", "-89.01"],
        ["-2", "-8"],
        ["-1", "-4"],
        ["-1", "-1"],
      ].concat([
        ["1", "1"],
        ["1", "4"],
        ["2", "8"],
        ["2.71", "89.01"],
        ["3.14", "8.2"],
      ]);

      forEach(testSets).it("takes %e and %e and returns the correct value", function (x: string, y: string) {
        const expected: number = Number(fp(String(Math.sqrt(Number(x) * Number(y)))));
        const result: number = Number(this.hre.prb.math.gm(fp(x), fp(y)));
        expect(expected).toEqual(expect.numberCloseTo(result, { delta: EPSILON }));
      });
    });
  });
}
