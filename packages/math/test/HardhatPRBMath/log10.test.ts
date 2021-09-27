import type { BigNumber } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";
import { expect } from "earljs";
import fp from "evm-fp";
import forEach from "mocha-each";

import { EPSILON } from "../shared/constants";

export function shouldBehaveLikeLog10(): void {
  context("when x is zero", function () {
    it("throws an error", function () {
      const x: BigNumber = Zero;
      expect(() => this.hre.prb.math.log10(x)).toThrow("Cannot calculate the common logarithm of zero");
    });
  });

  context("when x is not zero", function () {
    context("when x is negative", function () {
      it("throws an error", function () {
        const x: BigNumber = fp("-1");
        expect(() => this.hre.prb.math.log10(x)).toThrow("Cannot calculate the common logarithm of a negative number");
      });

      context("when x is positive", function () {
        const testSets = [
          "0.1",
          "0.2",
          "0.3",
          "0.4",
          "0.5",
          "0.6",
          "0.7",
          "0.8",
          "0.9",
          "1",
          "1.125",
          "2",
          "2.71",
          "3.14",
          "4",
          "8",
        ];

        forEach(testSets).it("takes %f and returns the correct value", function (x: string) {
          const expected: number = Number(fp(String(Math.log10(Number(x)))));
          const result: number = Number(this.hre.prb.math.log10(fp(x)));
          expect(expected).toEqual(expect.numberCloseTo(result, { delta: EPSILON }));
        });
      });
    });
  });
}
