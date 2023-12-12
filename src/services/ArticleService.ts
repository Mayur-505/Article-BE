import { IArticle, IArticleComment, IArticleInput } from '@src/models/Article';
import { connection } from '../sql-config';
import CommentService from './CommentService';


// **** Functions **** //


// Get all articles.

function getAll(page = 1): Promise<IArticle[]> {
  connection.connect();
  const sql = 'SELECT * FROM article LIMIT ?, 20';
  return connection.promise().query({ sql }, Number((page - 1)*20))
    .then(([rows]: any) => rows)
    .catch((error: any) => { throw new Error(error); });

}

//get one article
async function getOneArticle(articleId: number): Promise<IArticleComment[]> {
  connection.connect();
  const sql = 'SELECT  * FROM article  WHERE article.id = ?';
  const article = await connection.promise().query({ sql }, articleId)
    ?.then(([rows]: any) => rows[0])
    .catch((error: any) => { throw new Error(error); });

  const comments = await CommentService.getCommentsForArticle(articleId);
  return ({ ...article, comments });

}

// Add article
function addArticle(article: IArticleInput): Promise<void> {
  const sql = 'INSERT INTO article (nickname, title, content) VALUES (?, ?, ?)';
  return connection.promise().query(sql, Object.values(article))?.then(([rows]: any) => rows)
    .catch((error: any) => { throw new Error(error); })
    // .then(() => connection.end());
}



// **** Export default **** //

export default {
  getAll,
  addArticle,
  getOneArticle,

} as const;
