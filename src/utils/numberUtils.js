export const digital_root = (number) => {
    const numbersString = number.toString();

    // If numbersString length is only one char long, we return the result 
    if (numbersString.length === 1) {
        return number;
    }

    // and if not, we continue to run the code below
    const numberStringsArray = numbersString.split('');

    // Calculate the sum of all numbers in an array
    const sumOfStringsArray = numberStringsArray.reduce((totalSum, currentValue) => totalSum + +currentValue, 0);

    // Tell our function to run itself again
    return digital_root(sumOfStringsArray);
}


export const idOdd = (number) => {
    if (typeof number === "number") {
        if (number % 2 === 0)
            return false;
        return true;
    }
}

export const ConvertToArray = (number) => {
    let output = [],
        sNumber = number.toString();

    for (let i = 0, len = sNumber.length; i < len; i += 1) {
        output.push(+sNumber.charAt(i));
    }

    return output;
}