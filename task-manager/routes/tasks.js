var express = require('express');
require('../src/mongo/mongod');
const Task = require('../src/models/tasks');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const data = await Task.find({})
    res.status(200).send(data)
  } catch (error) {
    res.status(500).send(error);
  }
});


router.get('/:id', async (req, res, next) => {
  try {
    const data = await Task.findById(req.params.id);
    if (!data)
      return res.status(404).send();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.post('/', async (req, res, next) => {
  const task = new Task(req.body)
  try {
    const data = await task.save();
    res.status(201).send(data)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.patch('/:id', async (req, res, next) =>{
  const alllowedUpdates = ['discription', 'completed'];
  const updates = Object.keys(req.body);
  const isvalidOrNot = updates.every((update)=> alllowedUpdates.includes(update))
  
  if(!isvalidOrNot)
    return res.status(400).send({error: 'Invalid Operation'});

  try {
    const task = await Task.findById(req.params.id)
    if(!task)
      return res.status(404).send();

    updates.forEach((update)=> task[update] = req.body[update])
    await task.save();    
    res.send(task)
  } catch (error) {
     res.status(500).send(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const data = await Task.findByIdAndDelete(req.params.id);
    if (!data)
      return res.status(404).send();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
