var mysql = require('mysql');
var config = require('./config.js');

var pool = mysql.createPool({
	host: config.database.HOST,
	user: config.database.USERNAME,
	password: config.database.PASSWORD,
	database: config.database.DATABASE
});

var allServices = {
	query: function(sql, values){
		return new Promise((resolve, reject) => {
			pool.getConnection(function(err,connection){
				if(err){
					reject(err);
				} else {
					connection.query(sql,values,(err, rows) => {
						if(err){
							reject(err);
						} else {
							resolve(rows);
						}
						
						connection.release();
					})
				}
			})
		})
	},
	
	getConfig: function(){
		let sql = `select * from emap_config;`
		return allServices.query(sql);
	}
}

module.exports = allServices