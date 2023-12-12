// **** Types **** //

export interface IArticle {
  id: number;
  nickname: string;
  title: string;
  content?: string;
  created_at: Date

}

export interface IComment {
  id: number;
  article_id: number;
  nickname: string;
  content?: string;
  created_at: Date
}

export interface ICommentComment {
  id: number;
  article_id: number;
  nickname: string;
  content?: string;
  created_at?: Date
  replies: [ICommentComment],
}


export interface IArticleComment {
  id?: number;
  nickname: string;
  title: string;
  content?: string;
  created_at?: Date
  comments?: [IComment]
}

export interface IArticleInput {
  nickname: string;
  title: string;
  content?: string;
}

export interface ICommentInput {
  article_id: number;
  parent_id?: number;
  nickname: string;
  content?: string;
}

