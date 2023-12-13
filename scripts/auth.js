import { API } from './api.js';
import { setLocal } from './helpers.js';

const authEle = {
  loginForm: document.querySelector('#login'),
  nameInp: document.querySelector('#name'),
  passInp: document.querySelector('#pass'),
  nameArea: document.querySelector('.name-warning'),
  passArea: document.querySelector('.pass-warning'),
};

// şifre kuralları
// min 1 büyük ve küçük harf
// sayı
// özel karakter
// min 8 karakter
const regex =
  '(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$';

// isim ve şifreyi kontrol eder
const checkValues = (name, pass) => {
  let isPassError = false;
  let isNameError = false;

  // isimi kontrol eder hataları ekrana basar
  if (!name) {
    isNameError = true;
    authEle.nameArea.innerHTML = `<p class="warning">Lütfen isim giriniz</p>`;
  } else if (name.length <= 3) {
    isNameError = true;
    authEle.nameArea.innerHTML = `<p class="warning">İsim 3 karakterden uzun olmalı</p>`;
  } else {
    let isNameError = false;
    authEle.nameArea.innerHTML = '';
  }

  //   şifre kontrol
  if (!pass) {
    isPassError = true;
    authEle.passArea.innerHTML = `<p class="warning">Lütfen şifre giriniz</p>`;
  } else if (pass.length < 8) {
    isPassError = true;
    authEle.passArea.innerHTML = `<p class="warning">Şifre 8 karakterden kısa olamaz</p>`;
  } else if (!pass.match(regex)) {
    isPassError = true;
    authEle.passArea.innerHTML = `<p class="warning">Şifre yeterince güçlü değil</p>`;
  } else {
    isPassError = false;
    authEle.passArea.innerHTML = '';
  }

  //   fonksiyonun döndürüceği değeri belirleme
  if (isNameError || isPassError) {
    return false;
  } else {
    return true;
  }
};

// formun gönderilme olayını izleme
authEle.loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // değerlere erişme
  const name = authEle.nameInp.value;
  const pass = authEle.passInp.value;

  //   kontrolden geçerse hesap bilgilerini al
  if (checkValues(name, pass)) {
    API.getUser(name)
      .then((data) => {
        // kullanıcı bilgeilrini lokale'e kaydedicez
        // bu  sayede daha önce oturum açmış mı öğrenicez
        setLocal('USER', data);

        // ana sayfaya yönlendir
        window.location = '/';
      })
      .catch((err) =>
        alert('Kullanıcı bilgilerine erişşirken hata oluştu')
      );
  }
});
