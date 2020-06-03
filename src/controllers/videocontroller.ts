import Video from "../models/Video";
import User from "../models/User";
import Comment from '../models/Comment'
export class videocontroller {
    static async addvideo(req, res, next) {
        try {
            console.log(req.user);
            const admin = await User.findOne({ email: req.user.email });
            if (!admin || admin.role != 'admin') {
                throw new Error("user is not authorized to add Video")
            }
            const video = await new Video({
                video_url: req.body.video_url,
                description: req.body.description,
                title: req.body.title,
                category: req.body.category,
                created_at: Date.now(),
                updated_at: Date.now()
            }).save();
            res.send(video);
        } catch (e) {
            next(e);
        }
    }
    static async addComment(req, res, next) {
        const content = req.body.content;
        const video = req.video;
        try {
            const comment = new Comment({
                content: content,
                created_at: Date.now(),
                updated_at: Date.now()
            });
            video.comments.push(comment);
            await Promise.all([comment.save(), video.save()]);
        } catch (e) {
            next(e);
        }
    }
    static async replycomment(req, res, next) {
        const content = req.body.content;
        const replycomment = req.replycomment;
        try {
            const comment = new Comment({
                content: content,
                created_at: Date.now(),
                updated_at: Date.now()
            })
            replycomment.reply.push(comment);
            await Promise.all([replycomment.save(), comment.save()]);
        } catch (e) {
            next(e);
        }
    }
    static async Filter(req, res, next) {
        const page = parseInt(req.query.page) || 1;
        const perPage = 2;
        let currentPage = page;
        let prevPage = page === 1 ? null : page - 1;
        let pageToken = page + 1;
        let totalPages;
        try {
            const videoCount = await Video.countDocuments({ category: req.query.category });
            totalPages = Math.ceil(videoCount / perPage);
            if (totalPages === page || totalPages === 0) {
                pageToken = null;
            }
            if (page > totalPages) {
                throw Error('No More Videos To Show');
            }
            const videos = await Video.find({ category: req.query.category }, { __v: 0, user_id: 0 })
                .populate('comments').skip((perPage * page) - perPage).limit(perPage);
            res.json({
                video: videos,
                pageToken: pageToken,
                totalPages: totalPages,
                currentPage: currentPage,
                prevPage: prevPage
            });
        } catch (e) {
            next(e);
        }
    }
    static async showall(req,res,next){
        const page = parseInt(req.query.page) || 1;
        const perPage = 2;
        let currentPage = page;
        let prevPage = page === 1 ? null : page - 1;
        let pageToken = page + 1;
        let totalPages;
        try {
            const videoCount = await Video.estimatedDocumentCount();
            totalPages = Math.ceil(videoCount / perPage);
            if (totalPages === page || totalPages === 0) {
                pageToken = null;
            }
            if (page > totalPages) {
                throw  Error('No More Post To Show');
            }
            const videos: any = await Video.find({}, {__v: 0, user_id: 0})
                .populate('comments').skip((perPage * page) - perPage).limit(perPage);
            res.json({
                post: videos,
                pageToken: pageToken,
                totalPages: totalPages,
                currentPage: currentPage,
                prevPage: prevPage
            });
        } catch (e) {
            next(e);
        }
    }
}