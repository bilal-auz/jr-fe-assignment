import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CountriesList from "./components/CountriesList";

function App() {
  return (
    <div className="App">
      <main className="App-header h-screen p-10">
        <div className="flex flex-row justify-between px-10 py-5 w-full h-full">
          <CountriesList />
          <div>Country info</div>
        </div>
      </main>
    </div>
  );
}

export default App;
