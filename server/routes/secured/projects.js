import { Router } from "express";
import Project from "../../models/project";
import User from "../../models/user";

const api = Router();

api.post("/", async (req, res) => {
  console.log(req.body);
  Project.findAll({
    where: {user_uuid:req.body.uuid} })
  .then( response => {
    console.log(response);
    res.status(200).json({ msg: 'All your projects ', data: response });
  }).catch( err => {
    console.log("ERREUR");
    console.log(err);
    res.status(400).json({ error: "A problem occured when loading your projects."})
  });
});

api.post("/create", async (req,res) => {
  const { name, uuid } = req.body;
  try {
    const project = new Project({ name, uuid });
    await project.save();

    res.status(201).json({ data: { project } });
  } catch (err) {
    console.log(err.message);
    res.json( {err:err.message} );
  }
});

api.post('/:id', async (req,res)=> {
  const project = await Project.findByPk(req.params.id);
  res.status(200).json({ data: {project} });
})

api.put('/update/:id', async (req,res,next)=> {
  const project = await Project.update(
    { name: req.body.name }, {where : {id:req.params.id} } );
  res.status(200).send('Project updated successfully.');
});

api.delete('/delete/:id', async (req,res)=> {
  const project = await Project.destroy({where:{id: req.params.id}});
  res.status(200).send("Project deleted successfully.");
})


export default api;
