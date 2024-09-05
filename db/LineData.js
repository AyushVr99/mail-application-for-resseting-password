export default (sequelize, DataTypes) => {
    const LineData = sequelize.define('LineData', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        month: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        points: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      }, {
        tableName: 'Linedata', // Table name in the database
        timestamps: false, // Disable createdAt and updatedAt columns
      });
  
    return LineData;
  };
  