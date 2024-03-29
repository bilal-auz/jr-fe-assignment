import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_COUNTRY } from "../queries";

//country info type
type CountryData = {
  name: string;
  languages: Array<{
    name: string;
  }>;
  currency: string;
  continent: {
    name: string;
  };
  native: string;
  emoji: string;
  phone: string;
};

function CountryInfo({ selectedCountry }: IProps) {
  const [getCountry, { loading, data, error }] = useLazyQuery(GET_COUNTRY, {
    variables: { code: selectedCountry },
  });

  const [country, setCountry] = useState<CountryData>({} as CountryData);
  const [countryLoaded, setCountryLoaded] = useState(false);

  //fetch the country
  const fetchCountry = async () => {
    setCountryLoaded(false);

    const data = await getCountry();

    if (data.error) return alert("Error fetching country"); //handle error

    setCountry(data.data.country as CountryData);

    setCountryLoaded(true);
  };

  //fetch the country when the selected country changes. If no country is selected, do nothing.
  useEffect(() => {
    if (!selectedCountry) return setCountryLoaded(false);
    fetchCountry();
  }, [selectedCountry]);

  return (
    <div className="w-96 md:w-1/2 rounded-md px-4">
      {!selectedCountry && (
        <p className="text-black text-sm italic">No Selected Country...</p>
      )}
      {(loading && (
        <span className="loading loading-spinner text-info"></span>
      )) ||
        (countryLoaded && (
          <div className="bg-white rounded-md flex flex-col items-center text-black h-full">
            <p className="text-2xl md:text-4xl font-bold">
              {country?.name} ({country?.native})
            </p>

            <div className="divider before:bg-[#008afc] after:bg-[#008afc] text-[#008afc] my-2">
              {country.emoji}
            </div>

            <p className="text-xl md:text-2xl font-bold">
              🌍{country.continent.name}
            </p>

            <div className="flex flex-row md:flex-col lg:flex-row justify-between md:items-center lg:justify-around w-full px-0 md:px-5 ">
              <div className="stat w-1/4 rounded-lg px-2 py-2 flex flex-col">
                <div className="stat-title text-sm md:text-base text-[#008bfcae] text-left font-bold">
                  Languages
                </div>
                <div className="stat-value text-[#000] text-xl md:text-3xl font-bold">
                  {country.languages[0].name}
                </div>
                {country.languages.length > 1 && (
                  <div className="stat-desc text-black font-semibold text-xs">
                    {country.languages
                      .slice(1, 3)
                      .map((language) => language.name)
                      .join(", ")}
                  </div>
                )}
              </div>

              <div className="stat w-1/4 rounded-lg px-2 py-2 flex flex-col h-fit">
                <div className="stat-title text-sm md:text-base text-[#008bfcae] text-left font-bold">
                  Currency
                </div>
                <div className="stat-value text-[#000] text-xl md:text-3xl font-bold">
                  {country.currency.split(",")[0]}
                </div>
                {country.currency.split(",").length > 1 && (
                  <div className="stat-desc text-black font-semibold">
                    {country.currency.split(",").slice(1, 4).join(", ")}
                  </div>
                )}
              </div>

              <div className="stat w-1/4 rounded-lg px-2 py-2 flex flex-col ">
                <div className="stat-title text-sm md:text-base text-[#008bfcae] text-left font-bold">
                  Phone Code
                </div>
                <div className="stat-value text-[#000] text-xl md:text-3xl font-bold">
                  +{country.phone}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default CountryInfo;
