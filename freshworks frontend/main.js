// Global Variables
var countryinfo;
const countriesList = document.getElementById("countries");
let countries; // will contain "fetched" data

// Event Listeners


countriesList.addEventListener("change", newCountrySelection);
// triggers display function
function newCountrySelection(event) {
  displayCountryInfo(event.target.value);
  
  countryinfo=event.target.value;
}

//fetch call
fetch("https://restcountries.eu/rest/v2/all")
.then(res => res.json())
.then(data => initialize(data))
.catch(err => console.log("Error:", err));

function initialize(countriesData) {
  countries = countriesData;
  let options = "";
  countries.forEach(country => options+=`<option value="${country.alpha3Code}">${country.name}</option>`);

  countriesList.innerHTML = options;

  countriesList.selectedIndex = Math.floor(Math.random()*countriesList.length);
  displayCountryInfo(countriesList[countriesList.selectedIndex].value);
}
// display return for html
function displayCountryInfo(countryByAlpha3Code) {
 
  const countryData = countries.find(country => country.alpha3Code === countryByAlpha3Code);
  document.querySelector("#flag-container img").src = countryData.flag;
  document.querySelector("#flag-container img").alt = `Flag of ${countryData.name}`;  
  document.getElementById("capital").innerHTML = countryData.capital;
  //alert(countryData.capital);
  document.getElementById("dialing-code").innerHTML = `+${countryData.callingCodes[0]}`;
  document.getElementById("population").innerHTML = countryData.population.toLocaleString("en-US");
  document.getElementById("currencies").innerHTML = countryData.currencies.filter(c => c.name).map(c => `${c.name} (${c.code})`).join(", ");
  document.getElementById("region").innerHTML = countryData.region;
  document.getElementById("subregion").innerHTML = countryData.subregion;
}
// card image click function
function myfunc()
{
	window.location="sample.html";
	sampleCountryInfo(countryinfo);
}
function sampleCountryInfo(countryByAlpha3)
{
	const countryData = countries.find(country => country.alpha3Code === countryByAlpha3);
	document.getElementById("country__output-name").innerText=countryData.capital;
}
