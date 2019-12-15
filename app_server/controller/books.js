const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
};

const _renderCreatePage = function (req, res){
    res.render('create-new-book',{
              title:"Create new book"
               });
};

const addNewBook = function(req, res){
    _renderCreatePage(req,res);
};

const doAddNewBook = function(req, res){
    
    const path = '/api/books';
    const postdata = {
        name: req.body.name,
        category: req.body.category,
        year: req.body.year,
        bookcollection: req.body.bookcollection
    };
    const requestOptions ={
        url: apiOptions.server+path,
        method: 'POST',
        json: postdata
    };
 request(
 requestOptions,
 (err, response, body) => {
     if (response.statusCode === 201){
         res.redirect('/');
     }
 });
    
};


const _renderHomePage = function(req, res, responseBody){
    res.render('list-display', { books: responseBody});
};

const _renderBookListPage = function(req, res, responseBody){
    res.render('book-list', { books: responseBody});
};

const _renderDetailPage = function(req, res, responseBody){
    res.render('display', { currentBook: responseBody});
};


const booksList= function(req,res){
    const path = '/api/books';
    const requestOptions = {
        url: apiOptions.server +path,
        method:'GET',
        json:{}
    };
request(requestOptions,(err, response, body) => {
   _renderHomePage(req, res, body); 
    
});
};

const showBooks= function(req,res){
    const path = '/api/books';
    const requestOptions = {
        url: apiOptions.server +path,
        method:'GET',
        json:{}
    };
request(requestOptions,(err, response, body) => {
   _renderBookListPage(req, res, body); 
    
});
};

const bookDetail= function(req,res){
    const path = `/api/books/${req.params.bookid}`;
    const requestOptions = {
        url: apiOptions.server +path,
        method:'GET',
        json:{}
    };

   request(requestOptions,(err, response, body) => {
   _renderDetailPage(req, res, body); 
    
});
};

module.exports = {
    booksList,
    bookDetail,
    doAddNewBook,
    addNewBook,
    showBooks
};