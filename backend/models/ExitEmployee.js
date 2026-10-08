const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ExitEmployee = sequelize.define('exit_employee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  s_no: { type: DataTypes.FLOAT },
  sipl_id_no: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  vendor: { type: DataTypes.STRING(50) },
  cm_site: { type: DataTypes.STRING(50) },
  cm_id_no: { type: DataTypes.STRING(50) },
  name: { type: DataTypes.STRING(150) },
  doj: { type: DataTypes.DATEONLY },
  reliving_date: { type: DataTypes.DATEONLY }, // New field
  experience: { type: DataTypes.STRING(50) },
  mobile_number: { type: DataTypes.STRING(50) },
  dob: { type: DataTypes.DATEONLY },
  age: { type: DataTypes.FLOAT },
  gender: { type: DataTypes.STRING(20) },
  marital_status: { type: DataTypes.STRING(30) },
  aadhar_number: { type: DataTypes.STRING(50) },
  qualification: { type: DataTypes.STRING(150) },
  nationality: { type: DataTypes.STRING(50) },
  blood_group: { type: DataTypes.STRING(20) },
  religion: { type: DataTypes.STRING(50) },
  mail_id: { type: DataTypes.STRING(150) },
  father_name: { type: DataTypes.STRING(150) },
  mothers_name: { type: DataTypes.STRING(150) },
  emergency_contact_person: { type: DataTypes.STRING(150) },
  emergency_contact_no: { type: DataTypes.STRING(50) },
  permanent_country: { type: DataTypes.STRING(50) },
  permanent_district: { type: DataTypes.STRING(100) },
  permanent_city: { type: DataTypes.STRING(100) },
  permanent_address: { type: DataTypes.TEXT },
  permanent_pin_code: { type: DataTypes.STRING(20) },
  present_country: { type: DataTypes.STRING(50) },
  present_district: { type: DataTypes.STRING(100) },
  present_city: { type: DataTypes.STRING(100) },
  present_address: { type: DataTypes.TEXT },
  present_pin_code: { type: DataTypes.STRING(20) },
  boarding_point: { type: DataTypes.STRING(100) },
  department: { type: DataTypes.STRING(100) },
  stay_category: { type: DataTypes.STRING(50) },
  bank_name: { type: DataTypes.STRING(100) },
  ifsc_code: { type: DataTypes.STRING(30) },
  account_no: { type: DataTypes.STRING(50) },
  apron_size: { type: DataTypes.STRING(20) },
  esd_size: { type: DataTypes.STRING(20) },
  uan: { type: DataTypes.STRING(50) },
  esi: { type: DataTypes.STRING(50) },
  insurance_no: { type: DataTypes.STRING(50) },
  current_skill_level: { type: DataTypes.STRING(100) }, // New field
  reliving_reason: { type: DataTypes.TEXT }, // New field
}, {
  tableName: 'exit_employees',
  timestamps: true,
});

module.exports = { ExitEmployee };
