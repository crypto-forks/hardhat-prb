import { BigNumber } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";
import { expect } from "earljs";
import fp from "evm-fp";
import forEach from "mocha-each";

import { bn } from "../shared/helpers";

export function shouldBehaveLikeAvg(): void {
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
      expect(() => this.hre.prb.math.avg(x, y)).toThrow(`Invalid inputs in "avg" method: x: ${x}, y: ${y}`);
    });
  });

  context("when both operands are zero", function () {
    it("returns 0", async function () {
      const expected: BigNumber = Zero;
      expect(expected).toEqual(this.hre.prb.math.avg(Zero, Zero));
      expect(expected).toEqual(this.hre.prb.math.avg("0", "0"));
    });
  });

  context("when one operand is zero and the other is not zero", function () {
    const testSets = [
      ["-3", "0", fp("-1.5")],
      ["-3e-18", "0", fp("-1e-18")],
      ["0", "-3", fp("-1.5")],
      ["0", "-3e-18", fp("-1e-18")],
      ["0", "3e-18", fp("1e-18")],
      ["0", "3", fp("1.5")],
      ["3e-18", "0", fp("1e-18")],
      ["3", "0", fp("1.5")],
    ];

    forEach(testSets).it.only(
      "takes %f and %f and returns the correct value",
      function (x: string, y: string, expected: BigNumber) {
        expect(expected).toEqual(this.hre.prb.math.avg(x, y));
        expect(expected).toEqual(this.hre.prb.math.avg(fp(x), fp(y)));
      },
    );
  });

  context("when one operand is negative and the other is positive", function () {
    const testSets = [
      ["-4", "4", fp("0")],
      ["-2", "8", fp("3")],
      ["4", "-4", fp("0")],
      ["8", "-2", fp("3")],
    ];

    forEach(testSets).it("takes %f and %f and returns %f", function (x: string, y: string, expected: BigNumber) {
      expect(expected).toEqual(this.hre.prb.math.avg(x, y));
      expect(expected).toEqual(this.hre.prb.math.avg(fp(x), fp(y)));
    });
  });

  context("when both operands are negative", function () {
    const testSets = [
      ["-100", "-200", fp("-150")],
      ["-4", "-8", fp("-6")],
      ["-1", "-2", fp("-1")],
      ["-1", "-1", fp("-1")],
    ];

    forEach(testSets).it("takes %f and %f and returns %f", function (x: string, y: string, expected: BigNumber) {
      expect(expected).toEqual(this.hre.prb.math.avg(x, y));
      expect(expected).toEqual(this.hre.prb.math.avg(fp(x), fp(y)));
    });
  });

  context("when both operands are positive", function () {
    context("when both operands are odd", function () {
      const testSets = [
        [bn("1"), bn("1"), bn("1")],
        [bn("3"), bn("7"), bn("5")],
        [bn("99"), bn("199"), bn("149")],
      ];

      forEach(testSets).it(
        "takes %f and %f and returns %f",
        function (x: BigNumber, y: BigNumber, expected: BigNumber) {
          expect(expected).toEqual(this.hre.prb.math.avg(x, y));
        },
      );
    });

    context("when both operands are even", function () {
      const testSets = [
        [bn("2"), bn("2"), bn("2")],
        [bn("4"), bn("8"), bn("6")],
        [bn("100"), bn("200"), bn("150")],
      ];

      forEach(testSets).it(
        "takes %f and %f and returns %f",
        function (x: BigNumber, y: BigNumber, expected: BigNumber) {
          expect(expected).toEqual(this.hre.prb.math.avg(x, y));
        },
      );
    });

    context("when one operand is even and the other is odd", function () {
      const testSets = [
        [bn("1"), bn("2"), bn("1")],
        [bn("3"), bn("8"), bn("5")],
        [bn("99"), bn("200"), bn("149")],
      ];

      forEach(testSets).it(
        "takes %f and %f and returns %f",
        function (x: BigNumber, y: BigNumber, expected: BigNumber) {
          expect(expected).toEqual(this.hre.prb.math.avg(x, y));
        },
      );
    });
  });

  // context("when the inputs are strings", function () {
  //   context("when both operands are zero", function () {
  //     it("returns 0", async function () {
  //       const x: string = "0";
  //       const y: string = "0";
  //       const expected: string = "0";
  //       expect(expected).toEqual(this.hre.prb.math.avg(x, y));
  //     });
  //   });

  //   context("when one operand is zero and the other is not zero", function () {
  //     const testSets = [
  //       ["-3", "0", "-1.5"],
  //       ["0", "-3", "-1.5"],
  //       ["0", "3", "1.5"],
  //       ["3", "0", "1.5"],
  //     ];

  //     forEach(testSets).it("takes %f and %f and returns %f", function (x: string, y: string, expected: string) {
  //       expect(expected).toEqual(this.hre.prb.math.avg(x, y));
  //     });
  //   });

  //   context("when one operand is negative and the other is positive", function () {
  //     const testSets = [
  //       ["-4", "4", "0"],
  //       ["-2", "8", "3"],
  //       ["4", "-4", "0"],
  //       ["8", "-2", "3"],
  //     ];

  //     forEach(testSets).it("takes %f and %f and returns %f", function (x: string, y: string, expected: string) {
  //       expect(expected).toEqual(this.hre.prb.math.avg(x, y));
  //     });
  //   });

  //   context("when both operands are negative", function () {
  //     const testSets = [
  //       ["-100", "-200", "-150"],
  //       ["-4", "-8", "-6"],
  //       ["-1", "-1", "-1"],
  //       ["-1", "-2", "-1.5"],
  //     ];

  //     forEach(testSets).it("takes %f and %f and returns %f", function (x: string, y: string, expected: string) {
  //       expect(expected).toEqual(this.hre.prb.math.avg(x, y));
  //     });
  //   });

  //   context("when both operands are positive", function () {
  //     context("when both operands are odd", function () {
  //       const testSets = [
  //         ["1", "1", "1"],
  //         ["3", "7", "5"],
  //         ["99", "199", "149"],
  //       ];

  //       forEach(testSets).it("takes %f and %f and returns %f", function (x: string, y: string, expected: string) {
  //         expect(expected).toEqual(this.hre.prb.math.avg(x, y));
  //       });
  //     });

  //     context("when both operands are even", function () {
  //       const testSets = [
  //         ["2", "2", "2"],
  //         ["4", "8", "6"],
  //         ["100", "200", "150"],
  //       ];

  //       forEach(testSets).it(
  //         "takes %f and %f and returns the correct value",
  //         async function (x: string, y: string, expected: string) {
  //           expect(expected).toEqual(this.hre.prb.math.avg(x, y));
  //         },
  //       );
  //     });

  //     context("when one operand is even and the other is odd", function () {
  //       const testSets = [
  //         ["1", "2", "1.5"],
  //         ["3", "8", "5.5"],
  //         ["99", "200", "149.5"],
  //       ];

  //       forEach(testSets).it("takes %f and %f and returns %f", async function (x: string, y: string, expected: string) {
  //         expect(expected).toEqual(this.hre.prb.math.avg(x, y));
  //       });
  //     });
  //   });
  // });
}
