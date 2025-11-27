import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";

export const isAthenticated = async (req, res, next) => {
  const token = req.header("Auth");
  if (!token)
    // console.log("Token is =", token);
    return res.json({ message: "Login First" });

  const decoded = jwt.verify(token,process.env.jwt );

  console.log("Token Data is =", decoded);

  var id = decoded.userId;
  let user = await User.findById(id);
  if (!user) return res.json({ message: "User are not found", success: false });
  req.user = user;
  next();
};
