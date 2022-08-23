const {Thing} = require('../models');

module.exports.createThing = async (req, res, next) => {
  try {
    const {body} = req;
    const [newThing] = await Thing.create(body);
    if(newThing){
      return res.status(201).send({data: newThing})
    }
    return res.status(400).send()
  } catch (error) {
    next(error)
  }
}

module.exports.getAllThing = async (req, res, next)=>{
  try {
    const allThings = await Thing.findAll();
    if(allThings.length){
      return res.status(200).send({data: allThings})
    }
    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}

module.exports.deleteThing = async (req, res, next)=>{
  try {
    const {params:{id}} = req;
    const [deletedThing] = await Thing.deleteByPk(id);
    if(deletedThing){
      return res.status(200).send({data: deletedThing})
    }
    return res.status(404).send()
  } catch (error) {
    next(error)
  }
}