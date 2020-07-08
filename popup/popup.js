'use strict';
let mainData;
let date = new Date();
let getTodayDate = document.querySelector('.date');
let wrapper = document.querySelector('.wrapper');

getTodayDate.innerHTML = formatDate(date);

function formatDate(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear() % 100;

  if (day < 10) day = '0' + day;
  if (month < 10) month = '0' + month;
  if (year < 10) year = '0' + year;

  return `${day}.${month}.${year}`;
}

function render(data) {

  let buy = parseFloat(data.buy).toFixed(2);
  let sale = parseFloat(data.sale).toFixed(2);

  return `
           <div class="container">
            <span class="currency">1 ${data.ccy} =</span>
            <p class="sum buy"><span class="title">покупка</span> ${buy}</p>
            <p class="sum sale"><span class="title title_modify">продажа</span> ${sale}</p>
            <span class="nation-currency">UAH</span>
           </div>
         `
}

fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
   .then(function (response) {
   if (response.status !== 200) {
     return Promise.reject(new Error(response.statusText))
   }
   return Promise.resolve(response)
 })
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {

    let getObjectData = data.filter(item => ['USD', 'EUR', 'RUR'].includes(item.ccy)).reduce((acc, item) => {
      acc[item.ccy] = item;
      return acc
    }, {});

    let test2 = Object.values(getObjectData);
    let test3 = '';

    test2.forEach((item) => {
      test3 += render(item);
    });

    wrapper.innerHTML = test3;

  })
   .catch(function (error) {
     console.log('error', error);
   });