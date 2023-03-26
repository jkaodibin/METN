const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  userId:{
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  stack: {
    type: [String]
  },
  minPrice:{
    type:Number,
    required:true,
  },
  maxPrice:{
    type:Number,
    required:true,
  },
  advantages:{
    type:[String]
  },
  level:{
    type: String,
  },
  type:{
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  limitDate:{
    type: Date,
  }
}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);