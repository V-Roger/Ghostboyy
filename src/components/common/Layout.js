import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import { StickyContainer, Sticky } from 'react-sticky'
import SimpleReactLightbox from "simple-react-lightbox"

import { Navigation } from '.'

// Styles
import '../../styles/app.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node
    const instagramUrl = `https://www.instagram.com/samboyy_/`
    // const instagramUrl = site.instagram ? `https://instagram.com/${site.instagram.replace(/^@/, ``)}` : null
    const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null
    const [navActive, setNavActive] = useState(false)
    const today = new Date()

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <link rel="stylesheet" href="https://use.typekit.net/iws1vka.css"></link>
                <body className={bodyClass} />
            </Helmet>
            
            <SimpleReactLightbox>
                <StickyContainer>
                    <div className="viewport">
                        <div className="viewport-top">

                            {/* The main header section on top of the screen */}
                            <header className="site-head" style={{ ...site.cover_image && { backgroundImage: `url(${site.cover_image})` } }}>
                                <div className="site-mast">
                                    <div className="site-mast-left">
                                        <Link to="/">
                                            {/* {site.logo ?
                                                    <img className="site-logo" src={site.logo} alt={site.title} />
                                                    : <Img fixed={data.file.childImageSharp.fixed} alt={site.title} />
                                                } */}
                                            <h1 className="site-banner-title">{site.title}</h1>
                                        </Link>
                                    </div>
                                    <div className="site-mast-right">
                                        { instagramUrl && <a href={ instagramUrl } className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/instagram.svg" alt="Instagram" /></a>}
                                        { site.facebook && <a href={ facebookUrl } className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/facebook.svg" alt="Facebook" /></a>}
                                        <nav className="site-mobile-nav">
                                            <button htmlFor="menu" className={`site-mobile-nav__toggle ${navActive ? `active` : ``} `} onClick={() => setNavActive(!navActive)}>
                                                <img className="site-nav-icon menu" src="/images/icons/menu.svg" alt="Menu"/>
                                                <img className="site-nav-icon cancel" src="/images/icons/cancel.svg" alt="Menu"/>
                                            </button>
                                            <Navigation data={site.navigation} navClass="site-nav-button" />
                                        </nav>
                                    </div>
                                </div>
                                { isHome ?
                                    <div className="site-banner">
                                        {/* <p className="site-banner-desc">{site.description}</p> */}
                                    </div> :
                                    null}
                                <Sticky topOffset={600}>
                                    {({ style }) => (
                                        <nav className="site-nav" style={style}>
                                            <div className="site-nav-left">
                                                <Navigation data={site.navigation} navClass="site-nav-button" />
                                            </div>
                                        </nav>
                                    )}
                                </Sticky>
                            </header>

                            <main className="site-main">
                                {/* All the main content gets inserted here, index.js, post.js */}
                                {children}
                            </main>

                        </div>

                        <div className="viewport-bottom">
                            {/* The footer at the very bottom of the screen */}
                            <footer className="site-foot">
                                <div className="site-foot-nav container">
                                    <div className="site-foot-nav-left">
                                    &mdash; <Link to="/">{site.title}</Link> © {today.getUTCFullYear()} &mdash;
                                    </div>
                                    <div className="site-foot-nav-right">
                                        <Navigation data={site.navigation} navClass="site-foot-nav-item" />
                                    </div>
                                </div>
                            </footer>

                        </div>
                    </div>
                </StickyContainer>
            </SimpleReactLightbox>
        </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: {eq: "ghost-icon.png"}) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
)

export default DefaultLayoutSettingsQuery
