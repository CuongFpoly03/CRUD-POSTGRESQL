const express = require("express");

const route = express.Router();
const userController = require("../controllers/userController");
route.get("/user", userController.getAll);
route.post("/create", userController.createUser);
route.get("/user/:id", userController.getONEID);
route.delete("/delete/:id", userController.deleteUser);
route.put("/update/:id", userController.updateUser);
module.exports = route;
