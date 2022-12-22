import { addBooksHandler, getAllBooksHandler, getBookByIdHandler, updateBookHandler, deleteBookHandler } from './handler.js';

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBooksHandler
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookByIdHandler
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: updateBookHandler
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookHandler
    }
]

export default routes;