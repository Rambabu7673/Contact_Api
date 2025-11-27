import mongoose from "mongoose";
import { Contact } from "../Models/Contact.js";

//  @Api endPoint:-/api/contact/new
// Create new contact
export const contactUser = async (req, res) => {
  const { name, email, phone, type } = req.body;
  if (name == "" || email == "" || phone == "" || type == "")
    return res.json({ message: "All field are required...!", success: false });
  //  Check if user already exists
  let user = await Contact.findOne({ email });
  if (user)
    return res.json({ message: "User Created allready", success: false });

  //  Save Contact user
  let saveContact = await Contact.create({
    name,
    email,
    phone,
    type,
    user:req.user
  });
  res.json({ message: "Contact save successfuly", success: true, saveContact });
};

// Update Contact by Id

export const updateContactById = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, type } = req.body;
  let updatedContact = await Contact.findByIdAndUpdate(
    id,
    {
      name,
      email,
      phone,
      type,
    },
    { new: true }
  );
  if (!updatedContact)
    return res.json({ message: "No Contact Exist ", success: false });

  res.json({
    message: "Contact Updated Seccessfully",
    success: true,
    updatedContact,
  });
};

// Delete  contact By id
export const deleteContactById = async (req, res) => {
  const id = req.params.id;
  let deleteContact = await Contact.findByIdAndDelete(id, );
  if (!deleteContact)
    res.json({ message: "Contact are  deleted Already  ...!", success: false })
  res.json({message:"Contact are deleted successfully ",success:true})
};


// Get all contact
export const getAllContact = async (req, res) => {
  const userContect = await Contact.find();
  if (!userContect)
    return res.json({ message: "No contact Exist", success: true });
  res.json({ message: "All contact fetch ", userContect });
};

// Get contact by id
export const getContactById = async (req, res) => {
  const id = req.params.id;
  const userContect = await Contact.findById(id);
  if (!userContect)
    return res.json({ message: "No Contact find", success: false });
  res.json({ message: "contact are fetch", userContect, success: true });
};

// Get contact by id
export const getContactByUserId = async (req, res) => {
  const id = req.params.id;
  const userContect = await Contact.find({user:id});
  if (!userContect[0])
    return res.json({ message: "No Contact find", success: false });
  res.json({ message: " User Specifice contact are fetched", userContect, success: true });
};


