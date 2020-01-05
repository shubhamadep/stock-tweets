const JWT = require('jsonwebtoken');

const { jwt } = require('../config/keys');
const {UserWatchlist,User}  = require('../models/user');
const {coinMasterModel}  = require('../models/coin');
const {multipleSymbolFullData}  = require('../handlers/cryptoAPIHandler');
const bcrypt = require('bcryptjs');

//const {ADD_COIN_WATCHLIST_SUCCESS,ADD_COIN_WATCHLIST_SUCCESS_DUPLICATE} = require('../config/responseTypes');

//ResponseMessages
var ADD_COIN_WATCHLIST_SUCCESS = 'ADD_COIN_WATCHLIST_SUCCESS';
var ADD_COIN_WATCHLIST_SUCCESS_DUPLICATE = 'ADD_COIN_WATCHLIST_SUCCESS_DUPLICATE';
var respStatus = 'respStatus'



generateToken = user => {
  return JWT.sign({
    iss: jwt.issuer,
    sub: user.id,
    iat: new Date().getTime(), 
    exp: new Date().setDate(new Date().getDate() + 1) 
  }, jwt.secret);
}

generateSalt = async(password) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  var passResult = passwordHash;
  console.log(passwordHash);
  return passwordHash

}
module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;

    let user = await User.findOne({where:{ "local_email": email }});
    if (user) { 
      return res.status(403).json({ error: 'Already registered'});
    }

    // Is there a Google account with the same email?
    alreadyRegisteredUser = await User.findOne({ 
      $or: [
        { "google_email": email },
        { "facebook_email": email }
      ] 
    });
    if (alreadyRegisteredUser) {

   
      alreadyRegisteredUser.local_email = email;

      alreadyRegisteredUser.local_password = password;
      await alreadyRegisteredUser.save()


      const token = generateToken(alreadyRegisteredUser);
      res.cookie('access_token', token, {
        httpOnly: true
      });
      res.status(200).json({ success: true,showPricingPage:true });
    } else {
      //Creating a new Record
      const newUser = new User({ 

        local_email: email,
        local_password: password
      });
  
      await newUser.save();
      const token = generateToken(newUser);
      res.cookie('access_token', token, {
        httpOnly: true
      });
      res.status(200).json({ success: true });

    }

  },


 signIn: async (req, res, next) => {

    const token = generateToken(req.user);
    res.cookie('access_token', token, {
      httpOnly: true
    });
    res.status(200).json({ success: true, showPricingPage:false });
  },

  signOut: async (req, res, next) => {
    res.clearCookie('access_token');
    res.json({ success: true });
  },

  googleOAuth: async (req, res, next) => {

    const token = generateToken(req.user);
    res.cookie('access_token', token, {
      httpOnly: true
    });
    console.log('SettingCookie')
    res.status(200).json({ success: true,details:req.user });
  },

  facebookOAuth: async (req, res, next) => {

    const token = generateToken(req.user);
    res.cookie('access_token', token, {
      httpOnly: true
    });
    res.status(200).json({ success: true,details:req.user });
  },


  dashboard: async (req, res, next) => {
    console.log('Inside Dashboard');
    res.json({ 
      user:req.user
    });
  },

  checkAuth: async (req, res, next) => {
    console.log('Inside checking authentication');
    res.json({ success: true });
  },


  //DashBoard
 addCoinToWatchList: async (req, res, next) => {
    console.log('Inside Adding coin to watchlist authentication');
    let currentUser = req.user;
    let coinid = req.params.coinid;
    if(!coinid){
      res.status(500).json({ success: true, errorMessage:'CoinId was not Correctly Supplied'})
    }
    console.log(ADD_COIN_WATCHLIST_SUCCESS);

    let foundwatchlistRecord = await UserWatchlist.findOne({where: {userMasterId:currentUser.id }});
    let canInsertIntoWatchlist = true;

    if(!foundwatchlistRecord){
      var newWatchlist = new UserWatchlist({
        userMasterId:currentUser.id,
        coinMasterId:coinid
      });
      await newWatchlist.save();
      
    res.status(200).json({success:true,respStatus:ADD_COIN_WATCHLIST_SUCCESS});

    }

    if(foundwatchlistRecord){
        for(let i = 0; i< foundwatchlistRecord.length;i++){
          let curreRec = foundwatchlistRecord[i];
          if(curreRec.coinMasterId == coinid){
            canInsertIntoWatchlist = false;
            res.status(200).json({success:true,respStatus:ADD_COIN_WATCHLIST_SUCCESS_DUPLICATE});
          }
        }
    }  

    if(foundwatchlistRecord && canInsertIntoWatchlist){
        var newWatchlist = new UserWatchlist({
          userMasterId:currentUser.id,
          coinMasterId:coinid
        });
        await newWatchlist.save();
        res.status(200).json({success:true,respStatus:ADD_COIN_WATCHLIST_SUCCESS});
    }
  },

  getAllCoinsFromWatchlist: async(req,resp,next) =>{
    console.log('Inside Adding coin to watchlist authentication');
    let currentUser = req.user;
    let currency = req.params.currency;




    let allCoinSymbols  = await UserWatchlist.findAll({where: {userMasterId:currentUser.id }, include:coinMasterModel} );
    
    let watchlistData = await multipleSymbolFullData(allCoinSymbols,currency);

    
    resp.status(200).json(watchlistData);


  }
}

