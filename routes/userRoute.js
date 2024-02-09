import express from 'express' ;    
import { create, fetch } from '../controller/userController.js';

const route = express.Router();

route.get("/getallusers", fetch); 
route.post("/create",  create);

export default route;