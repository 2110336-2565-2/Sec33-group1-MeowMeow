import { SeedGenerator } from "./types";
import { backendConfig } from "config";
import * as bcrypt from "bcrypt";
import { BookingStatus } from "@prisma/client";

export const devSeed: SeedGenerator = async (prisma) => {
  const hashRound = backendConfig.bcrypt.hashRound;

  // clear all existing data
  await prisma.$transaction([
    prisma.location.deleteMany(),
    prisma.tourStyle.deleteMany(),
    prisma.review.deleteMany(),
    prisma.booking.deleteMany(),
    prisma.post.deleteMany(),
    prisma.guide.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // generate new data
  await prisma.$transaction([
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    prisma.user.createMany({
      data: [
        {
          id: 1,
          updatedAt: new Date(),
          email: "jester@gmail.com",
          hashedPassword: await bcrypt.hash("12345678", hashRound),
          username: "pinkerton",
          firstName: "Arthur",
          lastName: "Morgan",
        },
        {
          id: 2,
          updatedAt: new Date(),
          email: "test@gmail.com",
          hashedPassword: await bcrypt.hash("12345678", hashRound),
          username: "chuck",
          firstName: "Charles",
          lastName: "McGill",
        },
        {
          id: 3, // guide NO 1
          updatedAt: new Date(),
          email: "testguide@gmail.com",
          hashedPassword: await bcrypt.hash("12345678", hashRound),
          username: "LosHeavenGuide",
          firstName: "Tommy",
          lastName: "Angelo",
        },
        {
          id: 4,
          updatedAt: new Date(),
          email: "io@ioi.com",
          hashedPassword: await bcrypt.hash("12345678", hashRound),
          username: "RottenOrange",
          firstName: "I",
          lastName: "O",
        },
        {
          id: 5, // guide NO 2
          updatedAt: new Date(),
          email: "tom@gmail.com",
          hashedPassword: await bcrypt.hash("12345678", hashRound),
          username: "hellobitch",
          firstName: "foobarz",
          lastName: "johndoes",
        },
      ],
    }),
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    prisma.guide.createMany({
      data: [
        {
          id: 1,
          userId: 3,
          certificateId: "helloworld",
          paymentId: "123-12121",
          taxId: "maimee mainee maijai",
          brandBankAccount: "jeentao-macao888",
          numberBankAccount: "123456",
          nameBankAccount: "hello",
        },
        {
          id: 2,
          userId: 5,
          certificateId: "paid=true",
          paymentId: "123-12122",
          taxId: "maimee mainee maijai",
          brandBankAccount: "bank purple color",
          numberBankAccount: "99998",
          nameBankAccount: "NNN",
        },
      ],
    }),
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    prisma.location.createMany({
      data: [
        { id: 1, locationName: "Pattaya" },
        { id: 2, locationName: "Albuquerque" },
        { id: 3, locationName: "Bangkok" },
        { id: 4, locationName: "XinJiang" },
        { id: 5, locationName: "Santa Fe" },
      ],
    }),
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    prisma.tourStyle.createMany({
      data: [
        { id: 1, tourStyleName: "Tee Ka Ree" },
        { id: 2, tourStyleName: "Police VIP" },
        { id: 3, tourStyleName: "Adventure" },
        { id: 4, tourStyleName: "Tam Rou Buddha" },
      ],
    }),
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    prisma.guide.update({
      where: {
        id: 1,
      },
      data: {
        GuideLocation: {
          createMany: {
            data: [{ locationId: 1 }, { locationId: 2 }, { locationId: 3 }],
          },
        },
        GuideTourStyle: {
          createMany: {
            data: [{ tourStyleId: 1 }, { tourStyleId: 2 }],
          },
        },
      },
    }),
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    prisma.guide.update({
      where: {
        id: 2,
      },
      data: {
        GuideLocation: {
          createMany: {
            data: [{ locationId: 1 }, { locationId: 2 }, { locationId: 4 }],
          },
        },
        GuideTourStyle: {
          createMany: {
            data: [{ tourStyleId: 3 }],
          },
        },
      },
    }),
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    prisma.post.createMany({
      data: [
        {
          id: 1,
          updatedAt: new Date(),
          title: "Kao Chon Kai 2022",
          content: "Teaw Kai Ror Dor",
          authorId: 5,
          tags: ["Rakchad", "Kai Deang"],
          fee: 199.99,
          maxParticipant: 2500,
          contactInfo: "ผบ.ทบ.",
        },
        {
          id: 2,
          updatedAt: new Date(),
          title: "Tokyo Trip",
          content: "go to Akihabara",
          authorId: 3,
          tags: ["Jim Krapong Fak Pheun"],
          fee: 199000.99,
          maxParticipant: 5,
          contactInfo: "090-000-0123",
        },
      ],
    }),
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    prisma.review.createMany({
      data: [
        {
          publishDate: new Date(),
          score: 1.0,
          text: "KUY DOG",
          reviewerId: 4,
          guideId: 1,
        },
        {
          publishDate: new Date(),
          score: 5.0,
          text: "dee mak krub(soldier id=2)",
          reviewerId: 4,
          guideId: 2,
        },
        {
          publishDate: new Date(),
          score: 4.0,
          text: "view suay mak",
          reviewerId: 1,
          guideId: 2,
        },
      ],
    }),
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    prisma.booking.createMany({
      data: [
        {
          id: 1,
          updatedAt: new Date(),
          startDate: new Date("2022-04-25"),
          endDate: new Date("2022-04-27"),
          bookingStatus: BookingStatus.WAITING_FOR_GUIDE_CONFIRMATION,
          userId: 1,
          postId: 1,
        },
        {
          id: 2,
          updatedAt: new Date(),
          startDate: new Date("2022-04-7"),
          endDate: new Date("2022-04-9"),
          bookingStatus: BookingStatus.WAITING_FOR_GUIDE_CONFIRMATION,
          userId: 2,
          postId: 1,
        },
        {
          id: 3,
          updatedAt: new Date(),
          startDate: new Date("2022-05-13"),
          endDate: new Date("2022-05-19"),
          bookingStatus: BookingStatus.WAITING_FOR_GUIDE_CONFIRMATION,
          userId: 1,
          postId: 2,
        },
      ],
    }),
  ]);
};
