// loacla stoage a kaydetme
export const setLocal = (key, value) => {
  // string'e çevir
  const strData = JSON.stringify(value);
  // lokal'e kaydeder
  localStorage.setItem(key, strData);
};

// lokal'den veri çekme
export const getLocal = (key) => {
  // lokalden veriye eriş
  const strData = localStorage.getItem(key);
  //   fonksiyonun çaprıldığı yere gönder
  return JSON.parse(strData);
};
