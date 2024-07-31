import { Router } from "express";
import {
  createCurrentUser,
  updateCurrentUser,
  getCurrentUser ,
} from "../controllers/myUser.controller";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = Router();

router.route("/").post(jwtCheck, createCurrentUser);
router
  .route("/")
  .put(jwtCheck, jwtParse, validateMyUserRequest, updateCurrentUser);
 router.route("/").get(  jwtCheck , jwtParse , getCurrentUser); 

export default router;
