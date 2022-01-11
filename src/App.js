
import './App.css';

import LineGraph from './components/LineGraph';

import Summary from './components/Summary';
import { useEffect, useState } from 'react';
import axios from './axios';
;

function App() {

  const [totalConfirmed, setTotalConfirmed] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [loading, setLoading] = useState(false);
  const [covidSummary, setCovidSummary] = useState({});
  const [days, setDays] = useState(7);
  const [country, setCountry] = useState('');
  const [coronaCountAr, setCoronaCountAr] = useState([]);
  const [label,setLabel]=useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get(`/summary`)
      .then(res => {
        setLoading(false)
        if (res.status === 200) {
          setTotalConfirmed(res.data.Global.TotalConfirmed);
          setTotalRecovered(res.data.Global.TotalRecovered);
          setTotalDeaths(res.data.Global.TotalDeaths);
          setCovidSummary(res.data);
        }

        console.log(res);
      })
      .catch(error => {
        console.log(error)
      })
  }, []);

  const handleCountry = (e) => {
    setCountry(e.target.value);
    const d = new Date();
    const to = Formatdate(d);
    const from = Formatdate(d.setDate(d.getDate() - days));
    //console.log(from, to);
    getReportByDate(e.target.value,from,to);
  }
  const handleDays = (e) => {
    setDays(e.target.value);
    const d = new Date();
    const to = Formatdate(d);
    const from = Formatdate(d.setDate(d.getDate() - e.target.value));
    getReportByDate(country,from,to);
  }


  const Formatdate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const _date = d.getDate();
    return `${year}-${month}-${_date}`;
  }

  const getReportByDate = (countrySlug, from, to) => {
    axios.get(`country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`)
      .then(res => {
        console.log(res);

        const yAxisCoronaCount = res.data.map(d => d.Cases);
        const xAxisLabel=res.data.map(d=>d.Date);
        const coivdDetails=covidSummary.Countries.find(country=>country.Slug===countrySlug)
        
        setCoronaCountAr(yAxisCoronaCount);
        setTotalConfirmed(coivdDetails.TotalConfirmed);
        setTotalRecovered(coivdDetails.TotalRecovered);
        setTotalDeaths(coivdDetails.TotalDeaths);
        setLabel(xAxisLabel);
        console.log(res);
      })
      .catch(error => {
        console.log(error)
      })
     
  }


  if (loading) {
    return (
      <p>Fetching data from Api..!</p>
    )
  }

  return (
    <div className="App">
      <Summary
        totalConfirmed={totalConfirmed}
        totalRecovered={totalRecovered}
        totalDeaths={totalDeaths}
        country={country}
      />
      <div style={{marginTop:"10px"}}>
        <select value={country} onChange={handleCountry}>
          <option>Select Country</option>
          {
            covidSummary.Countries && covidSummary.Countries.map(
              country => <option key={country.Slug} value={country.Slug}>{country.Country}</option>
            )
          }
        </select>
        <select value={days} onChange={handleDays}>
          <option value='7'>last 7 days</option>
          <option value='30'>last 30 days</option>
          <option value='90'>last 90 days</option>
        </select>
      </div>
      <LineGraph
        yAxis={coronaCountAr}
        label={label}
      />
    </div>
  );
}

export default App;
