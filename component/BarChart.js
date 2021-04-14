import React, {useState, useEffect, Fragment} from 'react';
import {Bar} from 'react-chartjs-2';

// Moment.js is a popular package with formats dates
import moment from 'moment';


export default function BarChart({rawData}){
    console.log(rawData)
    
    const [months, setMonths] = useState([
        'January', 
        'February', 
        'March', 
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ])

    const [ salesPerMonth, setSalesPerMonth] = useState([]);
    console.log(months);
    console.log(salesPerMonth);

    // Create a useEffect to accumulate the number of sales per month.
    // With this we are going to use moment.js to get the months per entry in the csvData

    // sales_date: '10/19/2019'

    // console.log(moment('10/19/2019').format('MMMM'))//October

    useEffect(() => {
        // compute the total slaes of a particular month and set it in our state: salesPerMonth

        setSalesPerMonth(months.map(month => {
            //We will accumulate the sales for the current month ito this variable
            let sales = 0;

            rawData.forEach(element => {
                // each item in the rawData array will be iterated
                // months[0] -> forEach must finish first -> months[1]
                // element.sale_date: 'MM/DD/YYYY'
                if(moment(element.sale_date).format('MMMM') === month){

                    // if the current entry falls on the current month being iterated by the map, we will accumulate its sales
                    sales += parseInt(element.sales)
                }
            })
            console.log(sales)
            return sales
        }))
    }, [rawData])

    console.log(salesPerMonth)

    const data ={
        labels: months,
        datasets: [{
            label: 'Monthly Car Sales',
            backgroundColor: 'blue',
            borderColor: 'white',
            borderWidth: 1,
            hoverBackgroundColor: 'lightBlue',
            hoverBorderColor: 'black',
            data: salesPerMonth
        }]  
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }

    return (
        <Fragment>
            <h1>Sales by Month</h1>
            <Bar data={data} />
        </Fragment>
    )
}
