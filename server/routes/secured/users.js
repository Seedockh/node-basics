import { Router } from "express";
import User from "../../models/user";

const api = Router();

api.get("/", async (req, res) => {
  const users = await User.findAll();
  res.status(200).json({ data: { users } });
});

api.post('/:uuid', async (req,res)=> {
  const user = await User.findByPk(req.params.uuid);
  res.status(200).json(user);
})

api.put('/update/:uuid', (req,res,next)=> {
  console.log(`
    --------- UPDATING DETAILS ---------
    `);
  User.update(
    { nickname: req.body.nickname,
      email: req.body.email,
      password: "fake_password",
      password_confirmation: "fake_password"
    }, {where : {uuid:req.params.uuid},
    returning: true, plain: true })
    .then( response => {
      console.log(response[1].dataValues);
      res.status(200).json('User information updated successfully.') })
    .catch( err => {
      console.log(err.errors[0].message);
      res.status(400).json({ error: err.errors[0].message })
    });
});

api.put('/updatepassword/:uuid', async (req,res,next)=> {
  console.log(`
    --------- UPDATING PASSWORD ---------
    `);
    const old_user = await User.findByPk(req.params.uuid);

    if ((await old_user.checkPassword(req.body.old_password))) {
      console.log("OLD PASSWORD RECOGNIZED"); return;
      /*const user = await User.update(
        { password: req.body.password,
          password_confirmation: req.body.password_confirmation
        }, {where : {uuid:req.params.uuid} } );
      console.log(user[1].dataValues);
      res.status(200).send('Password updated successfully.');*/
    } else {
      console.log("OLD PASSWORD WRONG");
      res.status(400).json({ error: "Old password is incorrect." })
    }
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
