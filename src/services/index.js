const QRCode = require("qrcode");

const generateQrcode = async (authCod) => {
  return await QRCode.toDataURL(authCod);
};

const generateAuthCod = () => {
  const first = generateRandomString(8);
  const second = generateRandomString(4);
  const third = generateRandomString(4);
  const fourth = generateRandomString(4);
  const fifth = generateRandomString(12);
  const hash = `${first}-${second}-${third}-${fourth}-${fifth}`;
  return hash.toUpperCase();
};

const generateRandomString = (size) => {
  return Math.random().toString(36).substr(2, size);
};

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
}

module.exports = {
  generateQrcode,
  generateAuthCod,
  isEmpty
};
