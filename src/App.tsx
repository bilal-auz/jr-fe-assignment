import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import CountriesList from "./components/CountriesList";
import CountryInfo from "./components/CountryInfo";

function App() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  return (
    <div className="App">
      <main className="App-header">
        <div className="flex flex-col md:flex-row justify-between md:justify-between items-center md:items-stretch px-0 md:px-10 w-screen h-full overflow-y-scroll overflow-x-hidden absolute inset-0 p-10">
          <CountriesList
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
          <CountryInfo
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
