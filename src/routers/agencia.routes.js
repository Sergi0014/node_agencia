import { Router } from "express";
import { getAgencias, getAgenciaById, postAgencia, putAgencia, deleteAgencia } from "../controllers/controller.agencia.js";


const router = Router();
router.get("/agencia", getAgencias)
router.get("/agencia/:id", getAgenciaById)
router.post("/agencia", postAgencia)
router.put("/agencia/:id", putAgencia)
router.delete("/agencia/:id", deleteAgencia)


export default router;