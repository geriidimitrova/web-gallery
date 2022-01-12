module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define("event", {
    title: {
      type: Sequelize.STRING,
      allowNull: false      
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,  
    },
    status: {
      type: Sequelize.ENUM('active', 'not active'),
      allowNull: true,      
    }
  });

  return Event;
};