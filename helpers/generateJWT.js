const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    
    return new Promise ((resolve,reject) => {
        const payload = {...user}
        console.log('esto es payload',payload)
        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            {expiresIn:'1h'},
            (error,token) => {
                if(error){
                    console.log(error)
                    reject('FAILED to create TOKEN')
                 } else {
                    resolve(token);
                 }
            }
            )
    })
}

module.exports={
    generateToken
}