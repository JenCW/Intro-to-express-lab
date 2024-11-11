// Filename: server.js
const express = require('express'); //load express
const app = express(); // create an instance of express for this project
const PORT = 3301; // create a variable for the port to check our result

    //root path
app.get('/', (req, res)=>{ //create a route for the root path
    res.send('<h1>hello world</h1>')}) // send a response saying hello world for the root route

    //Excercise 1:Be Polite, Greet the User//
app.get('/greetings/:name', (req, res)=>{ // create a route for 'greetings/ "something"
    res.send(`<h1>Looking Good there, ${req.params.name}!</h1>`)}); // send a response with a greeting and the value of something which you are calling name



   //Excercise 2:Rolling the Dice//
app.get('/roll/:num', (req, res)=>{ //create the route for "roll/:something"
    const num = req.params.num; //create a variable for the "something" and give it a value

    if (isNaN(num)) { //check if the value of "something" is not a number
        res.send('You must specify a number.') //if the value is not a number send the response
    }
    else{ // if the value of 'something' IS a number
        const max = Number(num) // convert the value of the 'text string" Num (which is our number)to a number and store it in the variable Max
        const roll = Math.floor(Math.random() * max) + 1 // create a variable called roll to generate the random number between 1 and the value of Max

        res.send(`You rolled a ${roll}`) // send the response message with the random number
    }
    });


    //excercise 3: I want THAT one//
    app.get('/collectibles/:index', (req, res)=>{ //create a route for "collectibles/:index"
        const index = parseInt(req.params.index); //create a variable for the "index" and converts it from a string to a whole number
        const collectibles = [ //create an array of collectibles
        {name: 'shiny ball', price: 5.95},
            {name: 'autographed picture of Jen', price: 100},
            {name: 'vintage 1970s yogurt sold as is', price: .99},
        ];
          if (index >= 0 && index < collectibles.length) { // check if the index is greater or equal to zero but also less then the length of the array
            const item = collectibles[index]; // assuming the if statement is true - we create a variable to store the items located at that index
            res.send(`So you want the ${item.name}? For $${item.price},it can be yours!`); // send the response with the item details
          } else {
            res.send('This item is not yet in stock.  Check back soon!') // send a response if the index is out of range
           }
        });



        //excercise 4: 4. Filter Shoes by Query Parameters
        const shoes = [
            { name: "Birkenstocks", price: 50, type: "sandal" },
            { name: "Air Jordans", price: 500, type: "sneaker" },
            { name: "Air Mahomeses", price: 501, type: "sneaker" },
            { name: "Utility Boots", price: 20, type: "boot" },
            { name: "Velcro Sandals", price: 15, type: "sandal" },
            { name: "Jet Boots", price: 1000, type: "boot" },
            { name: "Fifty-Inch Heels", price: 175, type: "heel" }
            ];


        app.get('/shoes', (req, res) => {
        const { 'min-price': minPrice, 'max-price': maxPrice, type } = req.query;

        let filteredShoes = shoes; // create a variable to store the shoes

        if(minPrice) {
            filteredShoes = filteredShoes.filter(shoe=> shoe.price >= parseFloat(minPrice)); // filter the shoes by the minimum price
        }
        if (maxPrice) {
            filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseFloat(maxPrice));// filter the shoes by the maximum price
        }
        if (type) {
            filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
         } // filter shoes by the type

           res.send(filteredShoes);
        });

        console.log(`listening on port: ${PORT}`);
        app.listen(PORT, () => {
            console.log(`listening on port: ${PORT}`);
        });