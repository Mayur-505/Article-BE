//@typescript-eslint/no-explicit-any
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import { IReq, IRes } from './types/express/misc';
import ArticleService from '@src/services/ArticleService';
import { IArticleInput } from '@src/models/Article';


// **** Functions **** //

/**
 * Get all articles.
 */
async function getAll(req: IReq, res: IRes) {
  const page:number | undefined = Number(req?.query?.page);
  const articles = await ArticleService.getAll(page);
  return res.status(HttpStatusCodes.OK).json({ articles });
}


/**
 * Get one  article.
 */
async function getOneArticle(req: IReq, res: IRes) {
  const id:number | undefined= Number(req?.params?.id);
  const articles = await ArticleService.getOneArticle(id);
  return res.status(HttpStatusCodes.OK).json(articles);
}

/**
 * Add one article.
 */
async function add(req: IReq< IArticleInput >, res: IRes) {
  const article: IArticleInput = req.body;
  await ArticleService.addArticle(article);
  return res.status(HttpStatusCodes.CREATED).json({ msg: 'Article added !' });
}

// **** Export default **** //

export default {
  getAll,
  add,
  getOneArticle,

} as const;
