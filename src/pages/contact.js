import React from 'react'
import { Layout } from '../components/common'

const ContactPage = () => (
    <Layout>
        <div className="container">
            <article className="content">
                <h1 className="content-title">Contact</h1>
                <section className="content-body">
                    <p>Coucou</p>
                    <form name="contact" netlify netlify-honeypot="bot-field" hidden>
                        <input type="text" name="name" />
                        <input type="email" name="email" />
                        <textarea name="message"></textarea>
                    </form>
                    <form name="contact" method="post">
                        <input type="hidden" name="form-name" value="contact" />
                        <p>
                            <label>Your Name: <input type="text" name="name"/></label>
                        </p>
                        <p>
                            <label>Your Email: <input type="email" name="email"/></label>
                        </p>
                        <p>
                            <label>Message: <textarea name="message"></textarea></label>
                        </p>
                        <p>
                            <button type="submit">Send</button>
                        </p>
                    </form>
                </section>
            </article>
        </div>
    </Layout>
)

export default ContactPage
