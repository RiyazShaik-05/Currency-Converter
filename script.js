const countries = {
    Andorra: { countryCode: 'AD', currencyCode: 'EUR' },
    Australia: { countryCode: 'AU', currencyCode: 'AUD' },
    Austria: { countryCode: 'AT', currencyCode: 'EUR' },
    Belgium: { countryCode: 'BE', currencyCode: 'EUR' },
    Brazil: { countryCode: 'BR', currencyCode: 'BRL' },
    Bulgaria: { countryCode: 'BG', currencyCode: 'BGN' },
    Canada: { countryCode: 'CA', currencyCode: 'CAD' },
    China: { countryCode: 'CN', currencyCode: 'CNY' },
    Cyprus: { countryCode: 'CY', currencyCode: 'EUR' },
    CzechRepublic: { countryCode: 'CZ', currencyCode: 'CZK' },
    Denmark: { countryCode: 'DK', currencyCode: 'DKK' },
    Ecuador: { countryCode: 'EC', currencyCode: 'USD' },
    ElSalvador: { countryCode: 'SV', currencyCode: 'USD' },
    Estonia: { countryCode: 'EE', currencyCode: 'EUR' },
    Finland: { countryCode: 'FI', currencyCode: 'EUR' },
    France: { countryCode: 'FR', currencyCode: 'EUR' },
    Germany: { countryCode: 'DE', currencyCode: 'EUR' },
    Greece: { countryCode: 'GR', currencyCode: 'EUR' },
    Hungary: { countryCode: 'HU', currencyCode: 'HUF' },
    Iceland: { countryCode: 'IS', currencyCode: 'ISK' },
    India: { countryCode: 'IN', currencyCode: 'INR' },
    Indonesia: { countryCode: 'ID', currencyCode: 'IDR' },
    Ireland: { countryCode: 'IE', currencyCode: 'EUR' },
    Israel: { countryCode: 'IL', currencyCode: 'ILS' },
    Italy: { countryCode: 'IT', currencyCode: 'EUR' },
    Japan: { countryCode: 'JP', currencyCode: 'JPY' },
    Kiribati: { countryCode: 'KI', currencyCode: 'AUD' },
    KoreaSouth: { countryCode: 'KR', currencyCode: 'KRW' },
    Latvia: { countryCode: 'LV', currencyCode: 'EUR' },
    Liechtenstein: { countryCode: 'LI', currencyCode: 'CHF' },
    Lithuania: { countryCode: 'LT', currencyCode: 'EUR' },
    Luxembourg: { countryCode: 'LU', currencyCode: 'EUR' },
    Malaysia: { countryCode: 'MY', currencyCode: 'MYR' },
    Malta: { countryCode: 'MT', currencyCode: 'EUR' },
    MarshallIslands: { countryCode: 'MH', currencyCode: 'USD' },
    Mexico: { countryCode: 'MX', currencyCode: 'MXN' },
    Micronesia: { countryCode: 'FM', currencyCode: 'USD' },
    Monaco: { countryCode: 'MC', currencyCode: 'EUR' },
    Montenegro: { countryCode: 'ME', currencyCode: 'EUR' },
    Nauru: { countryCode: 'NR', currencyCode: 'AUD' },
    Netherlands: { countryCode: 'NL', currencyCode: 'EUR' },
    NewZealand: { countryCode: 'NZ', currencyCode: 'NZD' },
    Norway: { countryCode: 'NO', currencyCode: 'NOK' },
    Palau: { countryCode: 'PW', currencyCode: 'USD' },
    Philippines: { countryCode: 'PH', currencyCode: 'PHP' },
    Poland: { countryCode: 'PL', currencyCode: 'PLN' },
    Portugal: { countryCode: 'PT', currencyCode: 'EUR' },
    Romania: { countryCode: 'RO', currencyCode: 'RON' },
    SanMarino: { countryCode: 'SM', currencyCode: 'EUR' },
    Singapore: { countryCode: 'SG', currencyCode: 'SGD' },
    Slovakia: { countryCode: 'SK', currencyCode: 'EUR' },
    Slovenia: { countryCode: 'SI', currencyCode: 'EUR' },
    SouthAfrica: { countryCode: 'ZA', currencyCode: 'ZAR' },
    Spain: { countryCode: 'ES', currencyCode: 'EUR' },
    Sweden: { countryCode: 'SE', currencyCode: 'SEK' },
    Switzerland: { countryCode: 'CH', currencyCode: 'CHF' },
    Thailand: { countryCode: 'TH', currencyCode: 'THB' },
    TimorLeste: { countryCode: 'TL', currencyCode: 'USD' },
    Turkey: { countryCode: 'TR', currencyCode: 'TRY' },
    Tuvalu: { countryCode: 'TV', currencyCode: 'AUD' },
    UnitedKingdom: { countryCode: 'GB', currencyCode: 'GBP' },
    UnitedStates: { countryCode: 'US', currencyCode: 'USD' },
    VaticanCity: { countryCode: 'VA', currencyCode: 'EUR' }
};

const host = 'api.frankfurter.app';
let fromSelect = document.querySelector("#from-select");
let toSelect = document.querySelector("#to-select");
let amountInput = document.querySelector(".amount-input");
let button = document.querySelector(".exchange-btn")
let resultText = document.querySelector(".result-text");

for(country in countries){
    let fromOption = document.createElement("option");
    let toOption = document.createElement("option");
    fromOption.value = country;
    fromOption.text = country;
    toOption.value = country;
    toOption.text = country;
    if(country === "UnitedStates"){
        fromOption.selected = true;
    }
    if(country === "India"){
        toOption.selected = true;
    }
    fromSelect.appendChild(fromOption);
    toSelect.appendChild(toOption);
};

fromSelect.addEventListener("change",()=>{
    let fromCountry = fromSelect.value;
    let fromImage = document.querySelector(".from-image");
    fromImage.src = `https://flagsapi.com/${countries[fromCountry].countryCode}/flat/64.png`;
});

toSelect.addEventListener("change",()=>{
    let toCountry = toSelect.value;
    let toImage = document.querySelector(".to-image");
    toImage.src = `https://flagsapi.com/${countries[toCountry].countryCode}/flat/64.png`;
});

async function calculateExchange(){
    let fromCountry = fromSelect.value;
    let toCountry = toSelect.value;
    let amount = amountInput.value;
    if(amount==="" || amount<=0){
        amount = 1;
        amountInput.value = "1";
    }
    let currUrl = `https://api.frankfurter.app/latest?amount=${amount}&from=${countries[fromCountry].currencyCode}&to=${countries[toCountry].currencyCode}`;
    let response = await fetch(currUrl);
    let data = await response.json();
    let result = data.rates[countries[toCountry].currencyCode];
    resultText.innerText = `${amount} ${countries[fromCountry].currencyCode} = ${result} ${countries[toCountry].currencyCode}`;
};

button.addEventListener("click",(event)=>{
    event.preventDefault();
    calculateExchange();
})

window.addEventListener("load",()=>{
    calculateExchange();
});


