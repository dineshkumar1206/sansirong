const xlsx = require('xlsx');
const { MasterData } = require('../models/MasterData');
const { InterviewList } = require('../models/InterviewList');
const { ExitEmployee } = require('../models/ExitEmployee');

// Utility to safely parse excel dates
function parseExcelDate(excelDate) {
  try {
    if (!excelDate) return null;
    if (typeof excelDate === 'number') {
      const date = new Date(Math.round((excelDate - 25569) * 86400 * 1000));
      if (isNaN(date.getTime())) return null;
      return date.toISOString().split('T')[0];
    }
    const parsed = new Date(excelDate);
    return isNaN(parsed.getTime()) ? null : parsed.toISOString().split('T')[0];
  } catch (error) {
    return null; // Return null if date conversion throws RangeError or any other error
  }
}

const processExcelUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an Excel file (.xlsx or .xls).' });
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const masterSheetName = workbook.SheetNames.find(name => name.toLowerCase().includes('master data')) || workbook.SheetNames.find(name => name.toLowerCase().includes('contact list'));
    const interviewSheetName = workbook.SheetNames.find(name => name.toLowerCase().includes('interview list'));
    const exitSheetName = workbook.SheetNames.find(name => name.toLowerCase().includes('exit employee'));
    
    // Fallback if neither found, use first sheet as master data (legacy behavior)
    const activeMasterSheetName = masterSheetName || (!interviewSheetName && !exitSheetName ? workbook.SheetNames[0] : null);

    const masterMetrics = { totalProcessed: 0, inserted: 0, updated: 0, errors: 0, errorDetails: [] };
    const interviewMetrics = { totalProcessed: 0, inserted: 0, updated: 0, errors: 0, errorDetails: [] };
    const exitMetrics = { totalProcessed: 0, inserted: 0, updated: 0, errors: 0, errorDetails: [] };

    const getVal = (row, ...searchKeys) => {
      const keys = Object.keys(row);
      for (const sk of searchKeys) {
        const cleanSk = sk.toLowerCase().replace(/[^a-z0-9]/g, '');
        let foundKey = keys.find(k => k.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanSk);
        if (!foundKey) {
          foundKey = keys.find(k => k.toLowerCase().replace(/[^a-z0-9]/g, '').includes(cleanSk) || cleanSk.includes(k.toLowerCase().replace(/[^a-z0-9]/g, '')));
        }
        if (foundKey && row[foundKey] !== null && row[foundKey] !== undefined) return row[foundKey];
      }
      return null;
    };

    // 1. Process Master Data
    if (activeMasterSheetName && workbook.Sheets[activeMasterSheetName]) {
      const masterSheet = workbook.Sheets[activeMasterSheetName];
      const masterRawData = xlsx.utils.sheet_to_json(masterSheet, { defval: null });

      for (let i = 0; i < masterRawData.length; i++) {
        const row = masterRawData[i];
        
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

        if (!mappedRecord.sipl_id_no && !mappedRecord.name && !mappedRecord.mobile_number) continue; // Skip only entirely empty rows

        masterMetrics.totalProcessed++;
        try {
          let existingRecord = null;
          if (mappedRecord.sipl_id_no) {
            existingRecord = await MasterData.findOne({ where: { sipl_id_no: mappedRecord.sipl_id_no } });
          } else if (mappedRecord.name && mappedRecord.mobile_number) {
            existingRecord = await MasterData.findOne({ where: { name: mappedRecord.name, mobile_number: mappedRecord.mobile_number } });
          }

          if (existingRecord) {
            await existingRecord.update(mappedRecord);
            masterMetrics.updated++;
          } else {
            await MasterData.create(mappedRecord);
            masterMetrics.inserted++;
          }
        } catch (dbError) {
          masterMetrics.errors++;
          masterMetrics.errorDetails.push({ row: i + 2, sipl_id: mappedRecord.sipl_id_no || mappedRecord.name, message: dbError.message });
        }
      }
    }

    // 2. Process Interview List
    if (interviewSheetName && workbook.Sheets[interviewSheetName]) {
      const interviewSheet = workbook.Sheets[interviewSheetName];
      const interviewRawData = xlsx.utils.sheet_to_json(interviewSheet, { defval: null });

      for (let i = 0; i < interviewRawData.length; i++) {
        const row = interviewRawData[i];
        
        const mappedInterview = {
          s_no: getVal(row, 'sno', 's_no', 's.no'),
          date: parseExcelDate(getVal(row, 'date')),
          name: getVal(row, 'name'),
          contact_number: String(getVal(row, 'contactnumber', 'contact', 'mobile') || ''),
          interview_date: parseExcelDate(getVal(row, 'interviewdate')),
          email_id: getVal(row, 'emailid', 'email', 'mail'),
          location: getVal(row, 'location'),
          status: getVal(row, 'status'),
          resume_link: getVal(row, 'resumelink', 'resume'),
          technical_knowledge: getVal(row, 'technicalknowledge', 'techknowledge', 'technical'),
          previous_organization: getVal(row, 'previousorganization', 'prevorg'),
          current_salary: String(getVal(row, 'currentsalary') || ''),
          expected_salary: String(getVal(row, 'expectedsalary') || ''),
          notice_period: String(getVal(row, 'noticeperiod') || ''),
          experience: String(getVal(row, 'expereince', 'experience') || ''),
          comment: getVal(row, 'comment', 'comments'),
          referred_by: getVal(row, 'referedby', 'referredby', 'referral')
        };

        if (!mappedInterview.name && !mappedInterview.contact_number && !mappedInterview.email_id) continue;

        interviewMetrics.totalProcessed++;
        try {
          let existingRecord = null;
          if (mappedInterview.contact_number) {
            existingRecord = await InterviewList.findOne({ where: { contact_number: mappedInterview.contact_number, name: mappedInterview.name || '' } });
          } else if (mappedInterview.name) {
            existingRecord = await InterviewList.findOne({ where: { name: mappedInterview.name } });
          }

          if (existingRecord) {
            await existingRecord.update(mappedInterview);
            interviewMetrics.updated++;
          } else {
            await InterviewList.create(mappedInterview);
            interviewMetrics.inserted++;
          }
        } catch (dbError) {
          interviewMetrics.errors++;
          interviewMetrics.errorDetails.push({ row: i + 2, name: mappedInterview.name, message: dbError.message });
        }
      }
    }

    // 3. Process Exit Employees
    if (exitSheetName && workbook.Sheets[exitSheetName]) {
      const exitSheet = workbook.Sheets[exitSheetName];
      const exitRawData = xlsx.utils.sheet_to_json(exitSheet, { defval: null });

      for (let i = 0; i < exitRawData.length; i++) {
        const row = exitRawData[i];
        
        const mappedExit = {
          s_no: getVal(row, 'sno', 's_no', 's.no'),
          sipl_id_no: getVal(row, 'siplidno', 'siplid', 'sanidno', 'sanid'),
          vendor: getVal(row, 'vendor'),
          cm_site: getVal(row, 'cmsitename', 'cmsite', 'site'),
          cm_id_no: getVal(row, 'cmidno', 'cmid'),
          name: getVal(row, 'name'),
          doj: parseExcelDate(getVal(row, 'doj', 'dateofjoining')),
          reliving_date: parseExcelDate(getVal(row, 'relivingdate', 'relievingdate')),
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
          current_skill_level: getVal(row, 'currentskilllevel', 'skilllevel', 'skill'),
          reliving_reason: getVal(row, 'relivingreason', 'relievingreason', 'reason'),
        };

        if (!mappedExit.name && !mappedExit.sipl_id_no && !mappedExit.mobile_number) continue; // Skip only entirely empty rows

        exitMetrics.totalProcessed++;
        try {
          let existingRecord = null;
          if (mappedExit.sipl_id_no) {
            existingRecord = await ExitEmployee.findOne({ where: { sipl_id_no: mappedExit.sipl_id_no } });
          } else if (mappedExit.name && mappedExit.mobile_number) {
            existingRecord = await ExitEmployee.findOne({ where: { name: mappedExit.name, mobile_number: mappedExit.mobile_number } });
          } else if (mappedExit.name) {
            existingRecord = await ExitEmployee.findOne({ where: { name: mappedExit.name } });
          }

          if (existingRecord) {
            await existingRecord.update(mappedExit);
            exitMetrics.updated++;
          } else {
            await ExitEmployee.create(mappedExit);
            exitMetrics.inserted++;
          }
        } catch (dbError) {
          exitMetrics.errors++;
          exitMetrics.errorDetails.push({ row: i + 2, sipl_id: mappedExit.sipl_id_no || mappedExit.name, message: dbError.message });
        }
      }
    }

    return res.status(200).json({
      message: 'Excel file processed successfully.',
      metrics: {
        masterData: masterMetrics,
        interviewList: interviewMetrics,
        exitEmployees: exitMetrics
      }
    });

  } catch (error) {
    console.error('File parsing error:', error);
    require('fs').writeFileSync('upload_error.txt', error.stack || error.message);
    return res.status(500).json({ error: 'Failed to process file', details: error.message });
  }
};

const getDashboardStats = async (req, res) => {
  const { Op } = require('sequelize');
  const { vendor, site } = req.query;

  try {
    const whereClause = {};
    if (vendor && vendor !== 'ALL') whereClause.vendor = vendor;
    if (site && site !== 'ALL') whereClause.cm_site = site;

    const totalEngineers = await MasterData.count({ where: whereClause });

    // avg age
    const avgAgeResult = await MasterData.findAll({
      attributes: [[MasterData.sequelize.fn('AVG', MasterData.sequelize.col('age')), 'avgAge']],
      where: whereClause,
      raw: true
    });
    const avgAge = avgAgeResult[0]?.avgAge ? parseFloat(avgAgeResult[0].avgAge).toFixed(1) : 0;

    // vendors and counts
    const vendorCounts = await MasterData.sequelize.query(
      "SELECT vendor, COUNT(*) as count FROM master_data WHERE vendor IS NOT NULL AND vendor != '' GROUP BY vendor",
      { type: MasterData.sequelize.QueryTypes.SELECT }
    );

    // cm sites and counts
    const cmSiteCounts = await MasterData.sequelize.query(
      "SELECT cm_site, COUNT(*) as count FROM master_data WHERE cm_site IS NOT NULL AND cm_site != '' GROUP BY cm_site",
      { type: MasterData.sequelize.QueryTypes.SELECT }
    );

    // matrix data
    const matrixData = await MasterData.sequelize.query(
      "SELECT vendor, cm_site, COUNT(*) as count FROM master_data WHERE vendor IS NOT NULL AND vendor != '' AND cm_site IS NOT NULL AND cm_site != '' GROUP BY vendor, cm_site",
      { type: MasterData.sequelize.QueryTypes.SELECT }
    );


    return res.status(200).json({
      engineers: totalEngineers,
      avgAge: avgAge,
      vendors: vendorCounts,
      cmSites: cmSiteCounts,
      matrix: matrixData
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await MasterData.findAll();
    return res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    return res.status(500).json({ error: 'Failed to fetch employees' });
  }
};

const getInterviewStats = async (req, res) => {
  try {
    const totalCandidates = await InterviewList.count();
    
    // We should parse technical knowledge or status to define Good/Avg/Low
    // For now, let's just group by technical_knowledge if available. 
    // Or we can just count statuses if they mention 'good' etc.
    const allCandidates = await InterviewList.findAll({ attributes: ['technical_knowledge', 'status'] });
    
    let goodCount = 0;
    let avgCount = 0;
    let lowCount = 0;
    let joinedCount = 0;

    allCandidates.forEach(c => {
      const tech = (c.technical_knowledge || '').toLowerCase();
      const status = (c.status || '').toLowerCase();
      
      if (tech.includes('good') || tech.includes('excellent') || tech.includes('high')) goodCount++;
      else if (tech.includes('avg') || tech.includes('average') || tech.includes('medium')) avgCount++;
      else if (tech.includes('low') || tech.includes('poor') || tech.includes('bad')) lowCount++;
      
      if (status.includes('joined') || status.includes('hired') || status.includes('selected') || status.includes('fit') || status.includes('working')) {
        joinedCount++;
      }
    });

    return res.status(200).json({
      totalCandidates,
      ratedGood: goodCount,
      joined: joinedCount,
      techRatingMix: {
        good: goodCount,
        average: avgCount,
        low: lowCount,
      }
    });
  } catch (error) {
    console.error('Error fetching interview stats:', error);
    return res.status(500).json({ error: 'Failed to fetch interview stats' });
  }
};

const getInterviewList = async (req, res) => {
  try {
    const interviews = await InterviewList.findAll();
    return res.status(200).json(interviews);
  } catch (error) {
    console.error('Error fetching interview list:', error);
    return res.status(500).json({ error: 'Failed to fetch interview list' });
  }
};

const getExitsData = async (req, res) => {
  try {
    const exits = await ExitEmployee.findAll();
    const activeEmployees = await MasterData.findAll({ attributes: ['vendor'] });

    const totalExits = exits.length;
    const totalActive = activeEmployees.length;
    const attritionRate = totalActive + totalExits > 0 ? Math.round((totalExits / (totalActive + totalExits)) * 100) : 0;

    let totalMonths = 0;
    let tenureBins = { '<1 mo': 0, '1-3': 0, '3-6': 0, '6-12': 0, '12+': 0 };
    let vendorExitsMap = {};
    let vendorActiveMap = {};

    activeEmployees.forEach(emp => {
      const v = emp.vendor || 'Unknown';
      vendorActiveMap[v] = (vendorActiveMap[v] || 0) + 1;
    });

    const tableData = exits.map(emp => {
      let tenureMonths = 0;
      if (emp.doj && emp.reliving_date) {
        const d1 = new Date(emp.doj);
        const d2 = new Date(emp.reliving_date);
        tenureMonths = Math.max(0, (d2.getFullYear() - d1.getFullYear()) * 12 + d2.getMonth() - d1.getMonth());
      }
      totalMonths += tenureMonths;

      if (tenureMonths < 1) tenureBins['<1 mo']++;
      else if (tenureMonths <= 3) tenureBins['1-3']++;
      else if (tenureMonths <= 6) tenureBins['3-6']++;
      else if (tenureMonths <= 12) tenureBins['6-12']++;
      else tenureBins['12+']++;

      const v = emp.vendor || 'Unknown';
      vendorExitsMap[v] = (vendorExitsMap[v] || 0) + 1;

      return {
        id: emp.id,
        name: emp.name || 'Unknown',
        vendor: emp.vendor || '-',
        site: emp.cm_site || '-',
        joined: emp.doj || '-',
        left: emp.reliving_date || '-',
        tenure: tenureMonths ? `${tenureMonths} mo` : '—',
        cert: emp.current_skill_level || '—',
        reason: emp.reliving_reason || 'Not specified'
      };
    });

    const avgTenure = totalExits > 0 ? Math.round(totalMonths / totalExits) : 0;

    const exitsByVendorData = Object.keys(vendorExitsMap)
      .map(vendor => ({ name: vendor, value: vendorExitsMap[vendor], fill: '#d32f2f' }))
      .sort((a, b) => b.value - a.value);

    const attritionRateData = Object.keys(vendorExitsMap).map(vendor => {
      const active = vendorActiveMap[vendor] || 0;
      const exitCount = vendorExitsMap[vendor];
      const rate = active + exitCount > 0 ? Math.round((exitCount / (active + exitCount)) * 100) : 0;
      let fill = '#fcd34d';
      if (rate >= 50) fill = '#ef4444';
      else if (rate >= 30) fill = '#fb923c';
      else if (rate >= 20) fill = '#f59e0b';
      return { name: vendor, value: rate, fill };
    }).sort((a, b) => b.value - a.value);

    const tenureData = [
      { name: '<1 mo', value: tenureBins['<1 mo'], fill: '#0ea5e9' },
      { name: '1-3', value: tenureBins['1-3'], fill: '#0ea5e9' },
      { name: '3-6', value: tenureBins['3-6'], fill: '#0ea5e9' },
      { name: '6-12', value: tenureBins['6-12'], fill: '#0ea5e9' },
      { name: '12+', value: tenureBins['12+'], fill: '#0ea5e9' }
    ];

    return res.status(200).json({
      totalExits,
      avgTenure,
      attritionRate,
      exitsByVendorData,
      attritionRateData,
      tenureData,
      tableData
    });
  } catch (error) {
    console.error('Error fetching exits data:', error);
    return res.status(500).json({ error: 'Failed to fetch exits data' });
  }
};

const getBirthdays = async (req, res) => {
  try {
    const employees = await MasterData.findAll({ attributes: ['name', 'dob', 'cm_site', 'department', 'vendor'] });
    
    // Get current month (0-indexed in JS, but 1-indexed in our logic if we use mm)
    const currentMonth = new Date().getMonth() + 1; // 1-12
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const currentMonthName = monthNames[currentMonth - 1];

    const currentMonthBirthdays = [];

    employees.forEach(emp => {
      if (emp.dob) {
        const parts = emp.dob.split('-');
        if (parts.length === 3) {
          // dob is YYYY-MM-DD
          const month = parseInt(parts[1], 10);
          const day = parseInt(parts[2], 10);
          
          if (month === currentMonth) {
            currentMonthBirthdays.push({
              day: day.toString(),
              month: currentMonthName,
              name: emp.name || 'Unknown',
              desc: `${emp.cm_site || emp.vendor || 'Unknown'} • ${emp.department || 'OSS'}`
            });
          }
        }
      }
    });

    // Sort by day ascending
    currentMonthBirthdays.sort((a, b) => parseInt(a.day) - parseInt(b.day));

    return res.status(200).json({
      monthName: currentMonthName,
      count: currentMonthBirthdays.length,
      birthdays: currentMonthBirthdays
    });

  } catch (error) {
    console.error('Error fetching birthdays:', error);
    return res.status(500).json({ error: 'Failed to fetch birthdays' });
  }
};

const addEmployee = async (req, res) => {
  try {
    const data = req.body;
    if (!data.sipl_id_no) {
      return res.status(400).json({ error: 'SIPL ID is required' });
    }

    const existing = await MasterData.findOne({ where: { sipl_id_no: data.sipl_id_no } });
    if (existing) {
      return res.status(400).json({ error: 'Duplicate entry: SIPL ID already exists in the database' });
    }

    const newEmployee = await MasterData.create({
      name: data.name,
      sipl_id_no: data.sipl_id_no,
      vendor: data.vendor,
      cm_site: data.cm_site,
      age: data.age,
      gender: data.gender,
      qualification: data.qualification,
      doj: data.doj,
      experience: data.experience,
      mobile_number: data.mobile_number,
      department: data.department,
      permanent_district: data.permanent_district,
      blood_group: data.blood_group,
      mail_id: data.mail_id,
    });

    return res.status(201).json({ message: 'Employee added successfully to Master Data', employee: newEmployee });
  } catch (error) {
    console.error('Error adding employee:', error);
    return res.status(500).json({ error: 'Failed to add employee' });
  }
};

module.exports = {
  processExcelUpload,
  getDashboardStats,
  getEmployees,
  getInterviewStats,
  getInterviewList,
  getExitsData,
  getBirthdays,
  addEmployee
};
