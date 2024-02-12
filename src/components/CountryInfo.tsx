import React from "react";

function CountryInfo() {
  const country = {
    name: "Spain",
    native: "España",
    emoji: "🇪🇸",
    continent: {
      name: "Europe",
    },
    languages: [{ name: "Spanish" }, { name: "Catalan" }],
    currency: "EUR, AUD",
    phone: "34",
  };

  return (
    <div className="bg-white w-1/2 rounded-md">
      <div className="flex flex-col items-center text-black">
        <p className="text-4xl font-bold">
          {country.name} ({country.native})
        </p>

        <div className="divider before:bg-[#008afc] after:bg-[#008afc] text-[#008afc] my-2">
          {country.emoji}
        </div>

        <p className="text-2xl font-bold">🌍{country.continent.name}</p>

        <div className="flex flex-row justify-around  w-full px-5">
          <div className="stat w-1/4 rounded-lg px-2 py-2 flex flex-col">
            <div className="stat-title text-base text-[#008bfcae] text-left font-bold">
              Languages
            </div>
            <div className="stat-value text-[#000] text-3xl font-bold">
              {country.languages[0].name}
            </div>
            {country.languages.length > 1 && (
              <div className="stat-desc text-black font-semibold">
                {country.languages
                  .slice(1)
                  .map((language) => language.name)
                  .join(", ")}
              </div>
            )}
          </div>

          <div className="stat w-1/4 rounded-lg px-2 py-2 flex flex-col">
            <div className="stat-title text-base text-[#008bfcae] text-left font-bold">
              Currency
            </div>
            <div className="stat-value text-[#000] text-3xl font-bold">
              {country.currency.split(",")[0]}
            </div>
            {country.currency.split(",").length > 1 && (
              <div className="stat-desc text-black font-semibold">
                {country.currency.split(",").slice(1).join(", ")}
              </div>
            )}
          </div>

          <div className="stat w-1/4 rounded-lg px-2 py-2 flex flex-col">
            <div className="stat-title text-base text-[#008bfcae] text-left font-bold">
              Phone Code
            </div>
            <div className="stat-value text-[#000] text-3xl font-bold">
              +{country.phone}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryInfo;