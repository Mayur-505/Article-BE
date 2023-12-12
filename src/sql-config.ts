import EnvVars from '@src/constants/EnvVars';
const mysql = require('mysql2');


// **** Run **** //

export const connection = mysql.createConnection({
  host:EnvVars.Mysql.host,
  port:EnvVars.Mysql.port,
  user:EnvVars.Mysql.user,
  password:EnvVars.Mysql.password,
  database:EnvVars.Mysql.database,
});


// connection.connect(function(err:any) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
//     connection.query(sql, function (err:any, result:any) {
//       if (err) throw err;
//       console.log("Table created");
//     });
//   });