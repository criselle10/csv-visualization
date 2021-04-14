import React, {useState, useEffect} from 'react';
import Pie from 'react-chartjs-2';
import randomcolor from 'randomcolor';


export default function PieChart({salesData}){
// console.log(salesData)

    const [brands , setBrands] = useState([]);
    const [sales , setSales] = useState([]);
    const [bgColors, setBgColors] = useState([]);

    useEffect(() => {
        setBrands(salesData.map(element => element.brand))
        setSales(salesData.map(element => element.sales))
        setBgColors(salesData.map(() => randomcolor()))
    }, [salesData])
    // console.log(brands)
    // console.log(sales)
    // console.log(bgColors)

    const data = {
            labels: brands,
            datasets:[{
                data: sales,
                backgroundColor: bgColors
        }]
    }

    return (
        <React.Fragment>
            <h1>Sales by Brand</h1>
            <Pie data={data} />
        </React.Fragment>
    )
}












// import {Pie} from 'react-chartjs-2';
// import {useState, Fragment, useEffect} from 'react';
// import randomcolor from 'randomcolor';

// export default function PieChart({salesData}){

//     // console.log(salesData)

//     // states for brand and sales:
//     const [brands, setbrands] = useState([]);
//     const [sales, setSales] = useState([]);

//     // states for randomized colors(hex decimals)
//     const [bgColors, setBgColors] = useState([]);

//     /* create a useEffect to map out brands and sales into their respective
//     allowedStatusCodes, by mapping our salesData out to create new arrays. */

//     useEffect(() => {
//         // Segregate the brands and sales into their respective arrays
//         // Creates a new array with all distinct brand
//         setbrands(salesData.map(element => element.brand))
//         // Creates a new array with all sales per brand
//         setSales(salesData.map(element => element.sales))
//         // Create random colors for each item in the salesData array
//         setBgColors(salesData.map(() => randomcolor()))
//     }, [salesData])

//     console.log(brands);
//     console.log(sales);
//     console.log(bgColors);

//     const data = {
//         // in your chartjs-2 labels is an array of strings.
//         labels: [brands],

//         datadets: [{
//             data: sales,
//             // data inside datasets is an array of numbers
//             backgroundColor: bgColors
//             // array of strigs for HTML colors or hex decimal colors
//         }]
//     }

//     return(
//         <Fragment>
//             <h1>Sales by Brand</h1> 
//             <Pie data={data} />
//         </Fragment>
//     )
// }