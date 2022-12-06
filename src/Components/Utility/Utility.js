import axios from 'axios';
export const BASE_URL = 'http://localhost:5050/api/v1/';

export function ExcelDateToJSDate(serial) {
  var utc_days = Math.floor(serial - 25569);
  var utc_value = utc_days * 86400;
  var date_info = new Date(utc_value * 1000);
  return new Date(
    date_info.getFullYear(),
    date_info.getMonth(),
    date_info.getDate()
  );
}

export function Copy2DArray(array) {
  return array.map(row => [...row]);
}

export async function fetchData(url){
  const response = await axios.get(url)
  return response.data;
}

export async function postData(url,body = {},options = {}){
  const response = await axios.post(url, body,options);
  return response.data;
}

// async function sendEmail(templateParams){
//   await emailjs.send("service_8bnq1as", "template_ua5boue", templateParams,'1vpxuEBh1k-XNwY93')
// }

// export function mailEmailsList(emailList){
//   emailList.forEach(async m => {
//     let templateParams = {
//       to_name: m.f_name + ' ' + m.l_name,
//       from_name: 'SalaryFlow',
//       email_id: m.email,
//       password : m.password
//     };
//     emailjs.send("service_8bnq1as", "template_ua5boue", templateParams,'1vpxuEBh1k-XNwY93');
//   })
// }