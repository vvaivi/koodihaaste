const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);
const Vegetable = require("../models/vegetable");
const Battle = require("../models/battle");
const { init } = require("../models/vegetable");

describe("when there are some battles in database", () => {
    beforeEach(async () => {
      await Vegetable.deleteMany({});
      await Battle.deleteMany({});
      await Vegetable.insertMany(helper.initialVeggies);

      const response = await api
      .get("/api/vegetables")
      .expect(200)
      .expect("Content-Type", /application\/json/);

      const initialBattles = [
        {
            player1: response.body[0].id,
            player2: response.body[1].id,
        },
        {
          player1: response.body[0].id,
          player2: response.body[0].id,
      }
    ]
       
      await api
      .post("/api/battle")
        .send(initialBattles)
        .expect(201)
        .expect("Content-Type", /application\/json/);
    });

    test("battles can be added and those are returned as json", async () => {
        const response = await api
          .get("/api/battle")
          .expect(200)
          .expect("Content-Type", /application\/json/);
    
        expect(response.body).toHaveLength(1);
      });
    
    test("those are identified by field id", async () => {
    const response = await api
        .get("/api/battle")
        .expect(200)
        .expect("Content-Type", /application\/json/);

    expect(response.body[0].id).toBeDefined();
    });
});

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

  test("number of wins can be edited", async () => {
    const veggieAtStart = (await helper.vegetablesInDb())[0];
    const editedVeggie = {
      ...veggieAtStart,
      wins: 99,
    };

    await api.put(`/api/vegetables/${veggieAtStart.id}`).send(editedVeggie).expect(200);

    const veggiesAtEnd = await helper.vegetablesInDb();
    const veggieAtEnd = veggiesAtEnd.find((v) => v.id === veggieAtStart.id);
    expect(veggieAtEnd.wins).toBe(99);
  });
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

describe("info of one vegetable", () => {
  test("info is returned with valid id", async () => {
    const veggieAtStart = (await helper.vegetablesInDb())[0];
    const response = await api
      .get(`/api/vegetables/${veggieAtStart.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.name).toContain("Porkkana");
  });

  test("info is returned with valid id", async () => {
    const veggieAtStart = (await helper.vegetablesInDb())[0];
    const response = await api
      .get(`/api/vegetables/${veggieAtStart.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.name).toContain("Porkkana");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
