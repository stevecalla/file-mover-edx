const { createClickableLink } = require('../utilities/hyperlinkBuyACoffee');


describe('createClickableLink function', () => {

  it("should log the clickable link", async () => {
    let hyperLink = await createClickableLink();

    // NEEDS TO BE IN THIS FORMAT TO INCLUDE THE EXPECTED LINK
    expect(hyperLink).toBe('\x1B[4;\x1B]8;;https://www.buymeacoffee.com/stevecalla\x07\x1B[0;1mVisit \x1B[36;1mLINK\x1B[0;1m to support my work.\n' +
    '\x1B[36;1mhttps://www.buymeacoffee.com/stevecalla\x1B[0;1m (hover + cmd/ctrl + click)\n' +
    '\x1B]8;;\x07\x1B[24;27m');
  });
});
