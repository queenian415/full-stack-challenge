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

    addEmployee: function(conn, obj, callback) {
        conn.query(
            'INSERT INTO Employee(adminId, name) VALUES (?, ?)',
            [obj.adminId, obj.name],
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

    insertPerformanceReview: function (conn, employeeId, content, callback) {
        conn.query(
            'INSERT INTO Performance(employeeId, content) VALUES (?, ?)',
            [employeeId, content],
            (error, results, fields) => {
                if (error) {
                    console.error(error);
                }
                callback(error, results);
            });
    },

    updatePerformanceReview: function (conn, id, content, callback) {
        conn.query(
            'UPDATE Performance SET content = ? WHERE id = ?',
            [content, id],
            (error, results, fields) => {
                if (error) {
                    console.error(error);
                }
                callback(error, results);
            });
    },

    addFeedbacker: function(conn, feedbackerid, perfid, employeeId, callback) {
        conn.query(
            'INSERT INTO Performance_Feedback (feedbackerId, perfId, employeeId) VALUES (?, ?, ?)',
            [feedbackerid, perfid, employeeId],
            (error, results, fields) => {
                if (error) {
                    if (error.code == "ER_DUP_ENTRY") {
                        // If duplicate entry, skip insertion, ignore error
                        error = null;
                    } else console.error(error);
                }
                callback(error, results);
            });

    },

    removeFeedbacker: function(conn, feedbackerid, perfid, callback) {
        conn.query(
            'DELETE FROM Performance_Feedback WHERE feedbackerId = ? AND perfId = ?',
            [feedbackerid, perfid],
            (error, results, fields) => {
                if (error) {
                    console.error(error);
                }
                callback(error, results);
            });

    },

    getFeedbakcers: function(conn, perfid, callback) {
        conn.query(
            'SELECT feedbackerId FROM Performance_Feedback WHERE perfId = ?',
            [perfid],
            (error, results, fields) => {
                if (error) {
                    console.error(error);
                }
                callback(error, results);
            });
    },

    getPerfsForFeedback: function(conn, feedbackerid, callback) {
        conn.query(
            'select p.id as perfId, p.content as perfContent, p.employeeId, e.name, f.id as feedbackId, f.content as feedbackContent ' + 
            'from Performance_Feedback pf inner join Performance p on pf.perfId = p.id ' + 
            'inner join Employee e on p.employeeId = e.id ' + 
            'left join Feedback f on f.perfId = p.id  and f.feedbackerId = pf.feedbackerId ' + 
            'where pf.feedbackerId = ?',
            [feedbackerid],
            (error, results, fields) => {
                if (error) {
                    console.error(error);
                }
                callback(error, results);
            });
    },

    addFeedback: function(conn, obj, callback) {
        conn.query(
            'insert into Feedback(id, feedbackerId, perfId, content) values (?, ?, ?, ?) on duplicate key update content = ?',
            [obj.feedbackId, obj.feedbackerId, obj.perfId, obj.feedbackContent, obj.feedbackContent],
            (error, results, fields) => {
                if (error) {
                    console.error(error);
                }
                callback(error, results);
            });
    }
    
}




