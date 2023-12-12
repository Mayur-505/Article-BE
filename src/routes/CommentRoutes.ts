import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';
import { ICommentInput } from '@src/models/Article';
import CommentService from '@src/services/CommentService';


// **** Functions **** //

/**
 * get all comment on article .
 */
async function getCommentsForArticle(req: IReq, res: IRes) {
  const id: number = Number(req?.params?.id);
  const comments = await CommentService.getCommentsForArticle(id);
  return res.status(HttpStatusCodes.OK).json(comments);
}

/**
 * Add  comment on comment / comment on article .
 */
async function add(req: IReq<ICommentInput>, res: IRes) {
  const comment: ICommentInput = req.body;
  await CommentService.addComment(comment);
  return res.status(HttpStatusCodes.CREATED).json({ msg: 'Comment added !' });
}


// **** Export default **** //

export default {
  getCommentsForArticle,
  add,
} as const;
