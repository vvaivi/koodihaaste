const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);
const Vegetable = require("../models/vegetable");

describe("when there are some veggies in database", () => {
  beforeEach(async () => {
    await Vegetable.deleteMany({});
    await Vegetable.insertMany(helper.initialVeggies);
  });

  test("those are returned as json", async () => {
    const response = await api
      .get("/api/vegetables")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(helper.initialVeggies.length);
  });

  test("those are identified by field id", async () => {
    const response = await api
      .get("/api/vegetables")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body[0].id).toBeDefined();
  });

  describe("addition of a vegetable", () => {
    test("succeeds if content valid", async () => {
      const newVeggie = {
        name: "Luumu",
        energy: 100,
        carbs: 50,
        protein: 20,
        fat: 30,
      };

      await api
        .post("/api/vegetables")
        .send(newVeggie)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const veggiesAtEnd = await helper.vegetablesInDb();
      expect(veggiesAtEnd).toHaveLength(helper.initialVeggies.length + 1);

      const names = veggiesAtEnd.map((v) => v.name);
      expect(names).toContain("Luumu");
    });
  });

  describe("Info of one vegetable", () => {
    test("Info is returned with valid id", async () => {
      const veggieAtStart = (await helper.vegetablesInDb())[0];
      const response = await api
        .get(`/api/vegetables/${veggieAtStart.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.name).toContain("Porkkana");
    });

    test("Info is returned with valid id", async () => {
      const veggieAtStart = (await helper.vegetablesInDb())[0];
      const response = await api
        .get(`/api/vegetables/${veggieAtStart.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);
        
      expect(response.body.name).toContain("Porkkana");
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
