const { db } = require("./database");

// Global setup - runs once before all tests
beforeAll(async () => {
  // Ensure database is ready
  await db.authenticate();
});

// Global teardown - runs once after all tests
afterAll(async () => {
  await db.close();
});

// Handle process termination to ensure db connection is closed
process.on("SIGINT", async () => {
  await db.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await db.close();
  process.exit(0);
});
