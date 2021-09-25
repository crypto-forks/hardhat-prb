/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BigNumber } from "@ethersproject/bignumber";
import { Decimal } from "decimal.js";
import fp from "evm-fp";
import { HardhatPluginError } from "hardhat/plugins";
import type { BigNumber as MathjsBigNumber } from "mathjs";
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

import { HALF_SCALE, PLUGIN_NAME, SCALE } from "./constants";

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
    precision: 79,
  },
);
const mbn = math.bignumber!;

// See https://stackoverflow.com/a/65172703/3873510
// Rounds down because that is how Solidity handles division.
Decimal.prototype.toFixedWithNoTrailingZeros = function () {
  const decimals: number = 18;
  return this.toFixed(decimals, Decimal.ROUND_DOWN).replace(/(\.0*|(?<=(\..*))0*)$/, "");
};

export class HardhatPRBMath {
  /**
   * @param x UD60x18 fixed-point number.
   * @param y UD60x18 fixed-point number.
   * @returns The result as a UD60x18 fixed-point number.
   */
  public avg(x: BigNumber, y: BigNumber): BigNumber;

  /**
   * @param x Basic fixed-point number.
   * @param y Basic fixed-point number.
   * @returns The result as a UD60x18 fixed-point number.
   */
  public avg(x: string, y: string): BigNumber;

  public avg(x: BigNumber | string, y: BigNumber | string): BigNumber {
    if (x instanceof BigNumber && y instanceof BigNumber) {
      let result: BigNumber = x.div(2).add(y.div(2));
      const xModTwo: BigNumber = this.solidityMod(x, BigNumber.from(2));
      const yModTwo: BigNumber = this.solidityMod(y, BigNumber.from(2));
      if (xModTwo.eq(1) && yModTwo.eq(1)) {
        result = result.add(1);
      } else if (xModTwo.eq(-1) && yModTwo.eq(-1)) {
        result = result.sub(1);
      }
      return result;
    } else if (typeof x === "string" && typeof y === "string") {
      const result = math.mean!(mbn(x), mbn(y)) as MathjsBigNumber;
      return fp(result.toFixedWithNoTrailingZeros());
    }
    throw new HardhatPluginError(PLUGIN_NAME, `Invalid inputs in "avg" method: x: ${x}, y: ${y}`);
  }

  /**
   * @param x UD60x18 fixed-point number.
   * @returns The result as a UD60x18 fixed-point number.
   */
  public ceil(x: BigNumber): BigNumber;

  /**
   * @param x Basic fixed-point number.
   * @returns The result as a UD60x18 fixed-point number.
   */
  public ceil(x: string): string;
  public ceil(x: BigNumber | string): BigNumber | string {
    if (x instanceof BigNumber) {
      const remainder: BigNumber = x.mod(SCALE);
      if (remainder.isZero()) {
        return x;
      } else {
        let result: BigNumber = x.sub(remainder);
        if (x.gt(0)) {
          result = result.add(SCALE);
        }
        return result;
      }
    } else if (typeof x === "string") {
      const result = mbn(x).ceil() as MathjsBigNumber;
      return result.toFixedWithNoTrailingZeros();
    }
    throw new HardhatPluginError(PLUGIN_NAME, `Invalid input in "ceil" method: x: ${x}`);
  }

  public div(x: BigNumber, y: BigNumber): BigNumber;
  public div(x: string, y: string): string;
  public div(x: BigNumber | string, y: BigNumber | string): BigNumber | string {
    if (x instanceof BigNumber && y instanceof BigNumber) {
      return x.mul(SCALE).div(y);
    } else if (typeof x === "string" && typeof y === "string") {
      const result = mbn(x).div(mbn(y)) as MathjsBigNumber;
      return result.toFixedWithNoTrailingZeros();
    }
    throw new HardhatPluginError(PLUGIN_NAME, `Invalid inputs in "div" method: x: ${x}, y: ${y}`);
  }

  public exp(x: string): string {
    const result = mbn(x).exp() as MathjsBigNumber;
    return result.toFixedWithNoTrailingZeros();
  }

  public exp2(x: string): string {
    const two: MathjsBigNumber = mbn("2");
    const result = math.pow!(two, mbn(x)) as MathjsBigNumber;
    return result.toFixedWithNoTrailingZeros();
  }

  public floor(x: BigNumber): BigNumber;
  public floor(x: string): string;
  public floor(x: BigNumber | string): BigNumber | string {
    if (x instanceof BigNumber) {
      const remainder: BigNumber = x.mod(SCALE);
      if (remainder.isZero()) {
        return x;
      } else {
        let result: BigNumber = x.sub(remainder);
        if (x.lt(0)) {
          result = result.sub(SCALE);
        }
        return result;
      }
    } else if (typeof x === "string") {
      const result = mbn(x).floor() as MathjsBigNumber;
      return result.toFixedWithNoTrailingZeros();
    }
    throw new HardhatPluginError(PLUGIN_NAME, `Invalid input in "floor" method: x: ${x}`);
  }

  public frac(x: BigNumber): BigNumber;
  public frac(x: string): string;
  public frac(x: BigNumber | string): BigNumber | string {
    if (x instanceof BigNumber) {
      return this.solidityMod(x, SCALE);
    } else if (typeof x === "string") {
      return this.solidityMod(x, "1");
    }
    throw new HardhatPluginError(PLUGIN_NAME, `Invalid input in "frac" method: x: ${x}`);
  }

  public gm(x: string, y: string): string {
    const product: MathjsBigNumber = mbn(x).mul(mbn(y));
    const result = math.sqrt!(product) as MathjsBigNumber;
    return result.toFixedWithNoTrailingZeros();
  }

  public inv(x: BigNumber): BigNumber;
  public inv(x: string): string;
  public inv(x: BigNumber | string): BigNumber | string {
    if (x instanceof BigNumber) {
      const result: BigNumber = SCALE.mul(SCALE).div(x);
      return result;
    } else if (typeof x === "string") {
      const scale: MathjsBigNumber = mbn("1");
      const result = scale.mul(scale).div(mbn(x)) as MathjsBigNumber;
      return result.toFixedWithNoTrailingZeros();
    }
    throw new HardhatPluginError(PLUGIN_NAME, `Invalid input in "inv" method: x: ${x}`);
  }

  public ln(x: string): string {
    const result = math.log!(mbn(x)) as MathjsBigNumber;
    return result.toFixedWithNoTrailingZeros();
  }

  public log10(x: string): string {
    const result = math.log10!(mbn(x)) as MathjsBigNumber;
    return result.toFixedWithNoTrailingZeros();
  }

  public log2(x: string): string {
    const result = math.log2!(mbn(x)) as MathjsBigNumber;
    return result.toFixedWithNoTrailingZeros();
  }

  public max(x: BigNumber, y: BigNumber): BigNumber;
  public max(x: string, y: string): string;
  public max(x: BigNumber | string, y: BigNumber | string): BigNumber | string {
    if (x instanceof BigNumber && y instanceof BigNumber) {
      return x.gte(y) ? x : y;
    } else if (typeof x === "string" && typeof y === "string") {
      return mbn(x).gte(mbn(y)) ? x : y;
    }
    throw new HardhatPluginError(PLUGIN_NAME, `Invalid inputs in "max" method: x: ${x}, y: ${y}`);
  }

  public mul(x: BigNumber, y: BigNumber): BigNumber;
  public mul(x: string, y: string): string;
  public mul(x: BigNumber | string, y: BigNumber | string): BigNumber | string {
    if (x instanceof BigNumber && y instanceof BigNumber) {
      const doubleScaledProduct = x.mul(y);
      let doubleScaledProductWithHalfScale: BigNumber;
      if (doubleScaledProduct.isNegative()) {
        doubleScaledProductWithHalfScale = doubleScaledProduct.sub(HALF_SCALE);
      } else {
        doubleScaledProductWithHalfScale = doubleScaledProduct.add(HALF_SCALE);
      }
      const result: BigNumber = doubleScaledProductWithHalfScale.div(SCALE);
      return result;
    } else if (typeof x === "string" && typeof y === "string") {
      const result = mbn(x).mul(mbn(y)) as MathjsBigNumber;
      return result.toFixedWithNoTrailingZeros();
    }
    throw new HardhatPluginError(PLUGIN_NAME, `Invalid inputs in "mul" method: x: ${x}, y: ${y}`);
  }

  public pow(x: string, y: string): string {
    const result = math.pow!(mbn(x), mbn(y)) as MathjsBigNumber;
    return result.toFixedWithNoTrailingZeros();
  }

  public sqrt(x: string): string {
    const result = math.sqrt!(mbn(x)) as MathjsBigNumber;
    return result.toFixedWithNoTrailingZeros();
  }

  protected solidityMod(x: BigNumber, y: BigNumber): BigNumber;
  protected solidityMod(x: string, y: string): string;
  protected solidityMod(x: BigNumber | string, m: BigNumber | string): BigNumber | string {
    if (x instanceof BigNumber && m instanceof BigNumber) {
      let remainder = x.mod(m);
      if (!remainder.isZero() && x.isNegative()) {
        remainder = remainder.sub(m);
      }
      return remainder;
    } else if (typeof x === "string" && typeof m === "string") {
      const m_mbn: MathjsBigNumber = mbn(m);
      let remainder = mbn(x).mod(mbn(m)) as MathjsBigNumber;
      if (!remainder.isZero() && remainder.isNegative()) {
        remainder = remainder.sub(m_mbn);
      }
      return remainder.toString();
    }
    throw new HardhatPluginError(PLUGIN_NAME, `Invalid inputs in "solidityMod" method: x: ${x}, m: ${m}`);
  }
}
