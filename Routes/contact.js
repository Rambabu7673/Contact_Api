import express from "express";
import {
  contactUser,
  deleteContactById,
  getAllContact,
  getContactById,
  getContactByUserId,
  updateContactById,
} from "../Controllers/contact.js";
import { isAthenticated } from "../Middlewares/Auth.js";

const router = express.Router();

// New contact
// @ Api Name : creating contact
// @Api method :- post
// @Api endPoint:-/api/contact/new
router.post("/new", isAthenticated, contactUser);

// Get All contact
router.get("/",  getAllContact);

// get Contact by Id
router.get("/:id", getContactById);

// Updated New contatc by id
router.put('/:id', isAthenticated, updateContactById)

// Delete contatc by id
router.delete('/:id', isAthenticated, deleteContactById)


// get user specifice contact
router.get('/userid/:id',getContactByUserId)

export default router;
