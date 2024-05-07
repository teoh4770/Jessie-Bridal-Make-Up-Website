// 11ty config file
// using node js, common module (not ES6)
module.exports = function (eleventyConfig) {
  // wouldn't take assets and css files by default
  // addPassthroughCopy: to add assets, css and js files
  eleventyConfig.addPassthroughCopy("./src/style.css");
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/app.js");
  eleventyConfig.addPassthroughCopy("./src/images.js");
  eleventyConfig.addPassthroughCopy("src/assets/img");

  // eleventyConfig.addPassthroughCopy("./src/portfolio/portfolio.11tydata.js");

  return {
    // tell 11ty 
    // - where the source is
    // - where the output be
    dir: {
      input: "src",
      output: "public", // _site is the default output folder
    },
  };
};
