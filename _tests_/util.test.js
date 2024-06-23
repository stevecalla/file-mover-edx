const {
  blueColor,
  whiteColor,
} = require("../utilities/colors");
const { capitalizeFirstCharacter, lowerCase, isPathStartsWithSlash } = require("../utilities/util");

describe("Capitalize", () => {
  it("should capitalize first char and lower case other char of one word string", () => {
    let test1 = "joanna";
    let test2 = "BESTY";
    let test3 = "aMAnda";

    expect(capitalizeFirstCharacter(test1)).toBe("Joanna");
    expect(capitalizeFirstCharacter(test2)).toBe("Besty");
    expect(capitalizeFirstCharacter(test3)).toBe("Amanda");
  });
});

describe("Lower Case", () => {
  it("should convert one word string to lower case", () => {
    let test1 = "jOanna";
    let test2 = "BESTY";
    let test3 = "aMAnda";

    expect(lowerCase(test1)).toBe("joanna");
    expect(lowerCase(test2)).toBe("besty");
    expect(lowerCase(test3)).toBe("amanda");
  });
});

describe("Is Number", () => {
  it("should input a number with no letters", () => {
    let test1 = "a";
    let test2 = "a1";
    let test3 = "aaaaa1";
    let test4 = "3";
    let test5 = "4526";

    expect(isNumber(test1)).toBe("Please provide a number (with no letters).");
    expect(isNumber(test2)).toBe("Please provide a number (with no letters).");
    expect(isNumber(test3)).toBe("Please provide a number (with no letters).");
    expect(isNumber(test4)).toBe(true);
    expect(isNumber(test5)).toBe(true);
  });
});

describe("Is Email", () => {
  it("should provide a valid email in the form of a@a.com", () => {
    let test1 = "a";
    let test2 = "a@";
    let test3 = "a@a";
    let test4 = "a@a.";
    let test5 = "a@a.com";

    expect(isEmail(test1)).toBe("Please provide a valid email address!");
    expect(isEmail(test2)).toBe("Please provide a valid email address!");
    expect(isEmail(test3)).toBe("Please provide a valid email address!");
    expect(isEmail(test4)).toBe("Please provide a valid email address!");
    expect(isEmail(test5)).toBe(true);
  });
});

describe("Is Blank", () => {
  it("should request a name if input is blank", () => {
    let test1 = " ";
    let test2 = "      ";
    let test3 = "      Joanna";

    expect(isBlank(test1, "first name")).toBe("Please, provide a first name.");
    expect(isBlank(test2, "first name")).toBe("Please, provide a first name.");
    expect(isBlank(test3, "first name")).toBe(true);
  });
});

describe("Starts with Slash", () => {
  it("should return true if starts with a slash", () => {
    const examplePath = "/Users/stevecalla/uoregon_fullstack/UofO-VIRT-FSF-PT-01-2024-U-LOLC";

    let test1 = "/Users/stevecalla/uoregon_fullstack/UofO-VIRT-FSF-PT-01-2024-U-LOLC";
    let test2 = "Users/stevecalla/uoregon_fullstack/UofO-VIRT-FSF-PT-01-2024-U-LOLC";
    let test3 = "";

    expect(isPathStartsWithSlash(test1)).toBe(true);
    expect(isPathStartsWithSlash(test2)).toBe(`Invalid Path. Must start with a ${blueColor}slash similar to ${examplePath}${whiteColor}.`);
    expect(isPathStartsWithSlash(test3)).toBe(`Invalid Path. Must start with a ${blueColor}slash similar to ${examplePath}${whiteColor}.`);
  });
});
