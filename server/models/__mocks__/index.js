// const models = jest.genMockFromModule("../");

// models.thing = {
//   // findByPk: jest.fn(),
//   // findOne: jest.fn(),
//   // findAll: jest.fn(),
//   // solely exists to confirm it was imported correctly
//   weirdFunc: jest.fn(() => 42),
// };

// export default models;

export const mockFindOne = jest.fn();
const mock = jest.fn().mockImplementation(() => {
  return { findOne: mockFindOne };
});

export default mock;
