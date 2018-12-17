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

api.put('/update/:uuid', async (req,res,next)=> {
  const user = await User.update(
    { nickname: req.body.nickname,
      email: req.body.email,
    }, {where : {uuid:req.params.uuid} } );
  console.log(req.body);
  res.status(200).send('User information updated successfully.');
});

api.put('/updatepassword/:uuid', async (req,res,next)=> {
  const user = await User.update(
    { password: req.body.password,
      password_confirmation: req.body.password_confirmation
    }, {where : {uuid:req.params.uuid} } );
  res.status(200).send('Password updated successfully.');
});

api.delete('/delete/:uuid', async (req,res)=> {
  const user = await User.destroy({where:{uuid: req.params.uuid}});
  res.status(200).send("User deleted successfully.");
})


export default api;



// 1. GERER LA PERSISTENCE DE DONNEES -       ===> OK
// A. ENREGISTRER LE TOKEN HANDLE USER     ===> OK
// B. RECUPERER QUAND REFRESH              ===> OK
// C. REMOVE TOKEN ON LOGOUT               ===> OK

// 2. CREER PAGE PROFILE USER + EDIT + REMOVE ===> SERVER : OK // CLIENT : TODO

// 3. CREER USER PROJECT(S) + EDIT + REMOVE   ===> SERVER : OK // CLIENT : TODO
