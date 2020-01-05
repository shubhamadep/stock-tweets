const Sequelize = require('sequelize');
const dbConnection  = require('../config/database');
const {coinMasterModel } = require('./coin');

const watchlistSchema = {


}


const userMasterSchema = {
    fullName: {
        type: Sequelize.STRING
    },
    DOB:{
        type: Sequelize.DATE
    },
    Country:{
        type: Sequelize.STRING(3)
    },
    City:{
        type: Sequelize.STRING
    },
    State:{
        type: Sequelize.STRING(5)
    },
    ZIPCode:{
        type:Sequelize.STRING(10)
    },
    email:{
        type:Sequelize.STRING,
        validate:{
            isEmail:true
        },
        allowNull:false,
        lowercase:true,
        required:true
    },
    phone:{
        type:Sequelize.STRING,
        validate:{
            isNumeric: true,
        }
    },
    avatar_url: Sequelize.STRING
}



const userSequelizeSchema  = {
    google_email:{
        type: Sequelize.STRING,
        lowercase: true
    },
    google_id:{
        type:Sequelize.STRING
    },
    facebook_email:{
        type: Sequelize.STRING,
        lowercase: true
    },
    facebook_id:{
        type:Sequelize.STRING
    },
    //Need to take avatars
    google_avatar_url:{
        type:Sequelize.STRING
    },

    facebook_avatar_url:{
        type:Sequelize.STRING
    },
    local_email:{
        type:Sequelize.STRING
    },
    local_password:{
        type:Sequelize.STRING
    }
}

var hooks = {
    instanceMethods:{
            isValidPassword: async function (newPassword) {
                try {
                  //return await bcrypt.compare(newPassword, this.local_password);
                    return this.local_password === newPassword;
                } catch (error) {
                  throw new Error(error);
                }
              
        }
    }
}


const userActivitySchema = {
    action: Sequelize.STRING,
    ip: Sequelize.STRING,
    origin: Sequelize.STRING
}


var User ;
var UserActivity ;
var UserMaster;
var UserWatchlist
try{
     User  = dbConnection.define('user_authentication',userSequelizeSchema);
     UserActivity  = dbConnection.define('user_activity', userActivitySchema);
     UserMaster = dbConnection.define('user_master', userMasterSchema,{
        timestamps: false
    });
    UserWatchlist = dbConnection.define('user_coin_watchlist', watchlistSchema,{ timestamps: false });

    //UserWacthlistRelation
    UserMaster.hasMany(UserWatchlist);
    UserWatchlist.belongsTo(UserMaster);
    //WatchlistModelWith Coin ForeignKey
    coinMasterModel.hasMany(UserWatchlist);
    UserWatchlist.belongsTo(coinMasterModel);


    //Relations...User to activilty Relationmodel
    UserMaster.hasMany(UserActivity);
    UserActivity.belongsTo(UserMaster);

    //User to LoginInfo Model
    UserMaster.hasMany(User);
    User.belongsTo(UserMaster);
} catch(err){
    console.log(err);
}

//Relations

User.hasMany(UserActivity);
UserActivity.belongsTo(User);



module.exports = {
    User,
    UserActivity,
    UserMaster,
    UserWatchlist
}

// Create a model




//FKeys
//User id with Auth infoID

//


const userMaster = {
    fullName: Sequelize.STRING,
    dob: Sequelize.DATEONLY,
    Zip_Code: Sequelize.INTEGER,
    Country: Sequelize.STRING, //Needs to be a relation from enums/ Master table
    avatar_url: Sequelize.STRING
}

const userPreferences = {} //Not to be taken now






// Export the model
