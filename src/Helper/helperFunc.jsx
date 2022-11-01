export const splitStr = arr => {
  let str = "";
  arr.forEach(type => {
    str = str + type + ",";
  });

  return str.slice(0, str.lastIndexOf(","));
};

export const evolution = arr => {
  let evolName = arr.map(pokemon => pokemon.name);
  // let str = "";
  // evolName.forEach(pokemon => {
  //   str = str + pokemon + " ";
  // });

  // return str.slice(0, str.lastIndexOf(" "));
  return evolName;
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

export const destWeakness = (arr, weakness) => {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i].weaknesses[j] === weakness) {
        res.push(arr[i]);
      }
    }
  }

  return res;
};

export const filteredPokemon = (
  arr,
  username = "",
  type = "",
  weakness = ""
) => {
  if (username) {
    return arr.filter(pokemon => {
      return pokemon.name === username;
    });
  } else if (type && weakness) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[i].type[j] === type) {
          res.push(arr[i]);
        }
      }
    }

    return destWeakness(res, weakness);
  } else if (type) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[i].type[j] === type) {
          res.push(arr[i]);
        }
      }
    }
    return res;
  } else if (weakness) {
    return destWeakness(arr, weakness);
  } else {
    return arr;
  }
};
