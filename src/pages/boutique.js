import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Masonry from 'react-masonry-css'
import { loadStripe } from "@stripe/stripe-js"
import Loader from 'react-loader-spinner'
import { Layout } from '../components/common'

let stripePromise
const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(`pk_test_51HSkjEESwcpNJaCzzCwbOiSWD1DFaYubF0nNxIBNkqxnDWS9cNfOhYjjb1r9rYn2xe47hzF41Q5tUwZVo1sel2lL00VcoCVKcp`)
    }
    return stripePromise
}

const ProductsPage = ({ data }) => {
    const [loading, setLoading] = useState(false)

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
    }

    const redirectToCheckout = async (event, id) => {
        event.preventDefault()
        setLoading(true)
        const stripe = await getStripe()
        const { error } = await stripe.redirectToCheckout({
            mode: `payment`,
            lineItems: [{ price: id, quantity: 1 }],
            successUrl: `http://localhost:8000/page-2/`,
            cancelUrl: `http://localhost:8000/`,
        })
        if (error) {
            console.warn(`Error:`, error)
            setLoading(false)
        }
        return false
    }

    return (
        <Layout>
            <div className="container">
                <article className="content" style={{ textAlign: `center` }}>
                    <h1 className="content-title">Boutique</h1>
                    <section className="content-body">
                        <Masonry breakpointCols={breakpointColumnsObj}>
                            {
                                data.allStripePrice.edges &&
                                data.allStripePrice.edges.map(edge => <div key={ edge.node.product.id } >
                                    <h2>{ edge.node.product.name }</h2>
                                    <img src={ edge.node.product.images[0] }/>
                                    <h3>{ edge.node.unit_amount / 100 } { edge.node.currency }</h3>
                                    <p>{ edge.node.product.description }</p>
                                    <button
                                        disabled={loading}
                                        onClick={e => redirectToCheckout(e, edge.node.id)}
                                    >
                                        {
                                            loading ? <Loader
                                                type="ThreeDots"
                                                color="#3eb0ef"
                                                height={20}
                                                width={20}
                                    
                                            /> : `Acheter`
                                        }
                                    </button>
                                </div>)
                            }
                        </Masonry>
                    </section>
                </article>
            </div>
        </Layout>
    )
}

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
                    description
                }
            }
        }
    }
}
`