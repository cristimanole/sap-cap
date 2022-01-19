const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("./server");

// Configure chai
chai.use(chaiHttp);
chai.should();

let app = null;

before((done) => {
	server.then((result) => {
		app = result;
		done();
	});
});

describe("Risks Operation", () => {
	describe("GET /service/risk/Risks", () => {
		it("+ should return a list of Risks", (done) => {
			chai.request(app)
				.get("/service/risk/Risks")
                .auth('risk.viewer@tester.sap.com', 'initial')
				.end((error, response) => {
					try {
						response.should.have.status(200);
						response.body.value.should.be.an("array").to.have.lengthOf(3);
						done();
					} catch (error) {
						done(error);
					}
				});
		});
	});
});

describe("Risks Unauthorized Operation", () => {
	describe("GET /service/risk/Risks", () => {
		it("+ should return a list of Risks", (done) => {
			chai.request(app)
				.get("/service/risk/Risks")
				.end((error, response) => {
					try {
						response.should.have.status(401);
						done();
					} catch (error) {
						done(error);
					}
				});
		});
	});
});