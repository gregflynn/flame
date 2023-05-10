const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { grabFavicon } = require('favicongrab');
const asyncWrapper = require('../../middleware/asyncWrapper');
const Bookmark = require('../../models/Bookmark');

// @desc      Create new bookmark
// @route     POST /api/bookmarks
// @access    Public
const createBookmark = asyncWrapper(async (req, res, next) => {
  let bookmark;

  let body = {
    ...req.body,
    categoryId: parseInt(req.body.categoryId),
  };

  if (body.icon) {
    body.icon = body.icon.trim();
  }

  if (req.file) {
    body.icon = req.file.filename;
  }

  if (!body.icon) {
    // download that bad boi
    const grab = await grabFavicon(body.url);
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

      // make a unique local filename but also preserve the file extension
      const name = `${btoa(body.url)}__${path.basename(url)}`
      const downloadPath = path.resolve(process.cwd(), "data/uploads", name);
      const writer = fs.createWriteStream(downloadPath);

      const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
      });

      response.data.pipe(writer);
      body.icon = name;
    }
  }

  bookmark = await Bookmark.create(body);

  res.status(201).json({
    success: true,
    data: bookmark,
  });
});

module.exports = createBookmark;
