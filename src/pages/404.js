import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/common'

const NotFoundPage = () => (
    <Layout>
        <div className="container">
            <article className="content" style={{ textAlign: `center` }}>
                <h1 className="content-title">Zut de zut :(</h1>
                <section className="content-body">
                    <b>
                        Je n&apos;ai pas encore dessiné cette page !
                    </b>
                    <p>
                        C'est un bon moment pour retourner <Link to="/">à l&apos;accueil.</Link>
                    </p>
                </section>
            </article>
        </div>
    </Layout>
)

export default NotFoundPage
