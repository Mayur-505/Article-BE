import { validate } from 'express-validation';
import { Router } from 'express';
import Paths from '../constants/Paths';
import ArticleRoutes from './ArticleRoutes';
import CommentRoutes from './CommentRoutes';
import { article } from '@src/validation/article';
import { comment } from '@src/validation/comment';


// **** Variables **** //

const apiRouter = Router();



const articleRouter = Router();


// Get all article
articleRouter.get(
  Paths.Articles.Get,
  ArticleRoutes.getAll,
);

// Get one article
articleRouter.get(
  Paths.Articles.GetOne,
  validate(article?.getOneArticle),
  ArticleRoutes.getOneArticle,
);

// Get all comments on article
articleRouter.get(
  Paths.Comments.Get,
  validate(comment?.getCommentsForArticle),
  CommentRoutes.getCommentsForArticle,
);

//  Add one  article
articleRouter.post(
  Paths.Articles.Add,
  validate(article?.addArticle),
  ArticleRoutes.add,
);

// Add comment on comment / comment on article
articleRouter.post(
  Paths.Comments.Add,
  validate(comment?.addComment),
  CommentRoutes.add,
);



apiRouter.use(Paths.Articles.Base, articleRouter);


// **** Export default **** //

export default apiRouter;
