import { Router, Request, Response } from "express";
import * as userController from "../controllers/userController.ts";

import { ValidateAPIRoutes } from "../middlewares/api-validate.ts";


const UserRoutes: Router = Router();

UserRoutes.post("/login", ValidateAPIRoutes, userController.LoginUser );
UserRoutes.post("/register", ValidateAPIRoutes, userController.RegisterUser );


export default UserRoutes;
