const router = require('express-promise-router')();
const passport = require('passport');

const passportConf = require('../passport');
const { validateBody, schemas } = require('../helpers/routehelpers');
const UsersController = require('../controllers/users');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
  .post(validateBody(schemas.authSchema), passportSignIn, UsersController.signIn);

router.route('/signout')
  .get(passportJWT, UsersController.signOut);

router.route('/oauth/google')
  .post(passport.authenticate('googleToken', { session: false }), UsersController.googleOAuth);

router.route('/oauth/facebook')
  .post(passport.authenticate('facebookToken', { session: false }), UsersController.facebookOAuth);

  router.route('/dashboard')
  .get(passportJWT, UsersController.dashboard);

router.route('/status')
  .get(passportJWT, UsersController.checkAuth);

//Will have to move to differnt controller and maybe cosume a service with dashboard  => User and coin 
 router.route('/watchlist/coin/:coinid')
  .post(passportJWT, UsersController.addCoinToWatchList);

router.route('/watchlist/coin/details/:currency')
  .get(passportJWT, UsersController.getAllCoinsFromWatchlist); 

module.exports = router;