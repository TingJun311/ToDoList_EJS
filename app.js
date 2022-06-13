const express = require("express");
const userData = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.listen(3000, () => {
    console.log("Server running on port 3000");
});


let addedItem = [];
app.get("/", (req, res) => {
    const date = new Date();
    const curDate = getCurDay(date.getDay());
    const curDay = date.toLocaleDateString("en-us", optionsDate);

    res.render("list", {
        curDay: curDay,
        newItem: addedItem
    });
});
app.use(userData.urlencoded({
    extended: true
}))

app.post("/", (req, res) => {
    addedItem.push(req.body.todo);
    res.redirect("/");
});

var optionsDate = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};

function getCurDay(day) {
    switch (day) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";    
        case 3: 
            return "Wednesday";
        case 4: 
            return "Thursday";
        case 5:
            return "Friday";
        default:
            return "Saturday";    
    }
}