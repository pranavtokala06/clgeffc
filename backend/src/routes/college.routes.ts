import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// ✅ FIRST: get all
router.get("/", async (req, res) => {
  const colleges = await prisma.college.findMany();
  res.json(colleges);
});

// ✅ THEN: get by id
router.get("/:id", async (req, res) => {
  const college = await prisma.college.findUnique({
    where: { id: req.params.id },
  });
  res.json(college);
})
export default router;