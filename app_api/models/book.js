const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength:3
    },
    category:{
        type: String,
        required: true
    } ,
    year:{
        type: Number,
        required: true
    },
    bookcollection:{
        type: Number,
        required: true
    }
});

mongoose.model('book',bookSchema); 

