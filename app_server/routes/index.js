var express = require('express');
var router = express.Router();

const ctrlBook = require('../controller/books');
const ctrlAbout = require('../controller/about');
/* GET home page. */
router.get('/', ctrlBook.booksList); 
router.get('/books/:bookid', ctrlBook.bookDetail); 

router.route('/new')
.get(ctrlBook.addNewBook)
.post(ctrlBook.doAddNewBook);

router.get('/about', ctrlAbout.about);
router.get('/list', ctrlBook.showBooks);

module.exports = router;


