import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"

const Blog = () => (
  <Layout>
    <SEO />
    <StaticQuery
      query={graphql`
        query BlogAllPostQuery {
          allWordpressPost(sort: { fields: [date], order: DESC }) {
            edges {
              node {
                date(formatString: "DD, MMM YYYY")
                title
                excerpt
                author {
                  name
                }
                categories {
                  id
                  name
                }
                slug
              }
            }
          }
          allWordpressCategory {
            edges {
              node {
                id
                count
                name
              }
            }
          }
        }
      `}
      render={data => (
        <div className="container">
          <div>
            {data.allWordpressCategory.edges.map(({ node }) => {
              return (
                <div key={node.id}>
                  <div>{`${node.name}: ${node.count}`}</div>
                </div>
              )
            })}
          </div>
          <div className="row">
            <div className="col col-xs-12">
              <div className="blog-grids">
                {data.allWordpressPost.edges.map(({ node }) => (
                  <div key={node.slug} className="grid">
                    <div className="entry-body">
                      <span className="cat">
                        {node.categories &&
                          node.categories.map(category => `${category.name}, `)}
                      </span>
                      <h3>
                        <Link
                          to={node.slug}
                          dangerouslySetInnerHTML={{ __html: node.title }}
                        />
                      </h3>
                      <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                      <div className="read-more-date">
                        <Link to={node.slug}>Read More.</Link>
                        <span className="date">{node.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    />
  </Layout>
)

export default Blog
