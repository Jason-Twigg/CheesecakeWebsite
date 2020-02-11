const app = require("../app");

const orders = require("../routes/orders.js");

var http = require('http');

var serverVal;

// make sure the server is listening to port 3000
beforeAll(() => {
    serverVal = app.listen(3000);
});

test('Get Orders Test', done => {

    //flaviocopes.com/node-http-post/ used to find syntax on how to do a post command in http

    // set information for connecting to the server, also
    // defines the the request is a post
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/orders',
        method: 'post'
    }

    // Variable for holding the post data
    var postData = null;

    // flaviocopes.com/node-http

    // create a request that sends a post request
    const req = http.get(options, (res) => {

        //make sure the status code was 200
        expect(res.statusCode).toBe(200);

        // Retrieve the data and set it to postData
        res.on('data', (d) => {

            postData = d;
            
            // Make sure the data is not null
            expect(postData).not.toEqual(null);

            // Parse the data
            var cheesecakes = JSON.parse(postData);

            // Make sure the parsed cheesecake is not null and
            // the length of the array is more than 0
            expect(cheesecakes).not.toEqual(null);
            expect(cheesecakes.length).toBeGreaterThan(0);
            
            // List out the contents of the data as elements of an array
            for (var i = 0; i < cheesecakes.length; i++){
                console.log(cheesecakes[i]);
            }

            done();
        })
    })




    /*jQuery.post("http://localhost:3000/orders", function(data, status){
        postData = data;
        postStatus = status;
        console.log(data);
        console.log(status);
    });*/

})

// Close the listener for the port 3000
afterAll(() => {
    serverVal.close();
})