const PhotoGallery = require('../models/PhotoGallery');
const Photo = require('../models/Photo');
const photoService = require('../services/photoService');
const { getCricbuzzImageUrl } = require('../utils/imageUtils');

exports.syncGalleryList = async (req, res) => {

    try {

        const data = await photoService.getGalleryList();

        const galleries = data.photoGalleryInfoList
            .filter(item => item.photoGalleryInfo);

        let saved = 0;

        for (const item of galleries) {

            const gallery = item.photoGalleryInfo;

            await PhotoGallery.findOneAndUpdate(

                {
                    galleryId: gallery.galleryId
                },

                {
                    galleryId: gallery.galleryId,

                    headline: gallery.headline,

                    coverImageId: gallery.imageId,

                    imageHash: gallery.imageHash || null,

                    publishedTime: new Date(
                        Number(gallery.publishedTime)
                    )
                },

                {
                    upsert: true,
                    returnDocument: 'after'

                }

            );

            saved++;
        }

        res.status(200).json({

            success: true,

            total: saved,

            message: 'Photo galleries synced successfully.'

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

exports.syncGalleryDetails = async (req, res) => {

    try {

        const { galleryId } = req.params;

        const data = await photoService.getGalleryDetails(galleryId);

        await PhotoGallery.findOneAndUpdate(

            { galleryId: Number(galleryId) },

            {
                intro: data.intro,
                state: data.state,
                tags: data.tags || [],
                imageCount: data.photoGalleryDetails.length,
                isSynced: true
            },

            {
                returnDocument: 'after'

            }

        );

        await Photo.deleteMany({
            galleryId: Number(galleryId)
        });

        const photos = data.photoGalleryDetails.map(photo => ({

            galleryId: Number(galleryId),

            imageId: photo.imageId,

            caption: photo.caption

        }));

        await Photo.insertMany(photos);

        res.status(200).json({

            success: true,

            total: photos.length,

            message: "Gallery synced successfully."

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

exports.syncAllGalleries = async (req, res) => {

    try {

        // Sync latest gallery list
        const data = await photoService.getGalleryList();

        const galleries = data.photoGalleryInfoList
            .filter(item => item.photoGalleryInfo);

        for (const item of galleries) {

            const gallery = item.photoGalleryInfo;

            await PhotoGallery.findOneAndUpdate(

                {
                    galleryId: gallery.galleryId
                },

                {
                    galleryId: gallery.galleryId,
                    headline: gallery.headline,
                    coverImageId: gallery.imageId,
                    imageHash: gallery.imageHash || null,
                    publishedTime: new Date(Number(gallery.publishedTime))
                },

                {
                    upsert: true,
                    returnDocument: 'after'

                }

            );
        }

        // Find galleries whose details haven't been synced yet
        const force = req.query.force === 'true';

        const pending = force
            ? await PhotoGallery.find()
            : await PhotoGallery.find({
                isSynced: false
            });

        for (const gallery of pending) {

            const detail =
                await photoService.getGalleryDetails(gallery.galleryId);

            await PhotoGallery.findOneAndUpdate(

                {
                    galleryId: gallery.galleryId
                },

                {
                    intro: detail.intro,
                    state: detail.state,
                    tags: detail.tags || [],
                    imageCount: detail.photoGalleryDetails.length,
                    isSynced: true
                }

            );

            await Photo.deleteMany({
                galleryId: gallery.galleryId
            });

            const photos = detail.photoGalleryDetails.map(photo => ({

                galleryId: gallery.galleryId,

                imageId: photo.imageId,

                caption: photo.caption

            }));

            await Photo.insertMany(photos);
        }

        res.status(200).json({

            success: true,
        
            force,
        
            galleriesProcessed: pending.length,
        
            message: force
                ? "All galleries refreshed successfully."
                : "New galleries synced successfully."
        
        });
    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

exports.getPhotoGalleries = async (req, res) => {

    try {

        const galleries = await PhotoGallery
            .find()
            .sort({ publishedTime: -1 });

        const formattedGalleries = galleries.map(gallery => ({

        galleryId: gallery.galleryId,

        headline: gallery.headline,

        publishedTime: gallery.publishedTime,

        imageCount: gallery.imageCount,

        coverImageId: gallery.coverImageId,

        coverImageUrl: getCricbuzzImageUrl(gallery.coverImageId)

}));

        res.status(200).json({
            success: true,
            total: galleries.length,
            galleries:formattedGalleries
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.getGallery = async (req, res) => {

    try {

        const { galleryId } = req.params;

        const gallery = await PhotoGallery.findOne({
            galleryId: Number(galleryId)
        });
        

        if (!gallery) {
            return res.status(404).json({
                success: false,
                message: "Gallery not found."
            });
        }

        const photos = await Photo.find({
            galleryId: Number(galleryId)
        });

        const formattedPhotos = photos.map(photo => ({

            imageId: photo.imageId,
        
            caption: photo.caption,
        
            imageUrl: getCricbuzzImageUrl(photo.imageId)
        
        }));

        const formattedGallery = {

            galleryId: gallery.galleryId,
        
            headline: gallery.headline,
        
            intro: gallery.intro,
        
            publishedTime: gallery.publishedTime,
        
            imageCount: gallery.imageCount,
        
            state: gallery.state,
        
            tags: gallery.tags,
        
            coverImageId: gallery.coverImageId,
        
            coverImageUrl: getCricbuzzImageUrl(gallery.coverImageId)
        
        };

        res.status(200).json({
            success: true,
            gallery: formattedGallery,
            photos: formattedPhotos
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};