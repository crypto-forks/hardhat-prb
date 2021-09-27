import { BigNumber } from "@ethersproject/bignumber";
import fp from "evm-fp";

export const DECIMALS: BigNumber = BigNumber.from("18");
export const E: BigNumber = fp("2.718281828459045235");
export const HALF_SCALE: BigNumber = fp("0.5");
export const MAX_SD59x18: BigNumber = fp(
  "57896044618658097711785492504343953926634992332820282019728.792003956564819967",
);
export const MAX_UD60x18: BigNumber = fp(
  "115792089237316195423570985008687907853269984665640564039457.584007913129639935",
);
export const MAX_WHOLE_SD59x18: BigNumber = fp("57896044618658097711785492504343953926634992332820282019728");
export const MAX_WHOLE_UD60x18: BigNumber = fp("115792089237316195423570985008687907853269984665640564039457");
export const MIN_SD59x18: BigNumber = fp(
  "-57896044618658097711785492504343953926634992332820282019728.792003956564819968",
);
export const MIN_WHOLE_SD59x18: BigNumber = fp("-5789604461865809771178549250434395392663499233282028201972");
export const PI: BigNumber = fp("3.141592653589793238");
export const SCALE: BigNumber = fp("1");
