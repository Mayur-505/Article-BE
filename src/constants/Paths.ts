/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  Articles: {
    Base: '/articles',
    Get: '/all',
    Add: '/add',
    GetOne: '/:id',
  },
  Comments: {
    Get: '/comments/:id',
    Add: '/comment/add',
  },
} as const;
