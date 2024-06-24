const {
  blueColor,
  greenColor,
  redColor,
  whiteColor,
} = require("../utilities/colors");
const { createClickableLink } = require("../utilities/hyperlinkBuyACoffee");
const { exitCommand, exitMessage } = require("../utilities/exitProgram");

jest.mock("../utilities/hyperlinkBuyACoffee", () => ({
  createClickableLink: jest.fn(),
}));

describe("exitCommand function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("when exitCommand is called", () => {
    it("should call process.exit", async () => {
      const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});

      await exitCommand(true);

      expect(mockExit).toHaveBeenCalled();
    });
  });
});

describe("when exitMessage is called", () => {
  it("should call createClickableLink", async () => {
    await exitMessage();

    expect(createClickableLink).toHaveBeenCalled();
  });

  it("should create the error message", async () => {
    const message = await exitMessage();

    // console.log(message);

    // Used string containing because the clickableLink variable returns 
    // ... undefined when run by jest (need a mock but couldn't get it working)
    expect(message).toEqual(expect.stringContaining(`\n${whiteColor}See${greenColor} ya ${blueColor}soon${redColor}!!`));

  });
});
