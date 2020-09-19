import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import { Layout } from '../components/common'

const ProductsPage = ({ data }) => (
    <Layout>
        <div className="container">
            <article className="content" style={{ textAlign: `center` }}>
                <h1 className="content-title">Products</h1>
                <section className="content-body">
                    {
                        data.allStripePrice.edges &&
                        data.allStripePrice.edges.map(edge => <div key={ edge.node.product.id } >
                            <img src={ edge.node.product.images[0] }/>
                            <h2>{ edge.node.product.name }</h2>
                            <h3>{ edge.node.unit_amount / 100 } { edge.node.currency }</h3>
                        </div>)
                    }
                </section>
            </article>
        </div>
    </Layout>
)

export default ProductsPage

ProductsPage.propTypes = {
    data: PropTypes.object,
}

export const productsQuery = graphql`
{
    allStripePrice {
        edges {
            node {
                id,
                unit_amount
                currency
                product {
                    id
                    images
                    name
                }
            }
        }
    }
}
`