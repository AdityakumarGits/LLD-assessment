const { validateSubmission } = require("../server/services/submissionValidator");

describe("Submission Validator", () => {
  test("rejects an empty submission", () => {
    const result = validateSubmission({});

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  test("accepts a valid submission", () => {
    const result = validateSubmission({
      assumptions: "One vehicle can occupy one spot.",
      classes: [
        {
          name: "ParkingLot",
          responsibility: "Manage parking spots.",
          methods: ["parkVehicle"]
        }
      ],
      relationships: "ParkingLot contains ParkingSpot objects.",
      designDecisions: "Keep fee calculation separate.",
      extensibility: "Add EV spots using a new spot type.",
      edgeCases: "Handle full parking lot."
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });
});
