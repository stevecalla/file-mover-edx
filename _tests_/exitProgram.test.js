const { createClickableLink } = require('../utilities/hyperlinkBuyACoffee');
const { exitProgram } = require('../utilities/exitProgram');

jest.mock('../utilities/hyperlinkBuyACoffee', () => ({
  createClickableLink: jest.fn(),
}));

describe('exitProgram function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when exitProgram is called', () => {
    it('should call createClickableLink', async () => {
      await exitProgram(false);

      expect(createClickableLink).toHaveBeenCalled();
    });

    it('should log the exit message', async () => {
      // Mock console.log to capture output
      const mockLog = jest.spyOn(console, 'log').mockImplementation(() => {});

      await exitProgram(false);

      expect(mockLog.mock.calls[0][0]).toContain('See');
      expect(mockLog.mock.calls[0][0]).toContain('ya');
      expect(mockLog.mock.calls[0][0]).toContain('soon');
    });

    it('should call process.exit', async () => {
      const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

      await exitProgram(true);

      expect(mockExit).toHaveBeenCalled();
    });



  });
});