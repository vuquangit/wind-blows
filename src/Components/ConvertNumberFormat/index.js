const ConvertNumberFormat = (value) => {
    // npm install --save is-number
    // Check isNumber ?

    const num = parseFloat(value);
    let reducedValue = num;
    let qualifier = "";
  
    if (num >= 1000 && num <= 999999) {
      // thousands
      reducedValue = num / 1000;
      qualifier = "k";
    } else if (num >= 1000000 && num <= 999999999) {
      // millions
      reducedValue = num / 1000000;
      qualifier = "m";
    } else if (num >= 1000000000) {
      // billions
      reducedValue = num / 1000000000;
      qualifier = "b";
    }
  
    return (
      (qualifier.length > 0
        ? reducedValue > 99
          ? reducedValue.toFixed(0)
          : reducedValue > 9
          ? reducedValue.toFixed(1)
          : reducedValue.toFixed(2)
        : reducedValue) + qualifier
    ).replace(".", ",");
  };

  export default ConvertNumberFormat;