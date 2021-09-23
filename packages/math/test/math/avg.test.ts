import { BigNumber } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";
import { expect } from "earljs";
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

  context("when the inputs are big numbers", function () {
    context("when both operands are zero", function () {
      it("returns 0", async function () {
        const x: BigNumber = Zero;
        const y: BigNumber = Zero;
        const expected: BigNumber = Zero;
        expect(expected).toEqual(this.hre.prb.math.avg(x, y));
      });
    });

    context("when one operand is zero and the other is not zero", function () {
      const testSets = [
        [bn("-3"), bn("0"), bn("-1")],
        [bn("0"), bn("-3"), bn("-1")],
        [bn("0"), bn("3"), bn("1")],
        [bn("3"), bn("0"), bn("1")],
      ];

      forEach(testSets).it("takes %d and %d and returns %d", function (x: string, y: string, expected: string) {
        expect(expected).toEqual(this.hre.prb.math.avg(x, y));
      });
    });

    context("when one operand is negative and the other is positive", function () {
      const testSets = [
        [bn("-4"), bn("4"), bn("0")],
        [bn("-2"), bn("8"), bn("3")],
        [bn("4"), bn("-4"), bn("0")],
        [bn("8"), bn("-2"), bn("3")],
      ];

      forEach(testSets).it("takes %d and %d and returns %d", function (x: string, y: string, expected: string) {
        expect(expected).toEqual(this.hre.prb.math.avg(x, y));
      });
    });

    context("when both operands are negative", function () {
      const testSets = [
        [bn("-100"), bn("-200"), bn("-150")],
        [bn("-4"), bn("-8"), bn("-6")],
        [bn("-1"), bn("-2"), bn("-1")],
        [bn("-1"), bn("-1"), bn("-1")],
      ];

      forEach(testSets).it(
        "takes %d and %d and returns %d",
        function (x: BigNumber, y: BigNumber, expected: BigNumber) {
          expect(expected).toEqual(this.hre.prb.math.avg(x, y));
        },
      );
    });

    context("when both operands are positive", function () {
      context("when both operands are odd", function () {
        const testSets = [
          [bn("1"), bn("1"), bn("1")],
          [bn("3"), bn("7"), bn("5")],
          [bn("99"), bn("199"), bn("149")],
        ];

        forEach(testSets).it(
          "takes %d and %d and returns %d",
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
          "takes %d and %d and returns %d",
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
          "takes %d and %d and returns %d",
          function (x: BigNumber, y: BigNumber, expected: BigNumber) {
            expect(expected).toEqual(this.hre.prb.math.avg(x, y));
          },
        );
      });
    });
  });

  context("when the inputs are strings", function () {
    context("when both operands are zero", function () {
      it("returns 0", async function () {
        const x: string = "0";
        const y: string = "0";
        const expected: string = "0";
        expect(expected).toEqual(this.hre.prb.math.avg(x, y));
      });
    });

    context("when one operand is zero and the other is not zero", function () {
      const testSets = [
        ["-3", "0", "-1.5"],
        ["0", "-3", "-1.5"],
        ["0", "3", "1.5"],
        ["3", "0", "1.5"],
      ];

      forEach(testSets).it("takes %d and %d and returns %d", function (x: string, y: string, expected: string) {
        expect(expected).toEqual(this.hre.prb.math.avg(x, y));
      });
    });

    context("when one operand is negative and the other is positive", function () {
      const testSets = [
        ["-4", "4", "0"],
        ["-2", "8", "3"],
        ["4", "-4", "0"],
        ["8", "-2", "3"],
      ];

      forEach(testSets).it("takes %d and %d and returns %d", function (x: string, y: string, expected: string) {
        expect(expected).toEqual(this.hre.prb.math.avg(x, y));
      });
    });

    context("when both operands are negative", function () {
      const testSets = [
        ["-1e-18", "-3e-18", "-2e-18"],
        ["-100", "-200", "-150"],
        ["-4", "-8", "-6"],
        ["-1", "-1", "-1"],
        ["-1", "-2", "-1.5"],
      ];

      forEach(testSets).it("takes %d and %d and returns %d", function (x: string, y: string, expected: string) {
        expect(expected).toEqual(this.hre.prb.math.avg(x, y));
      });
    });

    context("when both operands are positive", function () {
      context("when both operands are odd", function () {
        const testSets = [
          ["1", "1", "1"],
          ["3", "7", "5"],
          ["99", "199", "149"],
        ];

        forEach(testSets).it("takes %d and %d and returns %d", function (x: string, y: string, expected: string) {
          expect(expected).toEqual(this.hre.prb.math.avg(x, y));
        });
      });

      context("when both operands are even", function () {
        const testSets = [
          ["2", "2", "2"],
          ["4", "8", "6"],
          ["100", "200", "150"],
        ];

        forEach(testSets).it(
          "takes %e and %e and returns the correct value",
          async function (x: string, y: string, expected: string) {
            expect(expected).toEqual(this.hre.prb.math.avg(x, y));
          },
        );
      });

      context("when one operand is even and the other is odd", function () {
        const testSets = [
          ["1", "2", "1.5"],
          ["3", "8", "5.5"],
          ["99", "200", "149.5"],
        ];

        forEach(testSets).it("takes %d and %d and returns %d", async function (x: string, y: string, expected: string) {
          expect(expected).toEqual(this.hre.prb.math.avg(x, y));
        });
      });
    });
  });
}
