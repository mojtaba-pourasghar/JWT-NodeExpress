const { create , getUsersById,getUsers,updateUser,deleteUser,getUsersByEmail } = require('./user.service');
const { genSaltSync , hashSync , compareSync } = require("bcrypt");
const { sign } = require('jsonwebtoken');


module.exports = {
    createUser : (req,res) => {
        const body = req.body;
        const salt= genSaltSync(10);
        body.password = hashSync(body.password,salt);
        create(body,(err,results)=> {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success :0,
                    message : "Database connection error"
                });
            }
            return res.status(200).json({
                success :1,
                data : results
            });

            
        });
    }
    ,
    getUsersById : (req,res) => {
        const id = req.params.id;
        getUsersById(id,(err,results)=> {
            if(err) {
                console.log(err);
                return ;
            }
            
            if(!results) {
                return res.status(400).json({
                    success :0,
                    message : "Record not found"
                });
            }
            return res.status(200).json({
                success :1,
                data : results
            });
            
        });
    }
    ,
    getUsers : (req,res) => {
        getUsers((err,results)=> {
            if(err) {
                console.log(err);
                return ;
            }
            
            if(!results) {
                return res.status(400).json({
                    success :0,
                    message : "Data not found"
                });
            }
            return res.status(200).json({
                success :1,
                data : results
            });
            
        });
    }
    ,
    updateUser : (req,res) => {
        const body = req.body;
        const salt= genSaltSync(10);
        body.password = hashSync(body.password,salt);
        updateUser(body,(err,results)=> {
            if(err) {
                console.log(err);
                return ;
            }
           /* if(!results) {
                return res.status(400).json({
                    success :0,
                    message : "Faild to update user"
                });
            }*/
            return res.status(200).json({
                success :1,
                message : "Update successfully"
            });
            
        });
    }
    ,
    deleteUser : (req,res) => {
        const body = req.body;
        deleteUser(body,(err,results)=> {
            if(err) {
                console.log(err);
                return ;
            }
            /*if(!results) {
                return res.status(400).json({
                    success :0,
                    message : "Data not found"
                });
            }*/
            return res.status(200).json({
                success :1,
                message : "Delete successfully"
            });
            
        });
    }
    ,
    login : (req, res) => {
        
        const body = req.body;
        getUsersByEmail(body.email,(err,results)=>{
            if(err) {
                console.log(err);
                return ;
            }
            if(!results) {
                return res.status(400).json({
                    success :0,
                    message : "Invalid email or password"
                });
            }

            const result = compareSync(body.password,results.password);
            if(result) {
                results.password = undefined;
                const jsontoken = sign({result: results},process.env.SECRET_TOKEN_KEY,{
                     expiresIn : "1h",
                });
                return res.status(200).json({
                    success :1,
                    message : "login successfully",
                    token : jsontoken
                });
            }
            else{
                return res.status(400).json({
                    success :0,
                    message : "Invalid email or password"
                });
            }
            
        });

    }
}