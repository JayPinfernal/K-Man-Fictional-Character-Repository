const express = require('express');
const Entities = require('html-entities').AllHtmlEntities;
const router = express.Router();
const mongoose = require('mongoose');
const Entry = mongoose.model('entries');
const User = mongoose.model('users');
const {ensureAuthenticated,ensureGuest} = require('../helpers/auth');
const entities= new Entities();
router.get('/list', (req, res) => {
     Entry.find()
     .populate('user')
     .sort({date:'desc'})
     .then(entries => {
      res.render('entries/indexlist',{
        entries:entries
      });
     })

});


router.post('/list',(req,res)  => {
  let allowComments;
  var content=entities.encode(req.body.content);

    if(req.body.allowComments){
      allowComments=true;
    }
    else{
      allowComments=false;
    }

    const newEntry={
      title: req.body.title,
      image: req.body.image,
      summary: req.body.summary,
      content: content,
      allowComments:allowComments,
      user: req.user.id
    }

    //create new entry
    new Entry(newEntry)
        .save()
        .then(entry => {
        res.redirect(`/entries/view/${entry.id}`);
        });
});

router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('entries/add');
});

router.get('/edit/:id', ensureAuthenticated, (req, res) => {

  var content;
    Entry.findOne( {
      _id: req.params.id
    })
    .populate('user')
    .then(entry => {
      if(entry.user.id != req.user.id){
        res.redirect('/entries/list');
      }
      else{
        content =entities.decode(entry.content);
        res.render('entries/edit',{
          entry:entry,
          content:content
        }); }

    })
}
);

router.get('/user/:userId',(req,res) => {
  let usrsrch=true;
  Entry.find({
    user:req.params.userId
  }).populate('user')
  .then(entries  => {
    res.render('entries/indexlist',{
      entries:entries,
      usrsrch: usrsrch
    })
  })
});

router.get('/my',ensureAuthenticated,(req,res) => {
  let usrsrch=true;
  Entry.find({
    user:req.user.id
  }).populate('user')
  .then(entries  => {
    res.render('entries/indexlist',{
      entries:entries,
      usrsrch: usrsrch
    })
  })
});

router.get('/view', (req,res) => {
      res.render('entries/display');
}
);
router.get('/view/:id', (req,res) => {
  var content;
    Entry.findOne( {
      _id: req.params.id
    })
    .populate('user')
    .populate('comments.commentUser')
    .then(entry => {
      content =entities.decode(entry.content);
      res.render('entries/viewer',{
        entry:entry,
        content:content
      });
    })
}
);
router.put('/view/:id', (req, res) => {
  Entry.findOne( {
    _id: req.params.id
  })
  .then(entry => {
    let allowComments;
    var content=entities.encode(req.body.content);

      if(req.body.allowComments){
        allowComments=true;
      }
      else{
        allowComments=false;
      }

      entry.title=req.body.title;
      entry.content=content;
      entry.allowComments=allowComments;
      entry.image=req.body.image;
      entry.summary=req.body.summary;

      entry.save()
            .then(entry => {
              res.redirect('/dashboard');
            })
  })
});

//delete story

router.delete('/:id',(req,res) => {
  Entry.remove({_id: req.params.id})
          .then(() => {
            res.redirect('/dashboard');
          })
});

//Add Comment
router.post('/comment/:id',(req,res) => {
  Entry.findOne({
    _id: req.params.id
  })
  .then(entry => {
     const newComment ={
       commentBody: req.body.commentBody,
       commentUser: req.user.id
     }

     //Push to the comments array
     entry.comments.unshift(newComment);

     entry.save().then(entry => {
       res.redirect(`/entries/view/${entry.id}`);
     })
  });
});

module.exports = router;
