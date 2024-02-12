import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_COUNTRIES } from "../queries";

type Country = {
  name: string;
  languages: [{ name: string }];
  currency: string;
  continent: {
    name: string;
  };
};

type CountiresQuery = {
  data: { countries: Country[] } | undefined;
  loading: boolean;
  error?: any;
};

type SearchFilter = {
  country: string;
  currency: string;
  language: string;
  continent: string;
};

enum Continent {
  ASIA = "Asia",
  AFRICA = "Africa",
  EUROPE = "Europe",
  NORTH_AMERICA = "North America",
  SOUTH_AMERICA = "South America",
  OCEANIA = "Oceania",
  ANTARCTICA = "Antarctica",
}

function CountriesList() {
  const { data, loading, error }: CountiresQuery = useQuery(GET_COUNTRIES);

  const [countries, setCountries] = useState<Country[] | undefined>([]);
  const [filterValue, setFilterValue] = useState<SearchFilter>({
    country: "",
    currency: "",
    language: "",
    continent: "",
  });

  //load the countries only when the data changes
  useEffect(() => {
    if (data) {
      // setCountries(data.countries);
    }
  }, [data]);

  //filter when the filterValue changes
  useEffect(() => {
    //if all the filter values are empty, return empty array. Means nothing was searched
    if (Object.values(filterValue).every((value) => value === ""))
      return setCountries([]);
    handleSearch();
  }, [filterValue]);

  //handle the searching
  const handleSearch = () => {
    //filter the countries based on the filterValue state
    const filteredCountries = data?.countries.filter((country: Country) => {
      /*
       * Array of boolean to store the conditions matched
       * If empty string return true, otherwise check if matches the condition
       *
       * Note: Empty string means no filter was applied
       */
      const conditions: boolean[] = [
        filterValue.country === "" ||
          country.name
            .toLowerCase()
            .includes(filterValue.country.toLowerCase()),

        filterValue.currency === "" ||
          country?.currency
            ?.toLowerCase()
            .includes(filterValue.currency.toLowerCase()),

        filterValue.language === "" ||
          country.languages.some((language) =>
            language.name
              .toLowerCase()
              .includes(filterValue.language.toLowerCase())
          ),

        filterValue.continent === "" ||
          country.continent.name
            .toLowerCase()
            .includes(filterValue.continent.toLowerCase()),
      ];

      // return the country only if all conditions are true
      return conditions.every((condition) => condition);
    });

    setCountries(filteredCountries);
  };

  //if error while querying return render message
  if (error) return <p className="text-sm">{error.message}</p>;

  return (
    <div className="">
      <div className="flex flex-col px-5 py-2 rounded-md bg-white text-black w-2/3 h-full max-h-full">
        <p className="text-center text-base font-bold">Country Search</p>
        <input
          className="input input-sm mb-2 bg-transparent border-black focus:border-black focus:ring-0 focus:outline-blue-200 placeholder:text-gray-500 placeholder:text-xs placeholder:italic"
          placeholder="Country name"
          onChange={(e) =>
            setFilterValue((prev) => {
              return { ...prev, country: e.target.value };
            })
          }
          value={filterValue.country}
          type="text"
        />

        <div className="flex flex-row w-full justify-between">
          <input
            className="input input-sm mb-2 bg-transparent border-black w-[48%] focus:border-black focus:ring-0 focus:outline-blue-200 placeholder:text-gray-500 placeholder:text-[0.65rem] placeholder:italic"
            placeholder="Currency (eg. USD)"
            onChange={(e) =>
              setFilterValue((prev) => {
                return { ...prev, currency: e.target.value };
              })
            }
            value={filterValue.currency}
            type="text"
          />
          <input
            className="input input-sm mb-2 bg-transparent border-black w-[48%] focus:border-black focus:ring-0 focus:outline-blue-200 placeholder:text-gray-500 placeholder:text-[0.65rem] placeholder:italic"
            placeholder="Language (eg. dutch)"
            onChange={(e) =>
              setFilterValue((prev) => {
                return { ...prev, language: e.target.value };
              })
            }
            value={filterValue.language}
            type="text"
          />
        </div>

        <select
          className="select select-bordered select-sm max-w-xs mb-2 bg-transparent border-black focus:border-black focus:ring-0 focus:outline-blue-200 italic text-xs"
          onChange={(e) =>
            setFilterValue((prev) => {
              return { ...prev, continent: e.target.value };
            })
          }
          value={filterValue.continent}
        >
          <option value={""} className="text-gray-500 text-xs">
            Select Continent...
          </option>
          {Object.values(Continent).map((continent) => (
            <option key={continent} value={continent}>
              {continent}
            </option>
          ))}
        </select>

        {(loading && (
          <div>
            <span className="loading loading-spinner text-info text-center "></span>
          </div>
        )) || (
          <div className="overflow-y-scroll px-1">
            <ul className="text-left">
              {countries?.map((country: Country) => (
                <li className="mb-2">
                  <input
                    type="button"
                    className="btn btn-sm bg-transparent border-none outline-none shadow-none text-black text-base font-medium w-full h-fit text-wrap flex flex-row justify-start text-left hover:bg-gray-300"
                    value={country.name}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default CountriesList;
