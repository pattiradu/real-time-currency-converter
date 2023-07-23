const apiKey = "cd6ace4872b5fa47d10d6326";
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/RWF/`;

// Fetch exchange rate data and populate currency dropdowns
function fetchExchangeRates() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currencyList = Object.keys(data.conversion_rates);

            // Populating "from" and "to" currency dropdowns
            const fromCurrencySelect = document.querySelector(".from");
            const toCurrencySelect = document.querySelector(".to");

            currencyList.forEach(currency => {
                const optionTag = document.createElement("option");
                optionTag.textContent = currency;
                fromCurrencySelect.appendChild(optionTag);

                const optionTagTo = document.createElement("option");
                optionTagTo.textContent = currency;
                toCurrencySelect.appendChild(optionTagTo);
            });
        })
        .catch(error => {
            console.error("Error fetching exchange rates:", error);
        });
}

// Perform currency conversion
function convertCurrency() {
    const fromCurrency = document.querySelector(".from").value;
    const toCurrency = document.querySelector(".to").value;
    const amount = parseFloat(document.querySelector("input").value);
    const ap_url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}/`;
    fetch(ap_url)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount * exchangeRate).toFixed(2);

            const resultDiv = document.querySelector(".result");
            resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        })
        .catch(error => {
            console.error("Error fetching exchange rates:", error);
        });
}

// Attach event listener to the form submit button
document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    convertCurrency();
});

// Fetch exchange rates and populate currency dropdowns when the page loads
window.addEventListener("load", () => {
    fetchExchangeRates();
});
