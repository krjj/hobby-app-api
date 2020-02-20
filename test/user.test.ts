import request from "supertest";
import app from "../src/app";

describe("GET /users", () => {
    it("should return 200 OK", () => {
        return request(app).get("/users")
            .expect(200);
    });
});

describe("POST /user", () => {
    it("should return 422 Status because no name is provided", (done) => {
        return request(app).post("/user")
            .field("name", "")
            .expect(422).end((err, res) => {
                if (err) {
                    done.fail(err);
                }
                console.log(res.body);
                done();
            });
    });
});

