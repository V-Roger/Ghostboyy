import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

const Maintenance = ({ siteData }) => {
    const site = siteData.allGhostSettings.edges[0].node
    const instagramUrl = `https://www.instagram.com/samboyy_/`
    const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <link rel="stylesheet" href="https://use.typekit.net/iws1vka.css"></link>
                <body />
            </Helmet>

            <div className="viewport">
                <div className="viewport-top">
                    <main className="site-main maintenance">
                        <img src="/images/illustrations/undraw_work_in_progress_uhmv.svg" alt="En construction..." />
                        <h1>... site en construction ...</h1>
                        <div>
                            { instagramUrl && <a href={ instagramUrl } className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/instagram.svg" alt="Instagram" /></a>}
                            { site.facebook && <a href={ facebookUrl } className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/facebook.svg" alt="Facebook" /></a>}
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
Maintenance.propTypes = {
    siteData: PropTypes.shape({
        allGhostSettings: PropTypes.object.isRequired,
        site: PropTypes.any,
    }).isRequired,
}

export default Maintenance
