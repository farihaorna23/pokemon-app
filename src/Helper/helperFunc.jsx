export const splitStr = arr => {
  let str = "";
  arr.forEach(type => {
    str = str + type + ",";
  });

  return str.slice(0, str.lastIndexOf(","));
};

export const getType = arr => {
  let type = arr.map(pokemon => {
    return pokemon.type;
  });

  let destType = [...type];
  let res = [];

  destType.forEach(type => {
    res.push(...type);
  });

  let uniqueType = new Set(res);
  return [...uniqueType];
};
