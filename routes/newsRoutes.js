const express = require('express');

const router = express.Router();

const {
    syncNewsList,
    syncNewsDetail,
    syncAllNews,
    getNews,
    getNewsById
} = require('../controllers/newsController');


router.post('/sync', syncNewsList);
router.post('/sync-all', syncAllNews);
router.post('/sync/:storyId', syncNewsDetail);

router.get('/', getNews);
router.get('/:storyId', getNewsById);

module.exports = router;