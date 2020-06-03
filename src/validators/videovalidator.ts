import { body ,param,query} from 'express-validator'
import Video from '../models/Video';
import Comment from '../models/Comment';
import { runInNewContext } from 'vm';
export class videovalidator {
    static addvideo() {
        return [body('video_url', 'Url is required').isString(),
        body('description', 'description is required').isString(),
        body('title', 'title is required').isString(),
        body('category', 'category is required').isString(),
        ]
    }
    static commentvideo() {
   return [
       body('content','content is required').isString(),
       param('id').custom((id,{req})=>{
        return Video.findOne({_id: id}).then((video) => {
            if (video) {
                req.video = video;
                return true;
            } else {
                throw new Error('Video Does Not Exist');
            }
        }).catch(err=>{
            throw new Error(err);
        })
       })
   ]
    }
    static replycomment(){
        return [body('content','content is required').isString(),
        param('id').custom((id,{req})=>{
            return Comment.findOne({_id:id}).then(comment=>{
                if(comment){
                    req.replycomment = comment;
                     return true;
                } else {
                    throw new Error('Comment does Not Exists');
                }
            }).catch(err=>{
                throw new Error(err);
            })
        })
    ]
    }
    static Filter(){
        return [query('category','Category is required').isString().custom((category,{req})=>{
            return Video.find({category : category}).then(category=>{
                if(category.length!=0){
                    return true;
                } else {
                    throw new Error('No such video of this category');
                }
            }).catch(err=>{
                throw new Error(err);
            })
        })]
    }
}