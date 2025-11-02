const express = require("express");
const {
  getAllPatients,
  getPatientById,
  insertPatient,
  deletePatient,
} = require("../controllers/patient.controller");

const router = express.Router();

router.get("/getAll", async (req, res) => {
  let list = await getAllPatients();
  res.json(list);
});
router.get("/getById/:id", async (req, res) => {
  let one = await getPatientById(req.params.id);
  res.json(one);
});

router.post("/add", async (req, res) => {
  const body = req.body;
  let result = await insertPatient(body);
  res.json(result);
});

router.delete("/delete/:id", async (req, res) => {
  let result = await deletePatient(req.params.id);
  res.json(result);
});

module.exports = router;
