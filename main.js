import { API } from './scripts/api.js';
import { getLocal } from './scripts/helpers.js';
import {
  ele,
  renderLoader,
  renderUserInfo,
  renderTimeline,
  renderResults,
  renderDetail,
  renderDetailLoading,
  renderUserPage,
} from './scripts/ui.js';

// lokal'den kullanıcı bilgilerini al
const user = getLocal('USER');

// url'deki path değerine göre ekranın
// orta kısmına basılcak içerği belirler
const router = async () => {
  // url'deki arama parametreleirne erişme
  const params = new URLSearchParams(location.search);
  const page = params.get('page');
  const query = params.get('q');

  //  page'in değerine göre ekrana basılcak
  // arayüze karra verme
  switch (page) {
    // tweet detay
    case 'status':
      // loadingi ekrana bas
      renderDetailLoading();
      // tweet detayları için api isteği
      const tweetData = await API.fetchData(`/tweet.php?id=${query}`);
      // detaları ekrana bas
      renderDetail(tweetData);
      break;
    // arama sayfası
    case 'search':
      renderLoader(ele.main);
      const results = await API.fetchData(
        `/search.php?query=${query}`
      );
      renderResults(results, ele.main);
      break;
    // kullanıcı detay sayfası
    case 'user':
      // kullanıcnın hesap bilgilerini basma
      renderLoader(ele.main);
      const userInfo = await API.getUser(query);
      renderUserPage(userInfo);
      // kullanıncın tweetlerini basma
      const outlet = document.querySelector('.page-bottom');
      renderLoader(outlet);
      const userTweet = await API.fetchData(
        `/timeline.php?screenname=${query}`
      );
      renderTimeline(userTweet, outlet);
      break;
    //  ana sayfayı ekrana bas
    default:
      // yüklenme ekranı basıcaz
      renderLoader(ele.tweetsArea);

      // kullanıcının tweet'lerini alma
      const data = await API.fetchData(
        `/timeline.php?screenname=${user.profile}`
      );

      // tweet'leri ekrana bas
      renderTimeline(data, ele.tweetsArea);

      break;
  }
};

// sayfanın yüklenme anını izler
document.addEventListener('DOMContentLoaded', () => {
  if (user) {
    // kullanıcı varsa bilgileri ekrana bas
    renderUserInfo(user);
  } else {
    // kullanııc yoksa login sayfasına yönlendir
    location = '/auth.html';
  }
  // hangi sayfanın ekrana basılacağına karar vericek
  router();
});

// çıkış butonuna tıklanmada oturumu kapat
ele.logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('USER');
  location = '/auth.html';
});

// form gönderilidğinde
ele.form.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = e.target[0].value;
  // sayfa değiş
  // aratılan terimi parametre olarak ekle
  location = `?page=search&q=${query}`;
});

//geri butonuna tıklandığında
ele.main.addEventListener('click', (e) => {
  if (e.target.id === 'back-btn') {
    // bir adım geriye git
    history.back();
  }
});
