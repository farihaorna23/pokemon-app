export const splitStr = arr => {
  let str = "";
  arr.forEach(type => {
    str = str + type + ",";
  });

  return str.slice(0, str.lastIndexOf(","));
};
