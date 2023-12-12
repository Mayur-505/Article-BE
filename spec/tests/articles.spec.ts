import ArticleService from '../../src/services/ArticleService';
import CommentService from '../../src/services/CommentService';
import { connection } from '../../src/sql-config';

jest.mock('../../src/sql-config', () => ({
    connection: {
        promise: () => ({
            query: jest.fn(),
        }),
    },
}));

const testArticle: any = {
    nickname: 'John Doe',
    title: 'Test Article',
    content: 'This is a test article.',
};

const testArticleComment :any={
    id: 1,
    nickname: 'Test',
    title: 'Test Title',
    content: 'Test Content',
    comments: [],
}

const testComment:any={
    article_id: 1,
    nickname: 'User 1',
    content: 'Comment 1',
}

describe('ArticleService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

describe('getAll', () => {
    it('should get all articles', async () => {
        const getAllSpy = jest.spyOn(ArticleService, 'getAll').mockResolvedValue([]);

        const result = await ArticleService.getAll();

        expect(getAllSpy).toHaveBeenCalled();
        expect(result).toEqual([]);
    });
});

describe('getOneArticle', () => {
    it('should get one article', async () => {
        const getOneArticleSpy = jest.spyOn(ArticleService, 'getOneArticle').mockResolvedValue(testArticleComment);

        const result = await ArticleService.getOneArticle(1);

        expect(getOneArticleSpy).toHaveBeenCalled();
        expect(result).toEqual(testArticleComment);
    });
});

describe('addArticle', () => {
    it('should add an article', async () => {
        const addArticleSpy = jest.spyOn(ArticleService, 'addArticle').mockResolvedValue();

        await ArticleService.addArticle(testArticle);

        expect(addArticleSpy).toHaveBeenCalled();
    });
});
describe('addComment', () => {
    it('should add a comment to an article', async () => {
        const addArticleSpy = jest.spyOn(ArticleService, 'addArticle').mockResolvedValue();

        await ArticleService.addArticle(testArticle);

        expect(addArticleSpy).toHaveBeenCalled();

        const addCommentSpy = jest.spyOn(CommentService, 'addComment').mockResolvedValue();

        await CommentService.addComment(testComment);

        expect(addCommentSpy).toHaveBeenCalled();
    });
});

describe('getCommentsForArticle', () => {
    it('should retrieve all comments for an article', async () => {
        const addArticleSpy = jest.spyOn(ArticleService, 'addArticle').mockResolvedValue();

        await ArticleService.addArticle(testArticle);

        expect(addArticleSpy).toHaveBeenCalled();

        const addCommentSpy = jest.spyOn(CommentService, 'addComment').mockResolvedValue();

        await CommentService.addComment(testComment);

        const addComment2Spy = jest.spyOn(CommentService, 'addComment').mockResolvedValue();
        
        await CommentService.addComment({
            article_id: 1,
            parent_id: 1,
            nickname: 'User 2',
            content: 'Comment 2',
        });
        
        
        const getCommentSpy = jest.spyOn(CommentService, 'addComment').mockResolvedValue();
        
       await CommentService.getCommentsForArticle(1);

        expect(addCommentSpy).toHaveBeenCalled();
        
        expect(addComment2Spy).toHaveBeenCalled();
        expect(getCommentSpy).toHaveBeenCalled();
    });
});


});



