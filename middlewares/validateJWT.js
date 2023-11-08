const jwt = require('jsonwebtoken');

const validateJWT =async (req,res,next) => {
    const token = req.header('x-token');
    console.log(token);

    if(!token){
        return res.status(401).json({
            ok:false,
            msg: 'NO TOKEN found in the request'
        })
    }
    
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET_KEY);

        req.uid = payload.uid;
        req.name = payload.name;
        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'INVALID Token'
        })
    }
    next();
}

module.exports = {
    validateJWT
}