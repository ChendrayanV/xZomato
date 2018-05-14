var express = require('express'),
    app = express(),
    bodyparser = require('body-parser'),
    path = require('path'),
    shell = require('node-powershell'),
    ps = new shell({
        executionPolicy: 'bypass',
        noProfile: true
    });

app.use(bodyparser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get("/", function (request, response) {
    response.render("index");
});

app.get("/GetCategories", function (request, response) {
    ps.addCommand('./Scripts/GetCategories.ps1')
    ps.invoke().then(output => {
        response.send(output)
    })
});

app.get("/NearByRestaurant", function (request, response) {
    response.render("NearByRestaurant");
});

app.get("/RestaurantCollection", function (request, response) {
    response.render("RestaurantCollection");
});

app.get("/RestaurantSearch", function (request, response) {
    response.render("RestaurantSearch");
});

app.get("/CityInfo", function (request, response) {
    response.render("CityInfo");
});

app.post("/CityInformation", function (request, response) {
    ps.addCommand("./scripts/GetCityInformation.ps1", [ {
        name: 'CityName',
        value: request.body.CityName
    } ])
    ps.invoke().then(output => {
        var cityInformation = JSON.parse(output)
        response.render('CityInformation', {
            result: cityInformation
        })
    })
})
app.listen(3000);
console.log("Your Application is running!")