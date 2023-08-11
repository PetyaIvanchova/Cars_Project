const router = require("express").Router();

const authService = require("../services/authService");
const userService = require("../services/userService");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const token = await authService.login(username, password);
  return res.json({ data: token });
});

router.post("/register", async (req, res) => {
  const { email, username, password, repeatPassword } = req.body;
  const response = await authService.register(
    email,
    username,
    password,
    repeatPassword
  );
  return res.json({ data: response });
});

router.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userService.getOne(id);

  return res.json({data: user});
});

router.post("/users/edit", async (req, res) => {
  const {_id, username, email, phone} = req.body;
  console.log(req.body);
  const user = await userService.editUser(_id, username, email, phone);
 console.log('back')
  return res.json({data: user});
});

module.exports = router;
