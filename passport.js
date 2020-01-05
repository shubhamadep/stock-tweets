const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;

const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const LocalStrategy = require('passport-local').Strategy;
const {jwt,google,facebook} = require('./config/keys');
const { User,UserMaster} = require('./models/user');

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['access_token'];
  }
  return token;
}

passport.use(new JwtStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: jwt.secret,
  passReqToCallback: true
}, async (req, payload, done) => {
  try {

    console.log("Payload: + " + payload);
    const user = await User.findOne({"id":payload.sub});

    // If user doesn't exists, handle it
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch(error) {
    done(error, false);
  }
}));

passport.use('googleToken', new GooglePlusTokenStrategy({
  clientID: google.clientID,
  clientSecret: google.clientSecret,
  passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
  try {

    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    if( profile.emails.length == 0){
      profile.emails.push("")
    }

    if( profile.photos.length == 0){  
      profile.photos.push("")
    }


    if (req.user) {
      req.user.google_id  = profile.id;
      req.user.google_email  = profile.emails[0].value;
      console.log("User Already found from cookies, Will Link google Info");
      await req.user.save()
      req.user.showPricingPage = false;
      return done(null, req.user);
    } else {
      let existingUser = await User.findOne({where:{ "google_id": profile.id }});
      if (existingUser) {
        console.log("User already exists in DB");
        //Verify
        existingUser.showPricingPage = false;
        return done(null, existingUser);
      }

      
      const newUserLoginInfo = new User({
   
        google_id: profile.id,
        google_email: profile.emails[0].value,
        google_avatar_url: profile.photos[0].value
        });

        let existingUserMaster = await UserMaster.findOne({where:{ "email": profile.emails[0].value }});
        if (existingUserMaster) {
          console.log("User already exists in DB");
          newUserLoginInfo.showPricingPage = false;
        } else {
          const newUserMaster = new UserMaster({
            email: profile.emails[0].value,
            avatar_url: profile.photos[0].value,
            fullName: profile.displayName
          });
          await newUserMaster.save();
          existingUserMaster = newUserMaster;
          newUserLoginInfo.showPricingPage=true;
        }
  
      await newUserLoginInfo.save();
      await newUserLoginInfo.setUser_master(existingUserMaster);

      console.log("Saved the new user");
      done(null, newUserLoginInfo);
    }

  } catch(error) {
    done(error, false, error.message);
  }
}));


passport.use('facebookToken', new FacebookTokenStrategy({
  clientID: facebook.appId,
  clientSecret: facebook.appSecret,
  passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
  try {

    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    if( profile.emails.length == 0){
      profile.emails.push("")
    }

    if( profile.photos.length == 0){
      profile.photos.push("")
    }


    if (req.user) {
      req.user.facebook_id  = profile.id;
      req.user.facebook_email  = profile.emails[0].value;
      console.log("User Already found from cookies, Will Link facebook Info");
      await req.user.save()
      return done(null, req.user);
    } else {
      let existingUser = await User.findOne({where:{ "facebook_id": profile.id }});
      if (existingUser) {
        console.log("User already exists in DB");
        return done(null, existingUser);
      }

      if( profile.emails.length == 0){
        profile.emails.push("")
      }

      if( profile.photos.length == 0){
        profile.photos.push("")
      }


      const newUserLoginInfo = new User({
   
        facebook_id: profile.id,
        facebook_email: profile.emails[0].value,
        facebook_avatar_url: profile.photos[0].value
        }
      );
      let existingUserMaster = await UserMaster.findOne({where:{ "email": profile.emails[0].value }});
      if (existingUserMaster) {
        console.log("User already exists in DB");
    
      } else {
        const newUserMaster = new UserMaster({
          email: profile.emails[0].value,
          avatar_url: profile.photos[0].value,
          fullName: profile.displayName
        });
        await newUserMaster.save();
        existingUserMaster = newUserMaster;
      }


    
      
  
      await newUserLoginInfo.save();
      await newUserLoginInfo.setUser_master(existingUserMaster);

      console.log("Saved the new user");
      done(null, newUserLoginInfo);
    }

  } catch(error) {
    done(error, false, error.message);
  }
}));

passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {

    const user = await User.findOne({where:{ "local_email": email }});
    
    if (!user) {
      return done(null, false);
    }
    const isMatch = user.local_password === password;
  
    if (!isMatch) {
      return done(null, false);
    }
  
    done(null, user);
  } catch(error) {
    done(error, false);
  }
}));