const { createPool } = require("mysql");
// MySQL Database POOL connection
const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "kimp_stripe",
    connectionLimit: 10
    });
    // end of pool connection
let sql = "SELECT * FROM wp_users;";
pool.execute(sql, function(err, result){
    if(err) throw err;
    console.log(result);
})
module.exports = pool.promise();