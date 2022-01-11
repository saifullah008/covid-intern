import React from 'react'
import Card from './card';
import NumberFormat from 'react-number-format';

const Summary = (props) => {
    const { totalConfirmed,
    totalRecovered,
    totalDeaths,
    country,}=props;
    return (
        <div>
            <h1 style={{textTransform:"capitalize"}}>{country === ''?'world wide corona report':country} </h1>
            <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Card>
                    <span style={{color:"Blue"}}>Total confirmed</span>
                    <span>{<NumberFormat
                    value={totalConfirmed}
                    displayType={'text'}
                    thousandSeparator={true}
                    />}</span>
                </Card>
                <Card>
                    <span style={{color:"green"}}>Total Recovered</span>
                    <span>{<NumberFormat
                    value={totalRecovered}
                    displayType={'text'}
                    thousandSeparator={true}
                    />}</span>
                </Card>
                <Card>
                    <span style={{color:"red"}}>Total deaths</span>
                    <span>{<NumberFormat
                    value={totalDeaths}
                    displayType={'text'}
                    thousandSeparator={true}
                    />}</span>
                </Card>
            </div>
        </div>
    )
}

export default Summary
