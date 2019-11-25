var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('items.db');

let sql = "UPDATE transactions SET amount = 5.88 WHERE amount = 0";
console.log(sql);



db.exec(sql);

/*
  db.all(sql, [], (err, rows) => {
  console.log(rows);
  });
  */