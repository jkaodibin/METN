const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  userId:{
    type: String,
    required: true,
  },
  offerId:{
    type: String,
    required: true,
  },
  offerUserId:{
    type: String,
    required: true,
  },
  motivation:{
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  daysNumber: {
    type: Number,
    required: true,
  }
},{timestamps:true});

module.exports = mongoose.model('Bid', bidSchema);