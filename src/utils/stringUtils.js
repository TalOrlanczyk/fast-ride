import { ConvertToArray, digital_root, idOdd } from "./numberUtils";
export const getCalculationForASCII = (digit, index, calculation = 0) => {
  let tempCalc;
  if (index > digit.length) {
    return String.fromCharCode((calculation % 26) + 65);
  }
  if (idOdd(index)) tempCalc = digit[index - 1] * 1;
  else tempCalc = digit[index - 1] * 2;

  if (tempCalc > 9) {
    tempCalc = digital_root(tempCalc);
  }
  calculation += tempCalc;
  return getCalculationForASCII(digit, index + 1, calculation);
};

export const isPinUnValid = (PIN) => {
  let tempPinArr = PIN.split("-");
  if (tempPinArr.length !== 4) return true;
  if (tempPinArr[0] !== "JN") return true;
  let FirstLeter = getCalculationForASCII(ConvertToArray(tempPinArr[1]), 1);
  let SecondLetter = getCalculationForASCII(ConvertToArray(tempPinArr[2]), 1);
  if (
    PIN !== `JN-${tempPinArr[1]}-${tempPinArr[2]}-${FirstLeter + SecondLetter}`
  )
    return true;
  return false;
};
