// Dependencias y modulos necesarios
const request = require("supertest"); // Simula solicitudes HTTP
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server"); // Crea BD virtual para hacer pruebas
const bcrypt = require("bcrypt"); // Encripta contraseñas
const app = require("../app");
const { User } = require("../schema/userSchema");

let mongoServer;

// Antes de todo se crea una BD en memoria
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Despues de todo se desconecta y se para la BD virtual
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Antes de cada prueba se crea un usuario en la BD
beforeEach(async () => {
  const passwordHash = bcrypt.hashSync("password123", 10);
  await User.create({
    email: "example@example.com",
    password: passwordHash,
    subscription: "starter",
    token: null,
  });
});

// Despues de cada prueba se eliminan los usuarios de la BD
afterEach(async () => {
  await User.deleteMany();
});

// Prueba a realizar en el endpoint, se simula la peticion POST y se le indica los paramentros esperados
describe("POST /api/users/login", () => {
  it("should login a user and return a token and user object", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "example@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user).toMatchObject({
      email: "example@example.com",
      subscription: "starter",
    });
    expect(typeof res.body.token).toBe("string");
  });
});
