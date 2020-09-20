import React from 'react'
import { Layout } from '../components/common'

const ContactPage = () => (
    <Layout>
        <div className="container">
            <article className="content">
                <h1 className="content-title">Contact</h1>
                <section className="content-body">
                    <form action="/succes" name="contact" netlify netlify-honeypot="bot-field" hidden>
                        <input type="text" name="name" />
                        <input type="email" name="email" />
                        <textarea name="message"></textarea>
                    </form>
                    <form action="/succes" className="contact-form" name="contact" method="post">
                        <input type="hidden" name="form-name" value="contact" />
                        <div className="form-group">
                            <label>Votre nom
                                <input type="text" name="name"/>
                            </label>
                            <label>Votre email
                                <input type="email" name="email"/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Votre message<textarea name="message"></textarea></label>
                        </div>
                        <button type="submit">Envoyer</button>
                    </form>
                </section>
            </article>
        </div>
    </Layout>
)

export default ContactPage
