export const StringsMatch = function (a, b) {
    if (a === b){
        return true;
    }
    else{
        return false;
    }
}

export const GetPropByString = function (obj, propString) {
    if (!propString)
      return obj;
  
    var prop, props = propString.split('.');
  
    for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
      prop = props[i];
  
      var candidate = obj[prop];
      if (candidate !== undefined) {
        obj = candidate;
      } else {
        break;
      }
    }
    return obj[props[i]];
}

export const IsDate = function(date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

export const GetDayFromDate = function (dateString) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date(dateString);
    const dayName = days[d.getDay()];

    return dayName;
}