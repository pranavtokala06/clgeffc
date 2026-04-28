import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL!,
    },
  },
});
async function main() {
  await prisma.college.createMany({
    data: [
      {
        name: "IIT Bombay",
        location: "Mumbai",
        fees: 200000,
        rating: 4.8,
        description: "Top engineering institute in India",
      },
      {
        name: "IIT Delhi",
        location: "Delhi",
        fees: 195000,
        rating: 4.7,
        description: "Premier institute with strong placements",
      },
      {
        name: "BITS Pilani",
        location: "Pilani",
        fees: 220000,
        rating: 4.6,
        description: "Private institute with flexible curriculum",
      },
      {
        name: "NIT Trichy",
        location: "Trichy",
        fees: 150000,
        rating: 4.5,
        description: "Top NIT with great campus",
      },
      {
        name: "IIIT Hyderabad",
        location: "Hyderabad",
        fees: 300000,
        rating: 4.7,
        description: "Research-focused tech institute",
      }
    ],
  });

  console.log("🌱 Seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });