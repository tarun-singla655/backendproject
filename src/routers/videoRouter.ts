import {Router} from 'express';
import { GlobalMiddleWare } from '../middlewares/globalmiddleware';
import {videovalidator} from    '../validators/videovalidator'
import { videocontroller } from '../controllers/videocontroller';
class videoRouter{
    router : Router;
    constructor(){
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes(){
            this.router.get('/filter/:category',GlobalMiddleWare.authenticate,videovalidator.Filter(),GlobalMiddleWare.checkError,videocontroller.Filter)
            this.router.get('/all',GlobalMiddleWare.authenticate,GlobalMiddleWare.checkError,videocontroller.showall)
    }
    postRoutes(){
        this.router.post('/add',GlobalMiddleWare.authenticate,videovalidator.addvideo(),GlobalMiddleWare.checkError,videocontroller.addvideo)
        this.router.post('/comment/add/:id',GlobalMiddleWare.authenticate,videovalidator.commentvideo(),GlobalMiddleWare.checkError)
        this.router.post('/reply/comment/:id',GlobalMiddleWare.authenticate,videovalidator.replycomment(),GlobalMiddleWare.checkError,videocontroller.replycomment)
    }
    patchRoutes(){

    }
    deleteRoutes(){

    }
}
export default new videoRouter().router