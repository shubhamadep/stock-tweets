'use strict';
module.exports = (sequelize, DataTypes) => {
  const cryptocurrency_info = sequelize.define('cryptocurrency_info', {
    symbol: DataTypes.STRING,
    ImageUrl: DataTypes.STRING
  }, {
    timestamps: false    
  });
  cryptocurrency_info.associate = function(models) {
    // associations can be defined here
  };
  return cryptocurrency_info;
};
