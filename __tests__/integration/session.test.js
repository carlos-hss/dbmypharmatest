// const request = require("supertest");
// const app = require("../../app");
// const axios = require("axios")
// jest.mock("axios")
// const mongoConnect = require("../../mongo");

// describe("Testing Products", () => {
//     it("should return status 200 (GET)", async () => {
//         await axios
//             .get.mockResolvedValue("/produtos")
//             .then((res) => {
//                 expect(res.statusCode).toBe(200);
//             });
//     });
//     it("should return status 201 (POST)", async () => {
//         const data = {
//             data: {
//                 name: "Paracetabem",
//                 description: "Usado para curar",
//                 price: 150,
//                 inventory: 16,
//                 category: "Medicamentos",
//                 brand: "Cimed",
//             },
//         };
//         await request(app)
//             .post("/produtos", JSON.stringify(data), {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             })
//             .then((res) => {

//                 expect(res.statusCode).toBe(201);
//             });
//     });
//     it("should return status 200", async () => {
//         await request(app)
//             .delete(`/produtos`)
//             .then((res) => {
//                 expect(res.statusCode).toBe(200);
//             });
//     });
//     afterAll(async () => {
//         await mongoConnect.disconnect();
//     });
// });
