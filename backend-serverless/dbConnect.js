'use strict';

var mysql = require('mysql');

module.exports = {
    connect: function(callback) {
        // Hardcoding parameters for simplicity
        var conn = mysql.createConnection({
            host     : 'full-stack.csa2piboptju.us-east-1.rds.amazonaws.com',
            user     : 'admin',
            password : 'full-stack',
            port     : 3306,
            database : 'full_stack'
        });
        conn.connect(function(err) {
            if (err) {
              console.error('Database connection failed: ' + err.stack);
            }
          
            console.log('Connected to database.');
            callback(err, conn);
        });
    },

    disconnect: function(connection) {
        connection.end();
    },

    getAllEmployees: function(conn, adminId, callback) {
        conn.query(
            'SELECT id, adminId, name FROM Employee WHERE adminId = ?',
            [adminId],
            function (error, results, fields) {
                if (error) {
                    console.error(error);
                }
                callback(error, results);
            });
    }
}