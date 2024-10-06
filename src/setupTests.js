import "@testing-library/jest-dom";

/*
 * === CITATION BEGIN ===
 * The code is from
 * the GitHub issue https://github.com/ai/nanoid/issues/363,
 * the comment https://github.com/ai/nanoid/issues/363#issuecomment-1458167176,
 * taken on 2023-07-31 (UTC).
 *
 * The code solves an error caused by the `nanoid` package, which is used in the `/src/services/SpaceTravelMockApi.js` file.
 */
jest.mock("nanoid", () =>
{
  return {
    nanoid: () => {}
  };
});
/*
 * === CITATION END ===
 */
