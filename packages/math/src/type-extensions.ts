import "hardhat/types/runtime";

import type { HardhatPRBMath } from "./HardhatPRBMath";

declare module "decimal.js" {
  interface Decimal {
    toFixedWithNoTrailingZeros(): string;
  }
}

declare module "hardhat/types/runtime" {
  export interface HardhatRuntimeEnvironment {
    prb: {
      math: HardhatPRBMath;
    };
  }
}
