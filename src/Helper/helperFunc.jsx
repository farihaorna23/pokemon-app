export const splitStr = arr => {
  let str = "";
  arr.forEach(type => {
    str = str + type + ",";
  });

  return str.slice(0, str.lastIndexOf(","));
};

export const getSelectOptions = (arr, option) => {
  let options = arr.map(pokemon => {
    return pokemon[option];
  });

  let destOptions = [...options];
  let res = [];

  destOptions.forEach(type => {
    res.push(...type);
  });

  let uniqueOptions = new Set(res);
  return [...uniqueOptions];
};
