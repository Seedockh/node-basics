import { Router } from "express";
import Project from "../../models/project";

const api = Router();

api.get("/", async (req, res) => {
  const projects = await Project.findAll();
  res.status(200).json({ msg: 'All your projects', data: { projects } });
});

api.post("/create", async (req,res) => {
  const { UserUuid, name } = req.body;
  try {
    const project = new Project({ UserUuid, name });
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
