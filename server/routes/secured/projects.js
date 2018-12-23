import { Router } from "express";
import Project from "../../models/project";
import User from "../../models/user";

const api = Router();

api.get("/", async (req, res) => {
  Project.findAll({include: [{ model: User }], order: [[ 'updatedAt','DESC']] })
  .then( response => {
    res.status(200).json({ msg: 'All projects  ', data: response });
  }).catch( err => {
    res.status(400).json({ error: err })
  });
});

api.post("/", async (req, res) => {
  Project.findAll({
    where: {UserUuid:req.body.uuid} })
  .then( response => {
    res.status(200).json({ msg: 'All your projects ', data: response });
  }).catch( err => {
    res.status(400).json({ error: "A problem occured when loading your projects."})
  });
});

api.post("/create", async (req,res) => {
  const { name, uuid } = req.body;
  try {
    const project = new Project({ name, UserUuid: uuid });
    await project.save();

    res.status(201).json({ data: { project } });
  } catch (err) {
    res.json( {err:err.message} );
  }
});

api.put('/update/:id', async (req,res,next)=> {
  const project = await Project.update(
    { name: req.body.name }, {where : {id:req.params.id} } );
  res.status(200).json({ data: {project} });
});

api.delete('/delete/:id', async (req,res)=> {
  const project = await Project.destroy({where:{id: req.params.id}});
  res.status(200).json({msg: "Project deleted successfully."});
})

api.get('/search/:str', async (req,res,next)=> {
  const found = await Project.findAll({where:{name}})
})


export default api;
