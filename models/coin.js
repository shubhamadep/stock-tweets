const Sequelize = require('sequelize');
const dbConnection  = require('../config/database');


const coinSchemaObject = {
    rank: {
        type: Sequelize.INTEGER,
    },

    logo:{
        type:Sequelize.STRING

    },
    name:{
         type:Sequelize.STRING
    },
    
    symbol:{
        type:Sequelize.STRING
    },

    slug:{
        type:Sequelize.STRING 
    },

    category:{
        type: Sequelize.ENUM('Coin', 'Token')
    },
    cryptocompareId:{
        type: Sequelize.INTEGER      
    }

};



//UrlsSection
var urlMaster = {
    urlType:{
        type: Sequelize.STRING,
        allowNull:false,
        lowercase:true,
        required:true
    }
}

var urlDataRelation = {

    value:{
        type: Sequelize.STRING,
        allowNull:false,
        lowercase:true,
        required:true
    },
    
}


/*const coin  = dbConnection.define('UserAuthentication',UserSchemaObject),{
    timestamps: false,
    underscored: true,
};
*/


const coinMasterModel  = dbConnection.define('coin_master',coinSchemaObject,{
    timestamps: false
});


const urlMasterModel  = dbConnection.define('url_master',urlMaster,{
    timestamps: false
});

const urlDataRelationModel  = dbConnection.define('url_coin_relation',urlDataRelation,{
    timestamps: false
});

urlMasterModel.hasMany(urlDataRelationModel);
urlDataRelationModel.belongsTo(urlMasterModel);

coinMasterModel.hasMany(urlDataRelationModel);


module.exports = {
    coinMasterModel:coinMasterModel,
    urlMasterModel:urlMasterModel,
    urlDataRelationModel:urlDataRelationModel
};