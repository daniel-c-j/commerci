import { generateAccessToken } from "./paypal";

// Test to generate access token from paypal
test("Generates token from paypal", async () => {
  const tokenResponse = await generateAccessToken();
  console.log(tokenResponse, { debug: true });

  expect(typeof tokenResponse).toBe("string");
  expect(tokenResponse.length).toBeGreaterThan(0);
});
