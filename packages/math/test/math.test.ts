import { shouldBehaveLikeAvg } from "./math/avg.test";
import { shouldBehaveLikeCeil } from "./math/ceil.test";
import { shouldBehaveLikeDiv } from "./math/div.test";
import { shouldBehaveLikeFloor } from "./math/floor.test";
import { shouldBehaveLikeFrac } from "./math/frac.test";
import { shouldBehaveLikeInv } from "./math/inv.test";
import { shouldBehaveLikeMax } from "./math/max.test";
import { shouldBehaveLikeMul } from "./math/mul.test";
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
