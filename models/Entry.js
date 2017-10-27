const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Shema
const EntrySchema = new Schema({
  title:{
    type:String,
    required: true
  },
  image:{
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  //encoded entry
  content: {
    type: String
  },
  allowComments: {
    type: Boolean,
    default: true
  },

  comments: [{
    commentBody: {
      type: String,
      required: true
    },
    commentDate:{
      type: Date,
      default: Date.now
    },
    commentUser:{
      type: Schema.Types.ObjectId,
      ref:'users'
    }
  }],
  user:{
    type: Schema.Types.ObjectId,
    ref:'users'
  },
  date:{
    type: Date,
    default: Date.now
  }

});

// Create collection and add schema
mongoose.model('entries', EntrySchema,'entries');
