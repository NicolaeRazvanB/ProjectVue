const { faker } = require("@faker-js/faker");

const generateWineries = () => {
  let wineryList = [];
  for (let i = 0; i < 10; i++) {
    let initialName = faker.lorem.word({ length: { min: 4, max: 8 } });
    let finalName = initialName[0].toUpperCase() + initialName.substring(1);
    let winery = {
      name: finalName,
      location: faker.address.cityName(),
      foundingYear:
        Math.floor(Math.random() * (new Date().getFullYear() - 1223 + 1)) +
        1223,
    };
    wineryList.push(winery);
  }
  return wineryList;
};

const generateWines = () => {
  const wineTypes = ["Dry", "Slightly sweet", "Strongly sweet"];
  const wineColors = ["Red", "White", "Rose"];
  const wineVarieties = [
    "Chardonnay",
    "Cabernet Sauvignon",
    "Merlot",
    "Sauvignon ",
    "Sangiovese",
    "Pinot ",
    "Nebbiolo",
    "Riesling",
    "Syrah",
  ];

  wineList = [];
  for (let i = 0; i < 5; i++) {
    let initialName = faker.lorem.word({ length: { min: 4, max: 8 } });
    let finalName = initialName[0].toUpperCase() + initialName.substring(1);
    wineList.push({
      name: finalName,
      type: wineTypes[Math.floor(Math.random() * wineTypes.length)],
      variety: wineVarieties[Math.floor(Math.random() * wineVarieties.length)],
      color: wineColors[Math.floor(Math.random() * wineColors.length)],
    });
  }
  return wineList;
};
module.exports = { generateWineries, generateWines };
