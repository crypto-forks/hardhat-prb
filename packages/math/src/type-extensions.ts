import "hardhat/types/runtime";

import type { BigNumber } from "@ethersproject/bignumber";
import type { BigNumber as MathjsBigNumber } from "mathjs";

import type { HardhatPRBMath } from "./HardhatPRBMath";

declare module "@ethersproject/bignumber" {
  interface BigNumber {
    toMbn(): MathjsBigNumber;
  }
}

declare module "decimal.js" {
  interface Decimal {
    toFp(): BigNumber;
  }
}

declare module "hardhat/types/runtime" {
  export interface HardhatRuntimeEnvironment {
    prb: {
      math: HardhatPRBMath;
    };
  }
}
