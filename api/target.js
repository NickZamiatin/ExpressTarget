const express = require('express');
const router = express.Router();
const queries = require('../db/queries')

function isValidId(req, res, next){
  if(!isNaN (req.params.id)) return next();
  next(new Error('Invalid Id'))
}

function validTarget (target){
  const hasDate = typeof target.date == 'string' && target.date.trim() != '';
  const hasTitle = typeof target.title == 'string' && target.title.trim() != '';
  const hasNotes = typeof target.notes == 'string' && target.notes.trim() != '';
  // const hasDone = typeof target.done == 'boolean' ; dosent work 
  return hasDate && hasTitle && hasNotes  

}


router.get ('/', (req, res )=>{
  queries.getAllTargets().then(target =>{
    res.json(target)
  })
});

router.get ('/:id',isValidId, (req, res, next)=>{
  queries.getOneTarget(req.params.id).then(target =>{
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
    queries.createTarget(req.body).then(target =>{
      res.json(target[0])
    })
  } else {
    next(new Error('Dont Post'))
  }
});

router.put('/:id', isValidId, (req, res, next) => {
  if(validTarget(req.body)){
    queries.updateTarget(req.params.id, req.body).then(target => {
      res.json(target[0])
    })
  } else {
    next(new Error('Dont Update Target'))
  }
});

router.delete('/:id', isValidId, (req, res) => {
  if(validTarget(req.body)){
    queries.deleteTarget(req.params.id).then(() => {
      res.json({
        deleted: true
      })
    })
  }
})

module.exports = router;