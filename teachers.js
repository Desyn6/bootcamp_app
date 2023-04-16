const cohortName = process.argv[2];
const values = [`%${cohortName}%`];

const query = `
SELECT DISTINCT teachers.name as teacher, cohorts.name
  FROM teachers
  JOIN assistance_requests ON teacher_id = teachers.id
  JOIN students ON students.id = student_id
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1;
`;

const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(query, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name}: ${user.teacher}`)
  })
});