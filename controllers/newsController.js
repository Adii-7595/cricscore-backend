const News = require('../models/News');

const newsService = require('../services/newsService');
const { getCricbuzzImageUrl } = require('../utils/imageUtils');

exports.syncNewsList = async (req, res) => {

    try {

        const data = await newsService.getNewsList();

        const stories = data.storyList
            .filter(item => item.story);

        let saved = 0;

        for (const item of stories) {

            const story = item.story;

            await News.findOneAndUpdate(

                {
                    storyId: story.id
                },

                {

                    storyId: story.id,

                    headline: story.hline,

                    seoHeadline: story.seoHeadline,

                    intro: story.intro,

                    context: story.context,

                    storyType: story.storyType,

                    source: story.source,

                    publishTime: new Date(
                        Number(story.pubTime)
                    ),

                    coverImageId: story.coverImage?.id,

                    coverImageCaption:
                        story.coverImage?.caption,

                    coverImageSource:
                        story.coverImage?.source

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

            message: 'News synced successfully.'

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


exports.syncNewsDetail = async (req, res) => {

    try {

        const { storyId } = req.params;

        const detail = await newsService.getNewsDetail(storyId);

        const paragraphs = detail.content
            .filter(item => item.content)
            .map(item => item.content.contentValue);

        await News.findOneAndUpdate(

            {
                storyId: Number(storyId)
            },

            {

                intro: detail.intro,

                context: detail.context,

                storyType: detail.storyType,

                source: detail.source,

                authors: detail.authors || [],

                tags: detail.tags || [],

                content: paragraphs,

                isSynced: true,

                coverImageId: detail.coverImage?.id,

                coverImageCaption: detail.coverImage?.caption,

                coverImageSource: detail.coverImage?.source

            },

            {
                returnDocument: 'after'
            }

        );

        res.status(200).json({

            success: true,

            message: 'News detail synced successfully.'

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const upsertNewsList = async (stories) => {

    let saved = 0;

    for (const item of stories) {

        const story = item.story;

        await News.findOneAndUpdate(

            {
                storyId: story.id
            },

            {

                storyId: story.id,

                headline: story.hline,

                seoHeadline: story.seoHeadline,

                intro: story.intro,

                context: story.context,

                storyType: story.storyType,

                source: story.source,

                publishTime: new Date(
                    Number(story.pubTime)
                ),

                coverImageId: story.coverImage?.id,

                coverImageCaption:
                    story.coverImage?.caption,

                coverImageSource:
                    story.coverImage?.source

            },

            {

                upsert: true,

                returnDocument: 'after'

            }

        );

        saved++;

    }

    return saved;

};

exports.syncNewsList = async (req, res) => {

    try {

        const data = await newsService.getNewsList();

        const stories = data.storyList
            .filter(item => item.story);

        const saved = await upsertNewsList(stories);

        res.status(200).json({

            success: true,

            total: saved,

            message: 'News synced successfully.'

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

exports.syncAllNews = async (req, res) => {

    try {

        const data = await newsService.getNewsList();

        const stories = data.storyList
            .filter(item => item.story);

        await upsertNewsList(stories);

        const force = req.query.force === 'true';

        const pending = force
            ? await News.find()
            : await News.find({
                isSynced: false
            });

        for (const news of pending) {

            const detail =
                await newsService.getNewsDetail(news.storyId);

            const paragraphs = detail.content
                .filter(item => item.content)
                .map(item => item.content.contentValue);

            await News.findOneAndUpdate(

                {
                    storyId: news.storyId
                },

                {

                    intro: detail.intro,

                    context: detail.context,

                    storyType: detail.storyType,

                    source: detail.source,

                    authors: detail.authors || [],

                    tags: detail.tags || [],

                    content: paragraphs,

                    isSynced: true,

                    coverImageId:
                        detail.coverImage?.id,

                    coverImageCaption:
                        detail.coverImage?.caption,

                    coverImageSource:
                        detail.coverImage?.source

                },

                {

                    returnDocument: 'after'

                }

            );

        }

        res.status(200).json({

            success: true,

            force,

            processed: pending.length,

            message: force
                ? 'All news refreshed successfully.'
                : 'New news synced successfully.'

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

exports.getNews = async (req, res) => {

    try {

        const news = await News
            .find()
            .sort({ publishTime: -1 });

        const formatted = news.map(item => ({

            storyId: item.storyId,

            headline: item.headline,

            intro: item.intro,

            context: item.context,

            storyType: item.storyType,

            source: item.source,

            publishTime: item.publishTime,

            coverImageUrl: getCricbuzzImageUrl(
                item.coverImageId
            )

        }));

        res.status(200).json({

            success: true,

            total: formatted.length,

            news: formatted

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
exports.getNewsById = async (req, res) => {

    try {

        const news = await News.findOne({

            storyId: Number(req.params.storyId)

        });

        if (!news) {

            return res.status(404).json({

                success: false,

                message: "News not found."

            });

        }

        res.status(200).json({

            success: true,

            news: {

                storyId: news.storyId,

                headline: news.headline,

                intro: news.intro,

                context: news.context,

                storyType: news.storyType,

                source: news.source,

                publishTime: news.publishTime,

                authors: news.authors,

                tags: news.tags,

                content: news.content,

                coverImageUrl: getCricbuzzImageUrl(
                    news.coverImageId
                )

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};