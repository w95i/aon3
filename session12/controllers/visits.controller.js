const prisma = require("../db");

const getAllVisits = async () => {
  let visits = await prisma.Visit.findMany();
  return visits;
};

const getVisitById = async (id) => {
  let visit = await prisma.Visit.findUnique({
    where: {
      id,
    },
  });
  return visit;
};

const insertVisit = async (formData) => {
  let visits = await prisma.Visit.create({
    data: formData,
  });
  return visits;
};

const deleteVisit = async (id) => {
  let visits = await prisma.Visit.delete({
    where: {
      id,
    },
  });
  return visits;
};

module.exports = {
  getAllVisits,
  getVisitById,
  insertVisit,
  deleteVisit,
};
