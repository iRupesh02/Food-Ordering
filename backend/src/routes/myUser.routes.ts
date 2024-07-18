import { Router } from "express";
import {
  createCurrentUser,
  updateCurrentUser,
} from "../controllers/myUser.controller";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = Router();

router.route("/").post(jwtCheck, createCurrentUser);
router
  .route("/")
  .put(jwtCheck, jwtParse, validateMyUserRequest, updateCurrentUser);

export default router;
