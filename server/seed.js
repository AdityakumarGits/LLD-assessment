const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const Problem = require("./models/Problem");

const problems = [
  {
    title: "Parking Lot",
    difficulty: "Medium",
    description:
      "Design a parking lot that supports different vehicle types, multiple floors, parking spots, tickets and fee calculation.",
    requirements: [
      "Support multiple parking floors.",
      "Support different vehicle types.",
      "Support different parking spot types.",
      "Generate a ticket when a vehicle enters.",
      "Calculate parking fees when a vehicle exits."
    ],
    constraints: [
      "A vehicle should not occupy more than one parking spot.",
      "Parking spot allocation should be separated from fee calculation.",
      "The design should be easy to extend for new vehicle types."
    ],
    extensionScenario:
      "Add electric vehicle parking and charging spots without rewriting the existing parking allocation logic."
  },
  {
    title: "Vending Machine",
    difficulty: "Easy",
    description:
      "Design a vending machine that manages products, inventory, payments, selection and change.",
    requirements: [
      "Store multiple products.",
      "Track product inventory.",
      "Accept money from the customer.",
      "Allow product selection.",
      "Return change when necessary.",
      "Handle out-of-stock products."
    ],
    constraints: [
      "A purchase should not complete without enough money.",
      "Inventory must decrease after a successful purchase.",
      "Invalid selections should not lose the customer's money."
    ],
    extensionScenario:
      "Add card and UPI payments while keeping cash payment support."
  },
  {
    title: "Elevator System",
    difficulty: "Hard",
    description:
      "Design an elevator system that handles requests from multiple floors and multiple elevators.",
    requirements: [
      "Support multiple elevators.",
      "Track elevator floor and direction.",
      "Accept floor requests.",
      "Assign requests to elevators.",
      "Handle elevator movement states."
    ],
    constraints: [
      "An elevator should not receive impossible movement commands.",
      "The request assignment logic should be replaceable.",
      "The design should represent elevator state clearly."
    ],
    extensionScenario:
      "Add emergency and maintenance requests with higher priority than normal requests."
  },
  {
    title: "Library Management System",
    difficulty: "Medium",
    description:
      "Design a library system that manages books, members, borrowing, returns, availability and fines.",
    requirements: [
      "Manage books and copies.",
      "Register library members.",
      "Borrow available books.",
      "Return borrowed books.",
      "Track due dates.",
      "Calculate overdue fines."
    ],
    constraints: [
      "A physical book copy cannot be borrowed by two members at the same time.",
      "Fine calculation should be independent from book inventory.",
      "The design should support reservations later."
    ],
    extensionScenario:
      "Add a reservation and waiting-list system for unavailable books."
  },
  {
    title: "Food Delivery System",
    difficulty: "Hard",
    description:
      "Design a food delivery system that manages customers, restaurants, menu items, orders and delivery assignment.",
    requirements: [
      "Customers can browse restaurants.",
      "Restaurants manage menu items.",
      "Customers can create orders.",
      "Orders move through defined states.",
      "Delivery agents can be assigned to orders."
    ],
    constraints: [
      "Invalid order state transitions should be rejected.",
      "Order pricing should be separated from delivery assignment.",
      "The design should support additional payment methods."
    ],
    extensionScenario:
      "Add order cancellation and refund handling with clear state transitions."
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await Problem.deleteMany({});
    await Problem.insertMany(problems);

    console.log("Problems seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();
