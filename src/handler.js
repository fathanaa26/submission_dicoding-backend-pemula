const { nanoid } = require("nanoid")
const books = require("./books")

const post_books = (req, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = req.payload
    
    const id = nanoid(16)
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt
    const finished = pageCount == readPage ? true : false

    const noted = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    }

    const isNameFilled = name === '' || name === undefined ? true : false
    const isReadPageValid = readPage <= pageCount ? true : false

    if(isNameFilled){
        const res = h.response({
            status:'fail',
            message:"Gagal menambahkan buku. Mohon isi nama buku"
        })
        res.code(400)
        return res
    }

    if(!isReadPageValid){
        const res = h.response({
            status:'fail',
            message:"Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        })
        res.code(400)
        return res
    }

    books.push(noted)

    const res = h.response({
        status:'success',
        message:"Buku berhasil ditambahkan",
        data:{
            bookId:id
        }
    })
    res.code(201)
    return res
}


const getall_books = (req,h)=>{

    const slice = books.slice(0,2)
    let show_books = []

    for(let i=0; i<slice.length; i++){
        show_books.push({
                id:slice[i].id,
                name:slice[i].name,
                publisher:slice[i].publisher
        })
    }

    const res = h.response({
        status:'success',
        data:{
            books:show_books
        }
    })
    res.code(200)
    return res
}

const getid_book = (req, h)=>{
    const {
        id
    } = req.params

    const book = books
        .filter((n)=>(n.id === id))[0]

    if(book === undefined){
        const res = h.response({
            status:'fail',
            message: "Buku tidak ditemukan"
        })
    
        res.code(404)
        return res 
    }

    const isFinished = books.filter((n)=>(n.finished==true))
    if(isFinished){
        const res = h.response({
            status:'success',
            data:{
                book
            }
        })
    
        res.code(200)
        return res
    }
    
    const res = h.response({
        status:'success',
        data:{
            book
        }
    })

    res.code(200)
    return res


}

const putid_book = (req,h)=>{
    const {
        id
    } = req.params

    let {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = req.payload

    const isIdExist = books.find((n) => id === n.id)
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt
    const finished = readPage <= pageCount ? false : true

    const bodyRes = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
        insertedAt,
        updatedAt
    }

    if(!isIdExist){
        const res = h.response({
            status:'fail',
            message:'Gagal memperbarui buku. Id tidak ditemukan',
        })
        res.code(404)
        return res
    }

    if(name === undefined){
        const res = h.response({
            status:'fail',
            message:"Gagal memperbarui buku. Mohon isi nama buku"
        })
        res.code(400)
        return res
    }

    if(readPage >= pageCount){
        const res = h.response({
            status:'fail',
            message:"Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        })
        res.code(400)
        return res
    }

    const index = books.findIndex(n=>n.id==id)
    const updating = books.splice(index,1,bodyRes)[0]

    
    const res = h.response({
        status:'success',
        message:"Buku berhasil diperbarui",
        data:{
            book:updating
        },
        
    })
    res.code(200)
    return res
}

const delid_book = (req,h)=>{
    const {
        id
    } = req.params

    const isIdValid = books.find((n)=>n.id===id)

    if(!isIdValid){
        const res = h.response({
            status:'fail',
            message:'Buku gagal dihapus. Id tidak ditemukan'
            
        })
        res.code(404)
        return res
    }

    const index = books.findIndex(n=>n.id==id)
    const updating = books.splice(index,1,{})[0]

    const res = h.response({
        status:'success',
        message:'Buku berhasil dihapus'
    })
    res.code(200)
    return res
}

module.exports = {
    post_books,
    getall_books,
    getid_book,
    putid_book,
    delid_book
}