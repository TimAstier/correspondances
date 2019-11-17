const path = require(`path`)
const slash = require(`slash`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const MarkdownPost = path.resolve(`src/templates/MarkdownPost.js`)

  // Query content for Markdown posts
  const markdownResult = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  markdownResult.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: MarkdownPost,
      context: {}, // additional data can be passed via context
    })
  })

  // Handle errors
  if (markdownResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const WordpressPost = path.resolve(`./src/templates/WordpressPost.js`)

  // Query content for WordPress posts
  const result = await graphql(`
    query {
      allWordpressPost {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  result.data.allWordpressPost.edges.forEach(edge => {
    createPage({
      path: edge.node.slug,
      component: slash(WordpressPost),
      context: {
        id: edge.node.id,
      },
    })
  })
}
