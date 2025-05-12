import {useEffect, useState} from 'react'
import axios from "axios";


const App =()=> {
  const [countries, setCountries] = useState([])
  const [countriesFilter, setCountriesFilter] = useState([])
  const [countriesinput, setCountriesInput] = useState('')

    useEffect(()=>{
        console.log("fetching countries")
        if (countries){

            axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then(responce =>{
                console.log(responce.data)
                setCountries(responce.data)
            })

        }
    },[])

    const HandleCountries = (event)=> {
        setCountriesInput(event.target.value)
        console.log(countries)
        const country = countries.filter(c => c.name.common.toLowerCase().includes(event.target.value.toLowerCase()));
        if (country){
            setCountriesFilter(country)

        }
    }
    const ShowInfo = (props)=> {
      return (
          <div>
              <h2>{props.name}</h2>
              <p>Capital: {props.capital}</p>
              <p>Area: {props.area}</p>
              <ul>
                  {props.lang.map((lang, index) => (
                      <li key={index}>{lang}</li>
                  ))}
              </ul>
              <img src={props.image} alt={`Flag of ${props.name}`} width="100"/>
              <ShowWeather capital={props.capital} lat={props.latlng[0]} lng={props.latlng[1]}/>
          </div>
      )
    }

    const ShowWeather = (props) => {
        const { capital, lat, lng } = props;
        const [countriesWeather, setCountriesWeather] = useState(null);
        const [loading, setLoading] = useState(true);
        const apiKey = import.meta.env.VITE_API_KEY;

        useEffect(() => {
            const fetchWeather = async () => {
                try {
                    const response = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`
                    );
                    setCountriesWeather(response.data);
                } catch (error) {
                    console.error("Error fetching weather:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchWeather();
        }, [lat, lng, apiKey]);

        if (loading || !countriesWeather) return <p>Loading weather...</p>;

        return (
            <>
                <h2>Weather in {capital}</h2>
                <p><strong>Temperature:</strong> {countriesWeather.main.temp} °C</p>
                <img
                    src={`https://openweathermap.org/img/wn/${countriesWeather.weather[0].icon}@2x.png`}
                    alt={countriesWeather.weather[0].description}
                />
                <p><strong>Wind:</strong> {countriesWeather.wind.speed} m/s</p>
            </>
        );


    }


    const Countries = (prop) => {
        const [selectedCountry, setSelectedCountry] = useState(null);
        const countCountries = prop.countriesfilter.length;

        if (countCountries > 10) {
            return <div>Too many matches, specify another filter</div>;
        } else if (countCountries === 1) {
            const country = prop.countriesfilter[0];
            const languages = Object.values(country.languages);
            return (
                <ShowInfo
                    name={country.name.common}
                    capital={country.capital}
                    area={country.area}
                    lang={languages}
                    image={country.flags.png}
                    latlng={country.latlng}
                />
            );
        } else {
            return (
                <>
                    {prop.countriesfilter.map((country) => {
                        const languages = Object.values(country.languages);
                        const isSelected = selectedCountry === country.cca3;

                        return (
                            <div key={country.cca3}>
                                <div>{country.name.common}</div>
                                <button
                                    onClick={() =>
                                        setSelectedCountry(isSelected ? null : country.cca3)
                                    }
                                >
                                    {isSelected ? 'Hide' : 'Show'}
                                </button>
                                {isSelected && (
                                    <ShowInfo
                                        name={country.name.common}
                                        capital={country.capital}
                                        area={country.area}
                                        lang={languages}
                                        image={country.flags.png}
                                        latlng={country.latlng}
                                    />
                                )}
                            </div>
                        );
                    })}
                </>
            );
        }
    };

  return (
    <>
        find countries <input onChange={HandleCountries}/>
       <Countries countriesfilter={countriesFilter}/>
    </>
  )
}

export default App
