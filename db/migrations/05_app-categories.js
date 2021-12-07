const { DataTypes } = require('sequelize');
const { INTEGER } = DataTypes;

const up = async (query) => {
  await query.addColumn('categories', 'type', {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'bookmarks'
  });
  await query.addColumn('apps', 'categoryId', {
    type: INTEGER,
    allowNull: true,
    defaultValue: -1,
  });
};

const down = async (query) => {
  await query.removeColumn('apps', 'categoryId');
  await query.removeColumn('categories', 'type');
};

module.exports = {
  up,
  down,
};
