const mysql = require('mysql-promise')()

mysql.configure({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pharmacy'
})

// mysql.query(`select * from product`)
// .then(res => {
//     //res[0] -> returned list
//     //res[0][0] -> first object in list
//     //res[0][0].product id -> access product id
//     console.log(res[0][0].product_id)
// })

module.exports = mysql
