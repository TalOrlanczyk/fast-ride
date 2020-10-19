import { digital_root, idOdd } from './numberUtils';
export const getCalculationForASCII = (digit, index, calculation = 0) => {
    let tempCalc;
    if (index > digit.length) {
      return String.fromCharCode(calculation % 26 + 65);
    }
    if (idOdd(index))
      tempCalc = digit[index - 1] * 1;
    else
      tempCalc = digit[index - 1] * 2;

    if (tempCalc > 9) {
      tempCalc = digital_root(tempCalc);
    }
    calculation += tempCalc;
    return getCalculationForASCII(digit, index + 1, calculation);
  }