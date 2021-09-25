import { expect } from "earljs";
import forEach from "mocha-each";

import { EPSILON } from "../shared/constants";

export function shouldBehaveLikeExp2(): void {
  context("when x is zero", function () {
    it("returns 1", function () {
      const x: string = "0";
      const expected: string = "1";
      expect(expected).toEqual(this.hre.prb.math.exp2(x));
    });
  });

  context("when x is negative", function () {
    const testSets = ["-20.82", "-16", "-11.89215", "-4", "-3.14", "-3", "-2.71", "-2", "-1"];

    forEach(testSets).it("takes %f and returns the correct value", function (x: string) {
      const expected: number = Math.pow(2, Number(x));
      const result: number = Number(this.hre.prb.math.exp2(x));
      expect(expected).toEqual(expect.numberCloseTo(result, { delta: EPSILON }));
    });
  });

  context("when x is positive", function () {
    const testSets = ["1", "2", "2.71", "3", "3.14", "4", "11.89215", "16", "20.82"];

    forEach(testSets).it("takes %f and returns the correct value", function (x: string) {
      const expected: number = Math.pow(2, Number(x));
      const result: number = Number(this.hre.prb.math.exp2(x));
      expect(expected).toEqual(expect.numberCloseTo(result, { delta: EPSILON }));
    });
  });
}
