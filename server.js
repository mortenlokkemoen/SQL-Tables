const express = require("express")
const app = express()
const db = require("./table_database.js") 

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let  PORT = 8000;

// To start the server
app.listen(PORT, () => {
    console.log(`"Server running on port ${PORT}")`);
});

// API GROCIRIES WORKS
app.get("/api/transactions", (req, res, next) => {
    let sql = "select * from transactions";
    let groceries = [];
    db.all(sql, groceries, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

// API CARD  WORKS
app.get("/api/card", (req, res, next) => {
    let sql = "SELECT transactions.card_number FROM transactions";
    let cards = [];
    db.all(sql, cards, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

// Push the whole transaction when final purchase is done
app.post("/api/transactions/", (req, res, next) => {
    let errors=[]
    if (!req.body.item_name){
        errors.push("No item specified");
    }
    if (!req.body.category){
        errors.push("No category specified");
    }
    if (!req.body.price){
        errors.push("No price specified");
    }
    if (!req.body.postnr){
        errors.push("No post number specified");
    }
    if (!req.body.store_name){
        errors.push("No store name specified");
    }
    if (!req.body.location){
        errors.push("No store location specified");
    }
    if (!req.body.card_number){
        errors.push("No card number specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    let groceries = {
        item_name: req.body.item_name,
        category: req.body.category,
        price : req.body.price,
        postnr: req.body.postnr,
        store_name: req.body.store_name,
        location: req.body.location,
        card_number: req.body.card_number
    }
    let time = 'SELECT GETDATE() AS current_date'
    let sql ='INSERT INTO transactions (item_name, category, price, postnr, store_name, location, card_number) VALUES (?,?,?,?,?,?,?)'
    let params =[groceries.item_name, groceries.category, groceries.price, groceries.postnr, groceries.store_name, groceries.location, groceries.card_number]
    db.run(sql, params, time, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": groceries,
            "id" : this.lastID,
            "time" : this.current_date
        })
    });
})


// Delete all items registrated to the given card WORKS
app.delete("/api/transactions/:card_number", (req, res, next) => {
    db.run(
        'DELETE FROM transactions WHERE card_number = ?',
        req.params.card_number,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
    });
})


// Populating some dummy data to test different CRUD operations out
app.post("/api/populate", (req, res, next) => {
    const insert = 'INSERT INTO transactions (item_name, category, price, postnr, store_name, location, card_number, current_date) VALUES (?,?,?,?,?,?,?,current_date)'
    db.run(insert, ["banana","fruit","kr15", "1248","KIWI","Tonsenhagen, Oslo","1258"])
    db.run(insert, ["coffee","beverage","kr58", "1248","KIWI","Tonsenhagen, Oslo", "1258"])
    db.run(insert, ["soap","cleaning","kr19", "1248","Rema 1000","Tonsenhagen, Oslo", "1258" ])
    db.run(insert, ["bread","bakeries","kr38", "1248","Rema 1000","Hvaltorvet, Sandefjord", "1466"])
    db.run(insert, ["coca cola 330ml","beverage","kr22","1248","KIWI","Hvaltorvet, Sandefjord","1466"])
    db.run(insert, ["Entrecote","meat","kr146","1248","KIWI","Hvaltorvet, Sandefjord","1466"])
        res.json({
            "message": "successful population",
            "data": insert,
            "id" : this.lastID
        })
    });
        // gets the current date WORKS
    app.get("/api/day/:current_date", (req, res, next) => {
        let sql = "SELECT * FROM transactions WHERE current_date = ? "
        let params = [req.params.current_date]
        db.all(sql, params, (err, row) => {
            if (err) {
              res.status(400).json({"error":err.message});
              return;
            }
            res.json({
                "message":"success",
                "data":row
            })
          });
    });

    app.get("/api/month/:month/:year", (req, res, next) => {
        let sql = "SELECT * FROM transactions WHERE current_date BETWEEN '2022-01' AND '2022-12' "
        let params = [req.params.current_date]
        db.all(sql, params, (err, row) => {
            if (err) {
              res.status(400).json({"error":err.message});
              return;
            }
            res.json({
                "message":"success",
                "data":row
            })
          });
    });


// Root path
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});