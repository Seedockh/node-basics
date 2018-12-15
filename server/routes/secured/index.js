import { Router } from "express";
import users from "./users";
import projects from "./projects";

const api = Router();

api.use("/users/projects", projects);
api.use("/users", users);

export default api;
