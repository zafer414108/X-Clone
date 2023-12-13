export const ele = {
  user_name: document.getElementById('user-name'),
  user_tag: document.getElementById('user-tag'),
  pics: document.querySelectorAll('#profile-pic'),
  tweetsArea: document.querySelector('.tweets-area'),
  logoutBtn: document.querySelector('#logout-btn'),
  form: document.querySelector('aside form'),
  main: document.querySelector('main'),
};

// kullanıcı bilgilerini ekrna basar
export const renderUserInfo = (user) => {
  // kullanıcı resimlerini ekran bas
  ele.pics.forEach((img) => (img.src = user.avatar));

  // kullanıcı ismini ekrana bas
  ele.user_name.innerText = user.name;
  ele.user_tag.innerText = '@' + user.profile;
};

// yüklenme gifini ekrana basar
export const renderLoader = (outlet) => {
  outlet.innerHTML = `
    <div class="d-flex justify-content-center my-5">
     <div class="spinner-grow" role="status">
      <span class="visually-hidden">Loading...</span>
     </div>
   </div>
    `;
};

// tweet'in medyasına göre html oluşturur
export const getMedia = (media) => {
  if (media.photo) {
    // img etiketi oluştur
    return `<img src="${media.photo[0].media_url_https}"/> `;
  }

  if (media.video) {
    // video etiketi oluştur
    const mp4 = media.video[0].variants[0].url;
    return `
    <video controls>
       <source src="${mp4}" /> 
    </video>`;
  }

  return '';
};

// ekana tweetleri basıcak fonk
export const renderTimeline = (data, outlet) => {
  outlet.innerHTML = data.timeline
    .map(
      (i) => `
        <div class="tweet">
          <img id="user-img" src="${data.user.avatar}" />
          <div class="body">
            <div class="user">
              <a href="?page=user&q=${data.user.profile}">
               <img  class="mobile-img" src="${data.user.avatar}" />
                <b>${data.user.name}</b>
                <p>@${data.user.profile}</p>
                <p>${moment(i.created_at).fromNow()}</p>
              </a>
              <i class="bi bi-three-dots"></i>
            </div>
            <a href="?page=status&q=${i.tweet_id}" class="content">
              <p>${i.text}</p>
              ${getMedia(i.media)}
            </a>
            <div class="buttons">
              <button>
                <i class="bi bi-chat"></i>
                <span>${i.replies}</span>
              </button>
              <button>
                <i class="bi bi-recycle"></i>
                <span>${i.retweets}</span>
              </button>
              <button>
                <i class="bi bi-heart"></i>
                <span>${i.favorites}</span>
              </button>
              <button>
                <i class="bi bi-bookmark"></i>
                <span>${i.bookmarks}</span>
              </button>
            </div>
          </div>
        </div>
  `
    )
    .join('');
};

// ekana tweetleri basıcak fonk
export const renderResults = (data, outlet) => {
  outlet.innerHTML = data.timeline
    .map(
      (i) => `
        <div class="tweet">
          <img id="user-img" src="${i.user_info.avatar}" />
          <div class="body">
            <div class="user">
              <a href="?page=user&q=${i.user_info.screen_name}">
               <img  class="mobile-img" src="${i.user_info.avatar}" />
                <b>${i.user_info.name}</b>
                <p>@${i.user_info.screen_name}</p>
                <p>${moment(i.created_at).fromNow()}</p>
              </a>
              <i class="bi bi-three-dots"></i>
            </div>
            <a href="?page=status&q=${i.tweet_id}" class="content">
              <p>${i.text}</p>
              ${getMedia(i.media)}
            </a>
            <div class="buttons">
              <button>
                <i class="bi bi-chat"></i>
                <span>${i.replies}</span>
              </button>
              <button>
                <i class="bi bi-recycle"></i>
                <span>${i.retweets}</span>
              </button>
              <button>
                <i class="bi bi-heart"></i>
                <span>${i.favorites}</span>
              </button>
              <button>
                <i class="bi bi-bookmark"></i>
                <span>${i.bookmarks}</span>
              </button>
            </div>
          </div>
        </div>
  `
    )
    .join('');
};

// detay sayfası için loading
export const renderDetailLoading = () => {
  ele.main.innerHTML = `
    <div class="nav">
     <i id="back-btn" class="bi bi-arrow-left"></i>
     <h4>Gönderi</h4>
    </div>

    <div class="d-flex justify-content-center my-5">
     <div class="spinner-grow" role="status">
      <span class="visually-hidden">Loading...</span>
     </div>
   </div>

  `;
};

// tweet detaylarını ekrana basar
export const renderDetail = (data) => {
  ele.main.innerHTML = `
  <div class="nav">
   <i id="back-btn" class="bi bi-arrow-left"></i>
   <h4>Gönderi</h4>
  </div>
          <div class="tweet detail-tweet">
          <img id="user-img" src="${data.author.image}" />
          <div class="body">
            <div class="user">
              <a href="?page=user&q=${data.author.screen_name}">
               <img  class="mobile-img" src="${data.author.image}" />
                <b>${data.author.name}</b>
                <p>@${data.author.screen_name}</p>
              </a>
              <div>
              <button>Takip Et</button>
              <i class="bi bi-three-dots"></i>
              </div>
            </div>
            <div class="content">
              <p>${data.text}</p>
              ${getMedia(data.media)}
            </div>
   
            <div class="info">
               <p>${new Date(data.created_at).toTimeString()}</p>
                <i class="bi bi-body-text"></i>
                <span id="count">${data.views}</span>
                <span>Görüntülenme</span>
            </div>
            
            <div class="buttons">
              <button>
                <i class="bi bi-chat"></i>
                <span>${data.replies}</span>
              </button>
              <button>
                <i class="bi bi-recycle"></i>
                <span>${data.retweets}</span>
              </button>
              <button>
                <i class="bi bi-heart"></i>
                <span>${data.likes}</span>
              </button>
              <button>
                <i class="bi bi-bookmark"></i>
                <span>${data.bookmarks}</span>
              </button>
            </div>
          </div>
        </div>
  `;
};

//* hesap bilgilerini ekran basan
export const renderUserPage = (data) => {
  ele.main.innerHTML = `
    <div class="user-page">
        <div class="page-top">
          <div class="top">
            <i id="back-btn" class="bi bi-arrow-left"></i>
            <div>
              <h3>${data.name}</h3>
              <span>${Math.round(Math.random() * 9000)} gönderi</span>
            </div>
          </div>
          <div class="banner">
            <img
              src="https://picsum.photos/1080/360"
            />
            <img
              class="user-pp"
              src="${data.avatar}"
            />
          </div>
          <div class="buttons">
            <div class="icon">
              <i class="bi bi-three-dots"></i>
            </div>
            <div class="icon">
              <i class="bi bi-envelope"></i>
            </div>
            <button>Takip Et</button>
          </div>

          <!-- kullanıcı bilgi alanı -->
          <div class="info">
            <h4><span>${data.name}</span> ${
    data.blue_verified &&
    '<i class="bi bi-patch-check-fill text-info"></i>'
  } </h4>
            <p class="profile">@${data.profile}</p>

            <p class="content">
              ${data.desc}
            </p>

            <div>
              <a href="#">
                <span>${data.friends}</span>
                <span>Takip Edilen</span>
              </a>
              <a href="#">
                <span>${data.sub_count}</span>
                <span>Takipçi</span>
              </a>
            </div>
          </div>

          <!-- seçme kısmı -->
          <div class="radio-input">
            <label>
              <input
                type="radio"
                id="value-1"
                name="value-radio"
                value="value"
                checked
              />
              <span>Gönderiler</span>
            </label>
            <label>
              <input
                type="radio"
                id="value-2"
                name="value-radio"
                value="value-2"
              />
              <span>Yanıtlar</span>
            </label>
            <label>
              <input
                type="radio"
                id="value-3"
                name="value-radio"
                value="value-3"
              />
              <span>Medya</span>
            </label>
            <label>
              <input
                type="radio"
                id="value-4"
                name="value-radio"
                value="value-4"
              />
              <span>Beğeni</span>
            </label>
            <span class="selection"></span>
          </div>
        </div>
        <div class="page-bottom"></div>
      </div>
  `;
};
