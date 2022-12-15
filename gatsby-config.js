module.exports = {
  siteMetadata: {
    title: `PypKa Server`,
    description: `A free webserver for Poisson-Boltzmann-based and AI-accelerated pKa calculations.`,
    author: `@pedror`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `PypKa-Server`,
        short_name: `PypKa-Server`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
  ],
};
