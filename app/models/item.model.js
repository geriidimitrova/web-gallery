module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define("item", {
    name: {
      type: Sequelize.STRING,
      allowNull: false      
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true      
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false      
    },
    itemPath: {
      type: Sequelize.STRING,
      allowNull: false      
    },
    fileName: {
      type: Sequelize.STRING,
      allowNull: false      
    },
    status: {
      type: Sequelize.ENUM('approved', 'rejected'),
      allowNull: true,      
    }
  });

  return Item;
};