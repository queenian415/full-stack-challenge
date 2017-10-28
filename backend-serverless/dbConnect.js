'use strict';

var mysql = require('mysql');

module.exports = {
    connect: function(callback) {
        console.log('Connecting to database.');
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
            (error, results, fields) => {
                if (error) {
                    console.error(error);
                }
                callback(error, results);
            });
    },

    getEmployee: function(conn, employeeId, callback) {
        conn.query(
            'SELECT id, employeeId, name FROM Employee WHERE employeeId = ?',
            [employeeId],
            (error, results, fields) => {
                if (error) {
                    console.error(error);
                }
                callback(error, results);
            });
    },

    getPerformanceReview: function(conn, employeeId, callback) {
        conn.query(
            'SELECT id, content FROM Performance WHERE employeeId = ?',
            [employeeId],
            (error, results, fields) => {
                if (error) {
                    console.error(error);
                }
                callback(error, results);
            });
    },

    addPerformanceReview: function(conn, body, callback) {
        if (body.isNew) insertPerformanceReview(conn, body.employeeId, body.content, callback);
        else updatePerformanceReview(conn, body.employeeId, body.content, callback);
    }
}

function insertPerformanceReview(conn, employeeId, content, callback) {
    conn.query(
        'INSERT INTO Performance(employeeId, content) VALUES (?, ?)',
        [employeeId, content],
        (error, results, fields) => {
            if (error) {
                console.error(error);
            }
            callback(error, results);
        });
}

function updatePerformanceReview(conn, employeeId, content, callback) {
    conn.query(
        'UPDATE Performance SET content = ? WHERE employeeId = ?',
        [content, employeeId],
        (error, results, fields) => {
            if (error) {
                console.error(error);
            }
            callback(error, results);
        });
}
