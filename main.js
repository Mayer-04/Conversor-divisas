import "./style.css";

import {
  countries,
  exchangeCountry,
  selectTag,
  handleSelectChange,
  fetchCurrency,
  handleSwitchCurrency,
} from "./src/index.js";

const currenciesContainer = document.getElementById("currencies");
const inputAmount = document.getElementById("amount");
const selectFrom = document.getElementById("select-from");
const selectTo = document.getElementById("select-to");
const selectAll = document.querySelectorAll(".select");
const switchCurrency = document.querySelector(".switch-currency");
const conversionResult = document.querySelector(".conversion-result");

const convertToArray = Array.from(selectAll);
const countryKey = Object.keys(countries);

function renderSelect() {
  convertToArray.forEach((select, index) => {
    countryKey.forEach((country) => {
      const countryFrom =
        index === 0 && country === exchangeCountry.unitedStates;
      const countryTo = index === 1 && country === exchangeCountry.colombia;
      const selected = countryFrom || countryTo ? selectTag : "";
      const option = `<option class="option" value="${country}" ${selected}>${country}</option>`;
      select.insertAdjacentHTML("beforeend", option);
    });
    select.addEventListener("change", () => {
      handleSelectChange(select, countries);
    });
  });
}

currenciesContainer.addEventListener("submit", (event) => {
  event.preventDefault();

  fetchCurrency({ inputAmount, selectFrom, selectTo, conversionResult });
});

switchCurrency.addEventListener("click", () => {
  handleSwitchCurrency({ selectFrom, selectTo, countries, conversionResult });

  if (!inputAmount.value) {
    conversionResult.classList.add("hidden");
    conversionResult.textContent = "";
    return;
  }

  fetchCurrency({ inputAmount, selectFrom, selectTo, conversionResult });
});

renderSelect();
