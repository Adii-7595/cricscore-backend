const express = require('express');

const router = express.Router();

const {
    syncGalleryList,
    syncAllGalleries,
    syncGalleryDetails,
    getPhotoGalleries,
    getGallery
} = require('../controllers/photoController');

router.post('/sync', syncGalleryList);

router.post('/sync-all', syncAllGalleries);

router.post('/sync/:galleryId', syncGalleryDetails);

router.get('/', getPhotoGalleries);

router.get('/:galleryId', getGallery);

module.exports = router;