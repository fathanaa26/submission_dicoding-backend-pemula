const { 
    post_books,
    getall_books,
    getid_book,
    putid_book,
    delid_book
} = require("./handler")

const routes = [
    {
        path:'/books',
        method:'POST',
        handler:post_books
    },
    {
        path:'/books',
        method:'GET',
        handler:getall_books
    },
    {
        path:'/books/{id}',
        method:'GET',
        handler:getid_book
    },
    {
        path:'/books/{id}',
        method:'PUT',
        handler:putid_book
    },
    {
        path:'/books/{id}',
        method:'DELETE',
        handler:delid_book
    }
]



module.exports = {
    routes,
}