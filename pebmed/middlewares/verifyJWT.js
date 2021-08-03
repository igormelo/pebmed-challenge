const jwt = require('jsonwebtoken');
const SECRET = "PebMED"

const verifyJWT = async (req, res, next) => {
    const token = req.headers['authorization']
    jwt.verify(token, SECRET, (err, decoded) => {

        if(err) return res.status(401).send({message: 'Required JWT Token'}).end();

        req.userId = decoded.userId;
        next();
    })
}

module.exports = verifyJWT;