let regex = /[a-z]+|[^a-z]+/gi 

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    result = input.match(regex)[0];

    let numRegex = /\d/
    if(numRegex.test(result) === false)
      return 1;

    if(result.toString().includes('/')) {
      let values = result.toString().split('/')
      if(values.length != 2)
        return 'invalid number';

      result = parseFloat(parseFloat(values[0])/parseFloat(values[1])).toFixed(5)
    }

    if(isNaN(result))
      return 'invalid number';

    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    result = input.match(regex)[1];

    if(!result)
      result = input.match(regex)[0];

    let validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
    if(!validUnits.includes(result))
      return 'invalid unit';

    if(result === 'l')
      result = 'L';

    if(result === 'GAL')
      result = 'gal';

    if(result === 'MI')
      result = 'mi';

    if(result === 'KM')
      result = 'km';

    if(result === 'LBS')
      result = 'lbs';

    if(result === 'KG')
      result = 'kg';

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    if(initUnit === 'gal' || initUnit === 'GAL') 
      result = 'L';

    else if(initUnit === 'l' || initUnit === 'L')
      result = 'gal';

    else if(initUnit === 'lbs' || initUnit === 'LBS')
      result = 'kg';

    else if(initUnit === 'kg' || initUnit === 'KG')
      result = 'lbs';

    else if(initUnit === 'mi' || initUnit === 'MI')
      result = 'km';

    else if(initUnit === 'km' || initUnit === 'KM')
      result = 'mi';
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    switch(unit) {
      case 'gal':
      case 'GAL':
        result = 'gallons'
        break;
        case 'l':
        case 'L':
          result = 'litres'
          break;
        case 'lbs':
        case 'LBS':
          result = 'pounds'
          break;
        case 'kg':
        case 'KG':
            result = 'kilograms'
            break;
        case 'mi':
        case 'MI':
          result = 'miles'
          break;

          case 'km':
          case 'KM':
            result = 'kilometres'
            break;
                                                
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if(initUnit === 'gal' || initUnit === 'GAL')
      result = (initNum * galToL).toFixed(5);

    else if(initUnit === 'l' || initUnit === 'L')
      result = (initNum / galToL).toFixed(5);

    else if(initUnit === 'lbs' || initUnit === 'LBS')
      result = (initNum * lbsToKg).toFixed(5);

    else if(initUnit === 'kg' || initUnit === 'KG')
      result = (initNum / lbsToKg).toFixed(5);

    else if(initUnit === 'mi' || initUnit === 'MI')
      result = (initNum * miToKm).toFixed(5);

    else if(initUnit === 'km' || initUnit === 'KM')
      result = (initNum / miToKm).toFixed(5);
    
    return parseFloat(result);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum + ' ' + this.spellOutUnit(returnUnit);
    return result;
  };
  
}

module.exports = ConvertHandler;
