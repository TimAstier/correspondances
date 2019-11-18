import React from "react"
import { Link, graphql } from "gatsby"

import "../fonts/fonts-post.css"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { rhythm, scale } from "../utils/typography"
import { formatPostDate, formatReadingTime } from "../utils/helpers"

const GITHUB_USERNAME = "TimAstier"
const GITHUB_REPO_NAME = "corrrespondances"

const Post = ({ data }) => {
  const { markdownRemark } = data
  const { html } = markdownRemark

  const post = markdownRemark
  const editUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/master/src/pages/${post.slug}`

  return (
    <Layout
      title="Correspondances"
      location={{ pathname: post.frontmatter.pathname }}
    >
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.spoiler}
      />
      <main>
        <article>
          <header>
            <h1 style={{ color: "var(--textTitle)" }}>
              {post.frontmatter.title}
            </h1>
            <p
              style={{
                ...scale(-1 / 5),
                display: "block",
                marginBottom: rhythm(1),
                marginTop: rhythm(-4 / 5),
              }}
            >
              {formatPostDate(post.frontmatter.date, "en")}
              {` • ${formatReadingTime(post.timeToRead)}`}
            </p>
          </header>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <footer>
            <p>
              <a href={editUrl} target="_blank" rel="noopener noreferrer">
                Edit on GitHub
              </a>
            </p>
          </footer>
        </article>
      </main>
      <aside>
        <h3
          style={{
            fontFamily: "Montserrat, sans-serif",
            marginTop: 0,
            marginBottom: 0,
            height: 42, // because
            lineHeight: "2.625rem",
          }}
        >
          <Link
            style={{
              boxShadow: "none",
              textDecoration: "none",
              color: "rgb(255, 167, 196)",
            }}
            to={"/"}
          >
            Correspondances
          </Link>
        </h3>
      </aside>
    </Layout>
  )
}

export default Post

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
