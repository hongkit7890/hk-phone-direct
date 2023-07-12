let btcPriceTag = document.getElementById('price');
let time = document.getElementById('time');

let getBtcPrice = async (apiURL) => {
    try {
        let response = await fetch(apiURL);
        let data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

getBtcPrice('https://api.coincap.io/v2/assets/bitcoin')
    .then(data => {
        //time.innerHTML = data.time.updated;
        btcPriceTag.innerHTML = Math.round(data.data.priceUsd);
     })
    .catch(error => {
        console.log(error);
    })

