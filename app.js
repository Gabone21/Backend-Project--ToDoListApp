//jshint esversion:6

//Importarea de module
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


// Crearea serverului
const app = express();
const items = ["Cumpara micu", "Gateste micu", "Infuleca micu"];
const workItems = [];
// We are telling our server to use EJS template engine in line
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
// Adaugarea de css
app.use(express.static("public"));

// Crearea primei rute get pe ruta home



app.get("/", function (req, res) {

    const day = date.getDate();


    res.render("list", {
        listTitle: day,
        newListItems: items
    });

    app.post("/", function (req, res) {

        const item = req.body.newItem;

        if (req.body.list === "Work") {
            workItems.push(item);
            res.redirect("/work");
        } else {
            items.push(item);
            res.redirect("/");
        }
    });

    app.get("/work", function (req, res) {
        res.render("list", { listTitle: "Work List", newListItems: workItems });
    });

    app.get("/about", function (req, res) {
        res.render("about");
    })

});
// Pornirea serverului

app.listen(8080, function () {
    console.log("Server running on port 8080");
});

