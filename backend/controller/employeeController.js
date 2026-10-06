const xlsx = require('xlsx');
const { MasterData } = require('../models/MasterData');

// Utility to safely parse excel dates
function parseExcelDate(excelDate) {
  if (!excelDate) return null;
  if (typeof excelDate === 'number') {
    const date = new Date(Math.round((excelDate - 25569) * 86400 * 1000));
    return date.toISOString().split('T')[0];
  }
  const parsed = new Date(excelDate);
  return isNaN(parsed.getTime()) ? null : parsed.toISOString().split('T')[0];
}

const processExcelUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an Excel file (.xlsx or .xls).' });
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames.find(name => name.toLowerCase().includes('contact list')) || workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rawData = xlsx.utils.sheet_to_json(sheet, { defval: null });

    const metrics = {
      totalProcessed: 0,
      inserted: 0,
      updated: 0,
      errors: 0,
      errorDetails: []
    };

    const getVal = (row, ...searchKeys) => {
      const keys = Object.keys(row);
      for (const sk of searchKeys) {
        const foundKey = keys.find(k => k.toLowerCase().replace(/[^a-z0-9]/g, '') === sk.toLowerCase().replace(/[^a-z0-9]/g, ''));
        if (foundKey && row[foundKey] !== null && row[foundKey] !== undefined) return row[foundKey];
      }
      return null;
    };

    for (let i = 0; i < rawData.length; i++) {
      const row = rawData[i];
      
      const mappedRecord = {
        s_no: getVal(row, 'sno', 's_no', 's.no'),
        sipl_id_no: getVal(row, 'siplidno', 'siplid', 'sanidno', 'sanid'),
        vendor: getVal(row, 'vendor'),
        cm_site: getVal(row, 'cmsitename', 'cmsite', 'site'),
        cm_id_no: getVal(row, 'cmidno', 'cmid'),
        name: getVal(row, 'name'),
        doj: parseExcelDate(getVal(row, 'doj', 'dateofjoining')),
        experience: getVal(row, 'experience', 'exp'),
        mobile_number: String(getVal(row, 'mobilenumber', 'mobile', 'phone') || ''),
        dob: parseExcelDate(getVal(row, 'dob', 'dateofbirth')),
        age: getVal(row, 'age'),
        gender: getVal(row, 'gender', 'sex'),
        marital_status: getVal(row, 'maritalstatus'),
        aadhar_number: String(getVal(row, 'aadharnumber', 'aadhar', 'adharno', 'adhar') || ''),
        qualification: getVal(row, 'qualification', 'qual'),
        nationality: getVal(row, 'nationality'),
        blood_group: getVal(row, 'bloodgroup', 'blood'),
        religion: getVal(row, 'religion'),
        mail_id: getVal(row, 'mailid', 'email', 'mail'),
        father_name: getVal(row, 'fathername', 'father'),
        mothers_name: getVal(row, 'mothersname', 'mothername', 'mother'),
        emergency_contact_person: getVal(row, 'emergencycontactperson', 'emergencycontact'),
        emergency_contact_no: String(getVal(row, 'emergencycontactno', 'emergencyphone') || ''),
        permanent_country: getVal(row, 'permanentcountry'),
        permanent_district: getVal(row, 'permanentdistrict'),
        permanent_city: getVal(row, 'permanentcity'),
        permanent_address: getVal(row, 'permanentaddress'),
        permanent_pin_code: String(getVal(row, 'permanentpincode', 'permanentpin') || ''),
        present_country: getVal(row, 'presentcountry'),
        present_district: getVal(row, 'presentdistrict'),
        present_city: getVal(row, 'presentcity'),
        present_address: getVal(row, 'presentaddress'),
        present_pin_code: String(getVal(row, 'presentpincode', 'presentpin') || ''),
        boarding_point: getVal(row, 'boardingpoint'),
        department: getVal(row, 'department', 'dept'),
        stay_category: getVal(row, 'staycategory'),
        bank_name: getVal(row, 'bankname', 'bank'),
        ifsc_code: getVal(row, 'ifsccode', 'ifsc'),
        account_no: String(getVal(row, 'accountno', 'account') || ''),
        apron_size: getVal(row, 'apronsize', 'apron'),
        esd_size: getVal(row, 'esdsize', 'esd'),
        uan: String(getVal(row, 'uan') || ''),
        esi: String(getVal(row, 'esi') || ''),
        insurance_no: String(getVal(row, 'insuranceno', 'insurance') || ''),
      };

      if (!mappedRecord.sipl_id_no) {
        continue;
      }

      metrics.totalProcessed++;

      try {
        const existingRecord = await MasterData.findOne({ where: { sipl_id_no: mappedRecord.sipl_id_no } });

        if (existingRecord) {
          await existingRecord.update(mappedRecord);
          metrics.updated++;
        } else {
          await MasterData.create(mappedRecord);
          metrics.inserted++;
        }
      } catch (dbError) {
        metrics.errors++;
        metrics.errorDetails.push({
          row: i + 2,
          sipl_id: mappedRecord.sipl_id_no,
          message: dbError.message
        });
      }
    }

    if (metrics.totalProcessed === 0 && rawData.length > 0) {
      metrics.debugInfo = {
        message: "No rows processed. 'sipl_id_no' could not be matched.",
        availableColumns: Object.keys(rawData[0]),
        firstRow: rawData[0]
      };
    }

    return res.status(200).json({
      message: 'Master data processed successfully.',
      metrics
    });

  } catch (error) {
    console.error('File parsing error:', error);
    return res.status(500).json({ error: 'Failed to process file', details: error.message });
  }
};

module.exports = {
  processExcelUpload
};
