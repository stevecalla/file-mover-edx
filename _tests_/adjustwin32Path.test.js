const path = require("path");
const os = require("os");
const { adjustWin32Path } = require("../utilities/adjustWin32Path");

describe("Adjust for Windows", () => {
  it("should adjust path correctly on Windows", async () => {
    // Mock os.platform() to return 'win32'
    jest.spyOn(os, "platform").mockReturnValue("win32");

    // Mock os.homedir() to return a predictable value
    jest.spyOn(os, "homedir").mockReturnValue("C:\\Users\\TestUser");

    const inputPath = "testDir";
    const adjustedPath = await adjustWin32Path(inputPath);

    expect(adjustedPath).toBe("C:\\Users\\TestUser\\testDir");
  });
});

describe("Adjust for Mac / Non-Windows", () => {
  it("should not modify path on non-Windows platforms", async () => {
    // Mock os.platform() to return a non-Windows platform
    jest.spyOn(os, "platform").mockReturnValue("linux");

    const inputPath = "/home/TestUser/testDir";
    const adjustedPath = await adjustWin32Path(inputPath);

    // Expect the path to remain unchanged
    expect(adjustedPath).toBe(inputPath);
  });
});
