const router = require('express').Router();

const authController = require('./controllers/authController');
const carController = require('./controllers/carController');

router.use('/auth', authController);
router.use('/cars', carController);
router.all('*', (req,res) => {
    return res.json({message: '404 Not Found!'});
});

module.exports = router;