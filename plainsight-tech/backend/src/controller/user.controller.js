const {db} = require('../model')
const User = db.User;
const {verifyBasicAuth} = require('../middleware/autehnticate');
const bcrypt = require('bcryptjs');
const {verifyObject} = require('../util/util')

    /**
     * Register a new user
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */

const registerUser = async(req,res)=>{
    try{

        if(Object.keys(req.query).length > 0){
            console.log("here",req.query);
            res.status(400).send();
                throw ({err:'Invalid Query',message:"The Query is Invalid"})
        }
    
        const userExists = await User.findOne({where:{emailId: req?.body.emailId}});
        if(userExists){
            throw ({err:'User Already Exists',message:"User Already Exists"})

            res.status(409).send();
        }
    
        const user = {
            emailId: req.body.emailId,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        };
        const newUser = await User.create(user);
    
        res.status(201).json({
            id:newUser.id,
            emailId:newUser.emailId,
            firstName:newUser?.firstName,
            lastName:newUser?.lastName,
            createdAt: newUser?.createdAt,
            updatedAt: newUser?.updatedAt
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
    
}

const updateUser = async(req,res)=>{
    try{
        if(Object.keys(req.query).length > 0){
            res.status(400).send();
            throw ({err:'Invalid Query',message:"The Query is Invalid"})
        }
        
        const user = req.user;
    

        const validBody = verifyObject(req.body,['firstName','lastName','password']);
        if(!validBody){
            res.status(400).send();
            throw ({err:'Invalid Body',message:"The request Body is Invalid"})
        }
        await User.update(req.body,{where:{emailId:user.emailId}});
    
        res.status(204).send();
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

    /**
     * Authenticate user login
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */

const login = async(req,res)=>{
    try{
        if(Object.keys(req.query).length > 0){
            res.status(400).send();
            throw ({err:'Invalid Query',message:"The Query is Invalid"})
        }
       

        const user = await User.findOne({where:{emailId:req.user.emailId}});
        // console.log(user);
        if(!user){
            res.status(404).send();
            throw ({err:'User Not Found',message:"User Not Found"})
        }
    
        res.status(200).json({
            id:user.id,
            emailId:user.emailId,
            firstName:user?.firstName,
            lastName:user?.lastName,
            createdAt: user?.createdAt,
            updatedAt: user?.updatedAt
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = {registerUser,updateUser,login};
