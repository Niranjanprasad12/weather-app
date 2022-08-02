const express = require("express")  // importing the express module
const app = express();  // creating a object of app
const https = require("https")  // importing the https module inorder to get the request from the external server.....
app.use(express.urlencoded({extended:true}));

app.post("/",function(request,response){
    const place = request.body.place;
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+place+"&appid=3903c7dc4627557a9dc7026f17f1d172&units=metric" 
    https.get(url,function(res){   // using different name for request and response to avoid the name clash
    console.log(res);  // prints some weird info about https request
    //inorder to get the data from the response which is basically from the url we have to follow the steps below
    res.on("data",function(data){  // here the first argument "data" is some sort of variable....
        console.log(data);  // it will give the desired output that we want (but in hexadecimal codes)..
        const weatherData = JSON.parse(data);// it will give the output in the format of JSON instead of hex..
        console.log(weatherData);
        // const object = {
        //     Name: "Niranjan",
        //     clg: "CEG"
        // }
        // const string1 = JSON.stringify(object);  // it will basically to the opposite to the parse but it converts the whole bunch of data into string rather than hex...
        // console.log(string1);  //just for examples
        const temp = weatherData.main.temp;  // retriving the temperature from the JSON tree..
        console.log(temp);
        const description = weatherData.weather[0].description; // here we are specifying the index for the weather as it was in a format of array...
        console.log(description);
        // displaying the icon with respect to the temperature we get
        const icon = weatherData.weather[0].icon;
        const imageURL =  "http://openweathermap.org/img/wn/"+icon+"@2x.png" // you can get this url from openweathermap website
        // now we are going to send the information to our website
        response.write("<h1>The weather in "+place+" is "+temp+" degree celsius</h1>")
        response.write("<p>The weather may have something like " +description+"</p>")
        response.write("<img src = "+imageURL+">")
        response.send();  // we can only have one send in the function so if we want to write multiple line we have to use write and then we have to send the info..

    })
})
})

app.get("/",function(request,response){
    response.sendFile(__dirname+"/index.html");
});



app.listen(3000,function(){
    console.log("server is started at port 3000");
})