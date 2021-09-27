/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BigNumber } from "@ethersproject/bignumber";
import { Decimal } from "decimal.js";
import { toBn } from "evm-bn";
import { HardhatPluginError } from "hardhat/plugins";
import { BigNumber as MathjsBigNumber } from "mathjs";
import {
  addDependencies,
  bignumberDependencies,
  ceilDependencies,
  create,
  expDependencies,
  floorDependencies,
  log10Dependencies,
  log2Dependencies,
  logDependencies,
  meanDependencies,
  modDependencies,
  powDependencies,
  sqrtDependencies,
} from "mathjs";

import { DECIMALS, PLUGIN_NAME, SCALE } from "./constants";

const math = create(
  {
    addDependencies,
    bignumberDependencies,
    ceilDependencies,
    expDependencies,
    floorDependencies,
    logDependencies,
    log10Dependencies,
    log2Dependencies,
    meanDependencies,
    modDependencies,
    powDependencies,
    sqrtDependencies,
  },
  {
    number: "BigNumber",
    precision: 78,
  },
);

BigNumber.prototype.toMbn = function () {
  return math.bignumber!(String(this)).div(String(SCALE));
};

Decimal.prototype.toFp = function () {
  const fixed = this.toFixed(Number(DECIMALS), Decimal.ROUND_DOWN);
  return toBn(fixed);
};

export class HardhatPRBMath {
  public avg(x: BigNumber, y: BigNumber): BigNumber {
    const result = math.mean!(x.toMbn(), y.toMbn()) as MathjsBigNumber;
    return result.toFp();
  }

  public ceil(x: BigNumber): BigNumber {
    const result: MathjsBigNumber = x.toMbn().ceil();
    return result.toFp();
  }

  public div(x: BigNumber, y: BigNumber): BigNumber {
    if (y.isZero()) {
      throw new HardhatPluginError(PLUGIN_NAME, "Cannot divide by zero");
    }
    const result: MathjsBigNumber = x.toMbn().div(y.toMbn());
    return result.toFp();
  }

  public exp(x: BigNumber): BigNumber {
    const result: MathjsBigNumber = x.toMbn().exp();
    return result.toFp();
  }

  public exp2(x: BigNumber): BigNumber {
    const two: MathjsBigNumber = math.bignumber!("2");
    const result = <MathjsBigNumber>math.pow!(two, x.toMbn());
    return result.toFp();
  }

  public floor(x: BigNumber): BigNumber {
    const result: MathjsBigNumber = x.toMbn().floor();
    return result.toFp();
  }

  public frac(x: BigNumber): BigNumber {
    return this.solidityMod(x, SCALE);
  }

  public gm(x: BigNumber, y: BigNumber): BigNumber {
    const xy: MathjsBigNumber = x.toMbn().mul(y.toMbn());
    if (xy.isNegative()) {
      throw new HardhatPluginError(PLUGIN_NAME, "PRBMath cannot calculate the geometric mean of a negative number");
    }
    const result = math.sqrt!(xy) as MathjsBigNumber;
    return result.toFp();
  }

  public inv(x: BigNumber): BigNumber {
    if (x.isZero()) {
      throw new HardhatPluginError(PLUGIN_NAME, "Cannot calculate the inverse of zero");
    }
    const one: MathjsBigNumber = math.bignumber!("1");
    const result: MathjsBigNumber = one.div(x.toMbn());
    return result.toFp();
  }

  public ln(x: BigNumber): BigNumber {
    if (x.isZero()) {
      throw new HardhatPluginError(PLUGIN_NAME, "Cannot calculate the natural logarithm of zero");
    } else if (x.isNegative()) {
      throw new HardhatPluginError(PLUGIN_NAME, "Cannot calculate the natural logarithm of a negative number");
    }
    const result = math.log!(x.toMbn()) as MathjsBigNumber;
    return result.toFp();
  }

  public log10(x: BigNumber): BigNumber {
    if (x.isZero()) {
      throw new HardhatPluginError(PLUGIN_NAME, "Cannot calculate the common logarithm of zero");
    } else if (x.isNegative()) {
      throw new HardhatPluginError(PLUGIN_NAME, "Cannot calculate the common logarithm of a negative number");
    }
    const result = math.log10!(x.toMbn()) as MathjsBigNumber;
    return result.toFp();
  }

  public log2(x: BigNumber): BigNumber {
    if (x.isZero()) {
      throw new HardhatPluginError(PLUGIN_NAME, "Cannot calculate the binary logarithm of zero");
    } else if (x.isNegative()) {
      throw new HardhatPluginError(PLUGIN_NAME, "Cannot calculate the binary logarithm of a negative number");
    }
    const result = math.log2!(x.toMbn()) as MathjsBigNumber;
    return result.toFp();
  }

  public mul(x: BigNumber, y: BigNumber): BigNumber {
    const result: MathjsBigNumber = x.toMbn().mul(y.toMbn());
    return result.toFp();
  }

  public pow(x: BigNumber, y: BigNumber): BigNumber {
    if (x.isNegative()) {
      throw new HardhatPluginError(PLUGIN_NAME, "PRBMath cannot raise a negative base to a power");
    }
    const result = math.pow!(x.toMbn(), y.toMbn()) as MathjsBigNumber;
    return result.toFp();
  }

  public sqrt(x: BigNumber): BigNumber {
    if (x.isNegative()) {
      throw new HardhatPluginError(PLUGIN_NAME, "Cannot calculate the square root of a negative number");
    }
    const result = math.sqrt!(x.toMbn()) as MathjsBigNumber;
    return result.toFp();
  }

  protected solidityMod(x: BigNumber, m: BigNumber): BigNumber {
    const m_mbn: MathjsBigNumber = m.toMbn();
    let remainder: MathjsBigNumber = x.toMbn().mod(m_mbn);
    if (x.isNegative() && !remainder.isZero()) {
      remainder = remainder.sub(m_mbn);
    }
    return remainder.toFp();
  }
}
