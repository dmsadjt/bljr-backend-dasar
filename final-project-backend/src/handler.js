import books from './books.js'
import { nanoid } from 'nanoid'

const addBooksHandler = (request, handle) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

    const id = nanoid(21)
    const finished = readPage === pageCount
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    }

    if (!name) {
        const response = handle.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        });
        response.code(400)
        return response
    }

    if (readPage > pageCount) {
        const response = handle.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400)
        return response
    }


    books.push(newBook);
    const isSuccess = books.filter((book) => book.id === id).length > 0

    if (isSuccess) {
        const response = handle.response({
            status: 'success',
            message: `Buku berhasil ditambahkan`,
            data: {
                bookId: id,
            }
        });

        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
}

const selectFewerProps = (book) => {
    const { id, name, publisher } = book;
    return { id, name, publisher }
}

const getAllBooksHandler = (request, handler) => {
    const { reading, finished, name } = request.query;

    let booksFiltered = books;

    if (finished !== undefined) {
        booksFiltered = books.filter((book) => book.finished == finished);
    }
    if (reading !== undefined) {
        booksFiltered = books.filter((book) => book.reading == reading);
    }
    if (name !== undefined) {
        booksFiltered = books.filter((book) => (book["name"].toLowerCase()).includes(name.toLowerCase()) === true);
    }

    const booksMinProp = booksFiltered.map(selectFewerProps);

    const response = handler.response({
        status: 'success',
        data: {
            books: booksMinProp,
        },
    });
    response.code(200);
    return response;
}

const getBookByIdHandler = (request, handle) => {
    const { id } = request.params;
    const book = books.filter((book) => book.id === id)[0];

    if (book) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    }

    const response = handle.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    });
    response.code(404);
    return response;
}

const updateBookHandler = (request, handler) => {
    const { id } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();
    const finished = readPage === pageCount;

    if (!name) {
        const response = handler.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = handler.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            updatedAt,
        }

        const response = handler.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);

        return response;
    }

    const response = handler.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });

    response.code(404);
    return response;
}

const deleteBookHandler = (request, handle) => {
    const { id } = request.params;
    const index = books.findIndex((note) => note.id === id);

    if (index !== -1) {
        books.splice(index, 1); {
            const response = handle.response({
                status: 'success',
                message: 'Buku berhasil dihapus',
            });

            response.code(200);
            return response;
        }

    }

    const response = handle.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
    });

    response.code(404);
    return response;
}

export { addBooksHandler, getAllBooksHandler, getBookByIdHandler, updateBookHandler, deleteBookHandler }

