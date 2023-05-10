const { grabFavicon } = require('favicongrab');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

const downloadImg = async (prefix, url) => {
  // make a unique local filename but also preserve the file extension
  const name = `${prefix}__${path.basename(url)}`
  const downloadPath = path.resolve(process.cwd(), "data/uploads", name);
  const writer = fs.createWriteStream(downloadPath);

  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });

    response.data.pipe(writer);
  } catch {
    return null;
  }

  return name;
};

const downloadIcon = async (bookmarkUrl) => {
  const grab = await grabFavicon(bookmarkUrl);
  let icons = grab.icons;

  if (icons.length > 0) {
    // sort so idx 0 is the highest resolution available
    icons = icons.sort((a, b) => {
      const aSize = a.sizes ? parseInt(a.sizes) : 0;
      const bSize = b.sizes ? parseInt(b.sizes) : 0;
      if (isNaN(aSize) && isNaN(bSize)) {
        return 0;
      } else if (isNaN(aSize)) {
        return -1;
      } else if (isNaN(bSize)) {
        return 1;
      }
      return bSize - aSize;
    });
    const url = icons[0].src;

    // try icons until one works
    for (let i = 0; i < icons.length; ++i) {
      const name = downloadImg(btoa(bookmarkUrl), url);
      if (name) {
        return name;
      }
    }
  }

  return "";
};

module.exports = downloadIcon;
