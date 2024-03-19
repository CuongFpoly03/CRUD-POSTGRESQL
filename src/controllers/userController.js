const prisma = require("../configs/prisma");

const getAll = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "loi" });
  }
};

const createUser = async (req, res) => {
  try {
    const userData = {
    ...req.body
    };

    const newUser = await prisma.user.create({
      data: userData,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getONEID = async (req, res) => {
  const userID = parseInt(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userID,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "loi duong dan" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
};

const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    res.status(200).json({ message: "success !" });
  } catch (error) {
    res.status(500).json({ error: "Loi" });
  }
};

const updateUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  const { username, email, password } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
        email,
        password,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Loi" });
  }
};

module.exports = {
  getAll: getAll,
  createUser: createUser,
  getONEID: getONEID,
  deleteUser: deleteUser,
  updateUser: updateUser,
};
