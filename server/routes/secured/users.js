import { Router } from "express";
import User from "../../models/user";

const api = Router();

api.get("/", async (req, res) => {
  const users = await User.findAll();
  res.status(200).json({ data: { users } });
});

api.post('/:uuid', async (req,res)=> {
  const user = await User.findByPk(req.params.uuid);
  res.status(200).json({ data: {user} });
})

api.put('/:uuid', async (req,res,next)=> {
  await User.update(
    { nickname: req.body.nickname,
      email: req.body.nickname,
      password: req.body.password }, {where : {uuid:req.params.uuid} } )
  .then(() => res.status(200).json( { data: {user} }) )
  .catch((err)=>{if (err) throw err});
});



export default api;



// 1. GERER LA PERSISTENCE DE DONNEES -
// A. ENREGISTRER LE TOKEN HANDLE USER
// B. RECUPERER QUAND REFRESH
// C. REMOVE TOKEN ON LOGOUT

// 2. CREER PAGE PROFILE USER + EDIT + REMOVE

// 3. CREER USER PROJECT(S) + EDIT + REMOVE
