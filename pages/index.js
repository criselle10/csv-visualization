import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import {Form, Button} from 'react-bootstrap';
import styles from '../styles/Home.module.css';
import PieChart from '../component/PieChart';
import BarChart from '../component/BarChart';

export default function Home() {
    // create a reference to the file input form element
    const fileRef = React.createRef()

    // USESTATES:
    // state for containing raw JSON responce from the API
    const [csvData, setCsvData] = useState([])

    // state for containing distinct car brands
    const [brands, setBrands] = useState([])

    // state for the number of sales per brand
    const [salesByBrand, setSalesByBrand] = useState([])

    // function that will take our file and encode the data from its as base64 string
    const toBase64 = (file) => new Promise((resolve, reject) => {
        // FileReader is JavaScript's built-in file reading feature
        const reader = new FileReader()
        // readAsDataURl is what actually does the base64 conversion
        reader.readAsDataURL(file) //readAsDataURL method
        // onload and onerror arepromise resolutions(signals that the function either worked or didn't work)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })

    // funtion to submit CSV to backend for conversion to JSON
    function uploadCSV(e){
        e.preventDefault() //avoid window switching
        console.log(fileRef)

        // fileRef.current.files[0] is the location of our csv file once it is chosen
        toBase64(fileRef.current.files[0])
        .then(encodedFile => {
            console.log(encodedFile)
            fetch('http://localhost:4000/api/cars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({csvData: encodedFile})
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                setCsvData(data.jsonArray)
            })
        })
    }
    // console.log(csvData)
    /*
        -This useEffect will run when the csvData state is updated and 
        on initial render.
        -It will flter through our jsonArray and record or save only the
        distinct brands that were sold.
    */ 

    useEffect(() => {
        // this will be our temporary array to hold distinct brands.
        let makes = []

        csvData.forEach(element => {
            // Iterate over all the items/objects in the csvData
            // This if statement will run for each item in the csvData array.
            /*  We will run a find() method to check if the current item's
                make is not already in our makes temporary array. If the current
                item's make is already in the makes array, it will not be pushed. 
                If the current array item's make is not in the make array, we will
                push the make of the current item into the makes array.*/ 
            if(!makes.find(make => make === element.make)){
                
                makes.push(element.make)
            }
        })
        // console.log(makes)
        setBrands(makes)

    }, [csvData])

    // Create a useEffect which will run only on intial render
    // and when the Brands state is updated.
    useEffect(() => {
        // We ill set our sales per brand using map. We will then
        // return the created array from the map into the salesByBrand state.
        setSalesByBrand(brands.map(brand => {
            /* For each brand in the brands array, we will return a new array
                containing the accumulated sales per brand and the brand itself
                as an object.*/
            let sales = 0;
            // variale will store the total sales of a particular brand.

            // iterate over the csvData using forEach
            csvData.forEach(element => {
                // for each entry in the csvData, we will accumulate its sales per brand.
                // Putting forEach() i nside a map results in a nested loop:
                // brand[0] -> finish/accomplish forEach -> iterate for brands[1]

                if(element.make === brand){

                    // accumulate teh sales of the current entry in the csvData into teh sales variable.
                    sales += parseInt(element.sales)
                }

            })
            // After the forEach
            console.log(sales);
            console.log(brand);
            return {
                brand: brand,
                sales: sales
            }
        }))
    },[brands])
    
    return (
        <React.Fragment>
            <Head>
                <title>CSV Data Visualization</title>
            </Head>
            <Form onSubmit={e => uploadCSV(e)}>
                <Form.Group controlId='csvUploadForm'>
                    <Form.Label>Upload CSV:</Form.Label>
                    <Form.Control 
                        type='file'
                        ref={fileRef}
                        accept='csv'
                        required
                    />
                </Form.Group>
                <Button variant='primary' type='submit' id='submitBtn'>Submit</Button>
            </Form>
            {csvData.length > 0 ? <PieChart salesData={salesByBrand} /> : null}
            {csvData.length > 0 ? <BarChart rawData={csvData} /> : null}
        </React.Fragment>
    )
}
