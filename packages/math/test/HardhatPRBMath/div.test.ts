import type { BigNumber } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";
import { expect } from "earljs";
import forEach from "mocha-each";
import { toBn } from "evm-bn";

export function shouldBehaveLikeDiv(): void {
  context("when the denominator is zero", function () {
    it("throws an error", function () {
      const x: BigNumber = toBn("1");
      const y: BigNumber = Zero;
      expect(() => this.hre.prb.math.div(x, y)).toThrow("Cannot divide by zero");
    });
  });

  context("when the denominator is not zero", function () {
    context("when the numerator is zero", function () {
      const testSets = [toBn("-3.14"), toBn("-1"), toBn("1"), toBn("3.14")];

      forEach(testSets).it("takes %e and returns 0", function (y: BigNumber) {
        const x: BigNumber = Zero;
        const expected: BigNumber = Zero;
        expect(expected).toEqual(this.hre.prb.math.div(x, y));
      });
    });

    context("when the numerator is not zero", function () {
      context("when the numerator and the denominator have the same sign", function () {
        const testSets = [
          ["-100.135", "-100.134"],
          ["-22", "-7"],
          ["-4", "-2"],
          ["-2", "-5"],
          ["-2", "-2"],
          ["-0.1", "-0.01"],
          ["-0.05", "-0.02"],
        ].concat([
          ["0.05", "0.02"],
          ["0.1", "0.01"],
          ["2", "2"],
          ["2", "5"],
          ["4", "2"],
          ["22", "7"],
          ["100.135", "100.134"],
        ]);

        forEach(testSets).it("takes %e and %e and returns the correct value", function (x: string, y: string) {
          const expected: number = Number(toBn(String(Number(x) / Number(y))));
          const result: number = Number(this.hre.prb.math.div(toBn(x), toBn(y)));
          expect(expected).toEqual(expect.numberCloseTo(result, { delta: 1e3 }));
        });
      });

      context("when the numerator and the denominator do not have the same sign", function () {
        const testSets = [
          ["-100.135", "100.134"],
          ["-22", "7"],
          ["-4", "2"],
          ["-2", "5"],
          ["-2", "2"],
          ["-0.1", "0.01"],
          ["-0.05", "0.02"],
        ].concat([
          ["0.05", "-0.02"],
          ["0.1", "-0.01"],
          ["2", "-2"],
          ["2", "-5"],
          ["4", "-2"],
          ["22", "-7"],
          ["100.135", "-100.134"],
        ]);

        forEach(testSets).it("takes %e and %e and returns the correct value", function (x: string, y: string) {
          const expected: number = Number(toBn(String(Number(x) / Number(y))));
          const result: number = Number(this.hre.prb.math.div(toBn(x), toBn(y)));
          expect(expected).toEqual(expect.numberCloseTo(result, { delta: 1e3 }));
        });
      });
    });
  });
}
