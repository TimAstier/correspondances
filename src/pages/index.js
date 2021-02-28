import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import { formatPostDate, formatReadingTime } from "../utils/helpers"
import { rhythm } from "../utils/typography"
import SEO from "../components/Seo"
import 'react-chessground/dist/styles/chessground.css'

const Blog = ({ data }) => {
  const posts = data.allMdx.edges

  return (
    <Layout title="Correspondances" location={{ pathname: "/" }}>
      <SEO title="Correspondances" />
      <div>Personal ♞ Chess Blog</div>
      <main>
        {posts.map(({ node }) => {
          return (
            <article key={node.frontmatter.path}>
              <header>
                <h3
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: rhythm(1),
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link
                    style={{ boxShadow: "none" }}
                    to={node.frontmatter.path}
                    rel="bookmark"
                  >
                    {node.frontmatter.title}
                  </Link>
                </h3>
                <small>
                  {formatPostDate(node.frontmatter.date, "en")}
                  {` • ${formatReadingTime(node.timeToRead)}`}
                </small>
              </header>
              <p
                dangerouslySetInnerHTML={{ __html: node.frontmatter.spoiler }}
              />
            </article>
          )
        })}
      </main>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query BlogAllPostQuery {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            spoiler
            path
          }
        }
      }
    }
  }
`
