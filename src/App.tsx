import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import CountriesList from "./components/CountriesList";
import CountryInfo from "./components/CountryInfo";

function App() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  return (
    <div className="App">
      <main className="App-header h-screen p-10">
        <div className="flex flex-row justify-between px-10 py-5 w-full h-full">
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
