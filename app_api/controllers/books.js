const mongoose = require('mongoose');
const Book = mongoose.model('book');

const getBooks = function(req, res){
    Book.find()
     .exec(function(err,bookdata){
        if(err)
            {
                res
                .status(404)
                .json(err);
                return;
            }
         res
        .status(200)
        .json(bookdata);
    });

};

const createBook = function(req, res){
    Book
    .create({
        name: req.body.name,
        category: req.body.category,
        year: req.body.year,
        bookcollection: req.body.bookcollection
    }, 
            (err, bookdata) => {
        if(err)
            {
                res
                .status(400)
                .json(err);
            }
        else
            {
                res
                .status(201)
                .json(bookdata);
            }
    });
};
 



const getSingleBook = function(req, res){
    
    if(req.params && req.params.bookid){
        Book
        .findById(req.params.bookid)
        .exec(function(err, bookdata) {
            if(!bookdata)
                {
                    res
                    .status(404)
                    .json({"message": "bookid Not Found"});
                    return;
                }
            else if(err)
                {
                 res
                    .status(404)
                    .json(err);
                    return;   
                }
            res
            .status(200)
            .json(bookdata);
        });
    }
   
};


const updateBook = function(req, res){
    
     if(!req.params.bookid){
         res
         .status(404)
         .json({"message": "No bookid is passed!"});
         return;
         
     };
     Book
    .findById(req.params.bookid)
    .exec((err, bookdata) => {
        if(!bookdata)
            {
                res
                .status(404)
                .json({"message": "This bookid is not found"});
                return;
            }
        else if(err)
            {
                res
                .status(404)
                .json(err);
                return;
            }
        bookdata.name = req.body.name;
        bookdata.category = req.body.category;
        bookdata.year = req.body.year;
        bookdata.bookcollection = req.body.bookcollection;
        
        bookdata.save((err, bookdata) => {
            if(err)
                {
                    res
                    .status(404)
                    .json(err);
                    return;
                }
            else
                {
                    res
                    .status(200)
                    .json(bookdata);
                }
        });
    });
};

const deleteBook = function(req, res){
   const bookid = req.params.bookid;
    if(bookid)
        {
            Book
            .findByIdAndRemove(bookid)
            .exec((err, bookdata) => {
                if(err)
                    {
                        res
                        .status(404)
                        .json(err);
                        return;
                    }
                res
                .status(204)
                .json({"message": "The data was successfully deleted!"});
            });
        }
    else
        {
            res
            .status(404)
            .json({"message": "No bookid"});
        }
};

module.exports={
   getBooks, createBook, getSingleBook, updateBook, 
    deleteBook
};