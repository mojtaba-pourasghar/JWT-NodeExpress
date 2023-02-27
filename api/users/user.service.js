const pool = require('../../config/database');

module.exports = {
    create : (data,callback)=> {
        pool.query(
            `INSERT INTO users (first_name, last_name, email, password) 
            VALUES (?, ?, ?, ?);`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.password
            ],
            (error,results,fields)=>{
                if(error){
                    return callback(error);
                }
                return callback(null,results);
            }
        );    
    },
    getUsers : callback => {
        pool.query(`SELECT id,first_name,last_name FROM users`,[],
        (error,results,fields)=>{
            if(error){
                return callback(error);
            }
            return callback(null,results);
        }
      );
    },
    getUsersById : (id,callback) => {
        pool.query(`SELECT id,first_name,last_name,email FROM users WHERE id = ?`,[id],
        (error,results,fields)=>{
            if(error){
                return callback(error);
            }
            return callback(null,results[0]);
        }
      );
    }
    ,
    updateUser : (data,callback) => {
        pool.query(`update users set first_name = ? , last_name = ? , email = ? , password = ? WHERE id = ?`,
        [
            data.first_name,
            data.last_name,
            data.email,
            data.password,
            data.id
        ],
        (error,results,fields)=>{
            if(error){
                return callback(error);
            }
            return callback(null,results[0]);
        }
      );
    }
    ,
    deleteUser : (data,callback) => {
        pool.query(`delete from users WHERE id = ?`,
        [
            data.id
        ],
        (error,results,fields)=>{
            if(error){
                return callback(error);
            }
            return callback(null,results[0]);
        }
      );
    },
    getUsersByEmail : (email,callback) => {
        pool.query(`SELECT password FROM users WHERE email = ?`,[email],
        (error,results,fields)=>{
            if(error){
                return callback(error);
            }
            return callback(null,results[0]);
        }
      );
    }
}