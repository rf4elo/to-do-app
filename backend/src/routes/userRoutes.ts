import { Router, Request, Response } from "express";
import * as userController from "../controllers/userController.ts";

import { ValidateAPIRoutes } from "../middlewares/api-validate.ts";


const UserRoutes: Router = Router();

UserRoutes.use(ValidateAPIRoutes);

UserRoutes.post("/login", userController.LoginUser );
UserRoutes.post("/register", userController.RegisterUser );


export default UserRoutes;
