const router = require("express").Router();

const { isAuth } = require("../middlewares/authMiddleware");
const carService = require("../services/carService");
const userService = require("../services/userService");

router.post("/create", async (req, res) => {
  const carData = req.body;
  console.log(carData);
  const car = await carService.create(carData);
  await userService.addCar(carData.owner, car._id);

  return res.json({ data: car, message: "Successfully created car!" });
});

router.get("/catalog", async (req, res) => {
  const cars = await carService.getAll();

  return res.json(cars);
});

router.get("/catalog/:userId", async (req, res) => {
  const cars = await carService.getAllForUser(req.params.userId);

  return res.json({ data: cars, message: "Sucessfully get all cars for user!" });
});

router.get("/:carId/details", isAuth, async (req, res) => {
  try {
    let car = await carService.getOne(req.params.carId);
    if (car) {
      car = await carService.getOneDetailed(req.params.carId);
      const username = car.owner.username;
      const isOwner = car.owner._id == req.user?._id;

      return res.json({
        data: { car, username, isOwner },
        message: "Successfully get car by id!",
      });
    }

    return res.json({ message: "Car doesn't exists!" });
  } catch (err) {
    return res.json({ message: "Car doesn't exists!" });
  }
});

router.put("/:carId/edit", isAuth, async (req, res) => {
  try {
    const username = res.locals.user.username;
    const car = await carService.getOneDetailed(req.params.carId);
    const isOwner = username === car.owner.username;
    if (!isOwner) {
        return res.json({message: 'You are not allowed to edit this car!'});
    }

    const carData = req.body;
    const response = await carService.edit(req.params.carId, carData);
    const message = response ? "Successfully edited car" : "Car doen't exists!";
    return res.json({ data: response, message });
  } catch (err) {
    return res.json({ message: "Car doesn't exists!" });
  }
});

router.delete("/:carId/delete", isAuth, async (req, res) => {
  try {
    const username = res.locals.user.username;
    let car = await carService.getOneDetailed(req.params.carId);
    const isOwner = username === car?.owner?.username;
    if (!isOwner) {
        return res.json({message: 'You are not allowed to edit this car!'});
    }

    car = await carService.delete(req.params.carId);
    const message = car ? "Successfully deleted car" : "Car doesn't exists!";
    return res.json({ data: car, message });
  } catch (err) {
    console.log(err)
    return res.json({ message: "Car doesn't exists!" });
  }
});

module.exports = router;
