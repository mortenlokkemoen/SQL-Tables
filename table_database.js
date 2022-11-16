const sqlite3 = require('sqlite3').verbose()
const DB = "db.sqlite";


let db = new sqlite3.Database(DB, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            item_name text, 
            category text, 
            price INTEGER,
            postnr INTEGER,
            store_name text,
            location text,
            card_number INTEGER,
            current_date INTEGER
            )`,(err) => {
        if (err) {
            console.log("Data already exists")
        }else{
        
        }
    })  
    }
})


module.exports = db