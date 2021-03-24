const mysql = require('mysql');

const connectDB = async () => {
    try {
        // mysql connection string
        const con = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        })
        con.connect((err) => {
            if(err) throw err;
            console.log(`DB connection established.`);
        })
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;