import React, { useEffect, useState } from 'react'

import "./App.css";
import Countries from './component/Countries';
import Search from './component/Search';
const url = "https://restcountries.com/v3.1/all";
const CountryAPP = () => {

    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterCountries, setFilterCountries] = useState(countries);

    const fetchData = async (url) => {
        setIsLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            setCountries(data);
            setFilterCountries(data);
            setIsLoading(false);
            setError(null);
        }catch(error) {
            setIsLoading(false);
            setError(error);
        }
    }
    useEffect(() => {
        fetchData(url);
    },[])

    const handleRemoveCountry = (name) => {
const restCountry=filterCountries.filter((country) =>(country.name.common !== name));
        setFilterCountries (restCountry);
    }

    const handleSearch = (searchvalue) => {
        let value = searchvalue.toLowerCase();
        const newCountries = countries.filter((country) => {
            const countryName = country.name.common.toLowerCase();
            return countryName.startsWith(value);
        })
        setFilterCountries(newCountries);
    }
    return (
        <>
        <h1>Country App</h1>
        <div className='search'><Search onSearch={handleSearch} /></div>
        {isLoading && <h2>Loading..........</h2>}
        {error && <h2>{error.message}</h2>}
        {countries && <Countries countries={filterCountries} onRemoveCountry={handleRemoveCountry} />}
        </>
    )}
export default CountryAPP
