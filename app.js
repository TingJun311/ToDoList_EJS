const express = require("express"); // To user express js
const userData = require("body-parser"); // To get user data 

const app = express();
app.set("view engine", "ejs"); // To enable ejs 
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
app.use(userData.urlencoded({
    // When using the body-parser package
    extended: true
}));
app.use(express.static("public")); // To set the file static to dynamic

const addedItem = [], workListItem = [];
// To store todos item and work list item
const optionsDate = {
    // Format for the date
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};

app.get("/", (req, res) => {
    const date = new Date();
    const curDay = date.toLocaleDateString("en-us", optionsDate);
    // To format the current date

    res.render("list", {
        curDay: curDay,
        newItem: addedItem
    });
});
app.post("/", (req, res) => {
    const newItem = req.body.todo; // Get user data
    if (newItem === null || newItem === "") {
        // Font allow to add if empty
        res.redirect(
            (req.body.submitBtn === "Work lists")? "/work" : "/"
            // Redirect to the current page if empty
            );
    } else {
        if (req.body.submitBtn === "Work lists") {
            // Check whether the user add from work or root page
            // Then redirect them
            workListItem.push(newItem);
            res.redirect("/work");
        } else {
            addedItem.push(newItem);
            res.redirect("/");
        }
    }  
});

app.get("/work", (req, res) => {
    // If user enter work list page
    res.render("list", {
        curDay: "Work lists",
        newItem: workListItem
    });
});


