const prisma = require("../db");

const getAllPatients = async () => {
  let patients = await prisma.Patient.findMany();
  return patients;
};

const getPatientById = async (id) => {
  let patient = await prisma.Patient.findUnique({
    where: {
      id,
    },
  });
  return patient;
};

const insertPatient = async (formData) => {
  let patients = await prisma.Patient.create({
    data: formData,
  });
  return patients;
};

const deletePatient = async (id) => {
  let patients = await prisma.Patient.delete({
    where: {
      id,
    },
  });
  return patients;
};

module.exports = {
  getAllPatients,
  getPatientById,
  insertPatient,
  deletePatient,
};
