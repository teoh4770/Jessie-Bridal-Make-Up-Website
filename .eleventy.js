module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/style.css");
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/app.js");
  eleventyConfig.addPassthroughCopy("src/assets/img");

  // eleventyConfig.addPassthroughCopy("./src/portfolio/portfolio.11tydata.js");

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
