const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
      allowNull: false      
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false      
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false      
    },
    isActive: {
      type: Sequelize.ENUM('yes', 'no'),
      allowNull: false,      
    },
    isAdmin: {
      type: Sequelize.ENUM('yes', 'no'),
      allowNull: false,      
    }
  }, {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
        beforeUpdate:async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    },
    instanceMethods: {
      validPassword: (password) => {
        return bcrypt.compareSync(password, this.password);
      }
    }
  });

  User.prototype.validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
  }

  return User;
};