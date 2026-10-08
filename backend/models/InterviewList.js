const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const InterviewList = sequelize.define('interview_list', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  s_no: { type: DataTypes.FLOAT },
  date: { type: DataTypes.DATEONLY },
  name: { type: DataTypes.STRING(150) },
  contact_number: { type: DataTypes.STRING(50) },
  interview_date: { type: DataTypes.DATEONLY },
  email_id: { type: DataTypes.STRING(150) },
  location: { type: DataTypes.STRING(100) },
  status: { type: DataTypes.STRING(100) },
  resume_link: { type: DataTypes.TEXT },
  technical_knowledge: { type: DataTypes.TEXT },
  previous_organization: { type: DataTypes.STRING(150) },
  current_salary: { type: DataTypes.STRING(100) },
  expected_salary: { type: DataTypes.STRING(100) },
  notice_period: { type: DataTypes.STRING(100) },
  experience: { type: DataTypes.STRING(100) },
  comment: { type: DataTypes.TEXT },
  referred_by: { type: DataTypes.STRING(150) },
}, {
  tableName: 'interview_list',
  timestamps: true,
});

module.exports = { InterviewList };
