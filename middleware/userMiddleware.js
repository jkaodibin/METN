const UserModel = require("../models/User");

module.exports.checkUserIsMe = async (req, res, next) => {
    let user = await UserModel.findById(req.params.id)
    if(user){
        if (user._id!==req.user.id) {
            res.status(401).json({err:{msg:"Vous n'etes pas autorise a effectuer cette action !"}})
        }else{
            next()
        }
        
    }else{
        res.status(401).json({err:{msg:"Cet utilisateur n'existe pas !"}})
    }
    
};