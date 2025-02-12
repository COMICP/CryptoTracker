
//object for the crypto array
function convertCryptoToObject(crypto) {
  const object = {
    id: crypto.id,
    symbol: crypto.symbol,
    marketcap: crypto.market_cap,
    priceper: crypto.ath,
    daychange: crypto.price_change_24h,
    percentdaychange: crypto.price_change_percentage_24h,
  };
  return object;
}
//takes array of crypto and converts it into objects more usable in the program
function convertCryptoArray(cryptoArray) {
  const convertedArray = [];

  cryptoArray.forEach((element) => {
    convertedArray.push(convertCryptoToObject(element));
  });

  return convertedArray;
}

// gets crypto from api
async function getCrypto() {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=layer-1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-HuPgNyAvUiAjLoVVKKko3AGu",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data; // Directly return the array
  } catch (error) {
    console.error(error);
    return null;
  }
}
// Sort an array of objects by a specific value
function sortObjectsByValue(arr) {
  //console.log("Before sorting:", arr);
  const sortedArray = arr.sort((a, b) => 
    //console.log(`Comparing ${a.percentdaychange} and ${b.percentdaychange}`);
     b.marketcap - a.marketcap
  );
  //console.log("After sorting:", sortedArray);
  return sortedArray;
}

export async function buildFinanceArray() {
  let financeArray = []; // Initialize as an array
  try {
    const cryptoRaw = await getCrypto();
    const crypto = convertCryptoArray(cryptoRaw);
    //console.log("Converted Crypto Array:", crypto);
    financeArray = sortObjectsByValue(crypto);
    //console.log("Sorted Finance Array:", financeArray);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return financeArray;
}

