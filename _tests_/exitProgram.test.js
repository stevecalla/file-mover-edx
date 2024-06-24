const {
  blueColor,
  greenColor,
  redColor,
  whiteColor,
} = require("../utilities/colors");
const { createClickableLink } = require("../utilities/hyperlinkBuyACoffee");
const { exitProgram, exitMessage } = require("../utilities/exitProgram");

jest.mock("../utilities/hyperlinkBuyACoffee", () => ({
  createClickableLink: jest.fn(),
}));

describe("exitProgram function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("when exitProgram is called", () => {
    it("should call process.exit", async () => {
      const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});

      await exitProgram(true);

      expect(mockExit).toHaveBeenCalled();
    });
  });
});

describe("when exitMessage is called", () => {
  it("should call createClickableLink", async () => {
    await exitMessage();

    expect(createClickableLink).toHaveBeenCalled();
  });

  it("should log the exit message", async () => {
    const message = await exitMessage();

    // console.log(message);

    // Used string containing because the clickableLink variable returns 
    // ... undefined when run by jest (need a mock but couldn't get it working)
    expect(message).toEqual(expect.stringContaining(`\n${whiteColor}See${greenColor} ya ${blueColor}soon${redColor}!!`));

  });
});
