import { shouldBehaveLikeAvg } from "./HardhatPRBMath/avg.test";
import { shouldBehaveLikeCeil } from "./HardhatPRBMath/ceil.test";
import { shouldBehaveLikeDiv } from "./HardhatPRBMath/div.test";
import { shouldBehaveLikeExp } from "./HardhatPRBMath/exp.test";
import { shouldBehaveLikeExp2 } from "./HardhatPRBMath/exp2.test";
import { shouldBehaveLikeFloor } from "./HardhatPRBMath/floor.test";
import { shouldBehaveLikeFrac } from "./HardhatPRBMath/frac.test";
import { shouldBehaveLikeInv } from "./HardhatPRBMath/inv.test";
import { shouldBehaveLikeMax } from "./HardhatPRBMath/max.test";
import { shouldBehaveLikeMul } from "./HardhatPRBMath/mul.test";
import { useHardhatEnvironment } from "./shared/env";

describe("Hardhat PRBMath", function () {
  useHardhatEnvironment();

  describe("avg", function () {
    shouldBehaveLikeAvg();
  });

  describe("ceil", function () {
    shouldBehaveLikeCeil();
  });

  describe("div", function () {
    shouldBehaveLikeDiv();
  });

  describe("exp", function () {
    shouldBehaveLikeExp();
  });

  describe("exp2", function () {
    shouldBehaveLikeExp2();
  });

  describe("floor", function () {
    shouldBehaveLikeFloor();
  });

  describe("frac", function () {
    shouldBehaveLikeFrac();
  });

  describe("inv", function () {
    shouldBehaveLikeInv();
  });

  describe("max", function () {
    shouldBehaveLikeMax();
  });

  describe("mul", function () {
    shouldBehaveLikeMul();
  });
});
