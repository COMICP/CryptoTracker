//stock market broad https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-10-02?adjusted=true&include_otc=false&apiKey=j5ivxkwvobflEKX1na6tVmPwcNniC1Db

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

function convertCryptoArray(cryptoArray) {
  const convertedArray = [];

  cryptoArray.forEach((element) => {
    convertedArray.push(convertCryptoToObject(element));
  });

  return convertedArray;
}
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

