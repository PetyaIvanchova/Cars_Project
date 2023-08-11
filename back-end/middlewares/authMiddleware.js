const jwt = require('../lib/jsonwebtoken');

const {SECRET} = require('../constants');

exports.isAuth = async (req,res,next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Invalid or missing authorization header.' });
    }
  
    const token = authHeader.substring(7); 
    if(token){
        try{
            const decodedToken = await jwt.verify(token, SECRET);

            req.user = decodedToken;
            res.locals.user = decodedToken;
        } catch(err) {
            return res.status(401).json({message: 'You are not authorized to access this page!'});
        }
    }

    next();
};