import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import passport from "passport";

const api = Router();

api.post("/register", async (req, res) => {
  const { nickname, email, password, password_confirmation } = req.body;

  try {
    const user = new User({
      nickname,
      email,
      password,
      password_confirmation,
    });

    await user.save();

    const payload = { uuid: user.uuid, nickname, email };
    const token = jwt.sign(payload, "mysupersecret");

    res.status(201).json({ data: { user }, meta: { token } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

api.post("/login", async (req, res) => {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err) {
      res.status(400).json({
        error: { message: err }
      });
      console.log("Error : "+res.status(400).statusCode +' - '+res.status(400).statusMessage);
      return res.status(400);
    }

    const { uuid, nickname, email } = user;
    const payload = { uuid, nickname, email };
    const token = jwt.sign(payload, process.env.JWT_ENCRYPTION);

    res.status(200).json({ data: { user }, meta: { token } });
  })(req, res);
});

export default api;
