const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addFilter("readablePostDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: "Australia/Sydney",
    })
      .setLocale("en")
      .toLocaleString(DateTime.DATE_FULL);
  });

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: "Australia/Sydney",
    })
      .setLocale("en")
      .toISODate();
  });
  eleventyConfig.addFilter("log", (value) => {
    console.log(value);
  });
  return {
    passthroughFileCopy: true,
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"],
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
      data: "_data",
    },
  };
};
