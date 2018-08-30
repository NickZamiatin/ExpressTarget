const express = require('express');
const router = express.Router();
const queries = require('../db/queries')

function isValidId(req, res, next){
  if(!isNaN (req.params.id)) return next();
  next(new Error('Invalid Id'))
}

function validTarget (target){
  console.log(target)
  const hasTitle = typeof target.title == 'string' && target.title.trim() != '';
  const hasNotes = typeof target.notes == 'string' && target.notes.trim() != '';
  return hasTitle && hasNotes
}


router.get ('/', (req, res, next)=>{
  queries.getAllTargets(req.user.id).then(target =>{
    res.json(target)
  }).catch(next)
});

router.get ('/:id',isValidId, (req, res, next)=>{
  queries.getOneTarget(req.params.id, req.user.id).then(target =>{
    if(target){
      res.json(target)
    } else {
      res.status(404)
      next(new Error('Not Found'))
    }
  })
});

router.post('/',(req, res, next)=>{
  if(validTarget(req.body)){
    queries.createTarget(req.body, req.user.id).then(target =>{
      res.json(target[0])
    }).catch(next)
  } else {
    next(new Error('Dont Post'))
  }
});

router.put('/:id', isValidId, (req, res, next) => {
  if(validTarget(req.body)){
    queries.updateTarget(req.params.id, req.body, req.user.id).then(target => {
      res.json(target[0])
    })
  } else {
    next(new Error('Dont Update Target'))
  }
});

router.delete('/:id', isValidId, (req, res) => {
  queries.deleteTarget(req.params.id, req.user.id).then(() => {
    res.json({
      deleted: true
    })
  })
})

module.exports = router;