import { ICommentComment, ICommentInput } from '@src/models/Article';
import { connection } from '../sql-config';

// **** Functions **** //


async function getCommentsForArticle(articleId: number, parent_id = null): Promise<ICommentComment[]> {
  const sql1 = parent_id
    ? 'SELECT * FROM comment WHERE article_id = ? AND parent_id = ? ORDER BY id ASC'
    : 'SELECT * FROM comment WHERE article_id = ? AND parent_id IS NULL ORDER BY id ASC';

  const results = (await connection.promise().query(sql1, [articleId, parent_id]))?.[0];

  const comments: any = [];
  if (results?.length)
    for (const row of results) {
      const comment: any = { id: row.id, article_id: row?.article_id, nickname: row.nickname, content: row.content, created_at: row.created_at };
      comment.replies = await getCommentsForArticle(articleId, row.id);
      comments.push(comment);
    }

  return comments;
}



function addComment(comment: ICommentInput): Promise<void> {
  let sql;
  if (comment?.parent_id) {

    sql = 'INSERT INTO comment (article_id, parent_id, nickname, content) VALUES (?, ?, ?, ?)';
  } else {
    sql = 'INSERT INTO comment (article_id,  nickname, content) VALUES (?,  ?, ?)';

  }

  return connection.promise().query(sql, Object.values(comment))?.then(([rows]: any) => rows)
    .catch((error: any) => { throw new Error(error); });
}




// **** Export default **** //

export default {
  getCommentsForArticle,
  addComment,


} as const;
