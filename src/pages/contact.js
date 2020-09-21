import React, { useState } from 'react'
import { Layout } from '../components/common'

const ContactPage = () => {
    const [name, setName] = useState(undefined)
    const [email, setEmail] = useState(undefined)
    const [message, setMessage] = useState(undefined)

    const handleInput = function (event, callback) {
        event.preventDefault()
        callback(event.target.value)
    }

    return (<Layout>
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
                                <input type="text" name="name" required onChange={e => handleInput(e, setName)} />
                            </label>
                            <label>Votre email
                                <input type="email" name="email" required onChange={e => handleInput(e, setEmail)} />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Votre message<textarea name="message" required onChange={e => handleInput(e, setMessage)}/></label>
                        </div>
                        <button disabled={(name && email && message) ? false : true } type="submit">Envoyer</button>
                    </form>
                </section>
            </article>
        </div>
    </Layout>)
}

export default ContactPage
