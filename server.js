var express = require('express'),
    app = express(),
    bodyparser = require('body-parser'),
    path = require('path');

app.use(bodyparser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get("/NearByRestaurant", function (request, response) {
    response.render("NearByRestaurant");
});

app.get("/RestaurantCollection", function (request, response) {
    response.render("RestaurantCollection");
});

app.listen(3000);
console.log("Your Application is running!")