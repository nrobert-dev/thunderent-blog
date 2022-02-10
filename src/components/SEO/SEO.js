import React from "react"
import {Helmet} from "react-helmet"
import PropTypes from 'prop-types';

export const SEO = ({title, description, type, image, url }) => {
    return(
        <Helmet title = {title}
                htmlAttributes={{ lang: "en" }}
                meta={[
                    {
                        name: `description`,
                        content: description,
                    },
                    {
                        property: "og:url",
                        content: url
                    },
                    {
                        property: "og:type",
                        content: type
                    },
                    {
                        property: "og:title",
                        content: title
                    },
                    {
                        property: "og:description",
                        content: description
                    },
                    {
                        property: "og:image",
                        content: image
                    },
                    {
                        property: "twitter:card",
                        content: image
                    },
                    {
                        property: "twitter:creator",
                        content: 'Robert NC'
                    },
                    {
                        property: "twitter:title",
                        content: title
                    },
                    {
                        property: "twitter:description",
                        content: description
                    },
                    {
                        property: "twitter:image",
                        content: image
                    }
                ]}
        />
    )
};

SEO.propTypes = {
    description : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    type : PropTypes.string ,
    image : PropTypes.string,
    url : PropTypes.string
};

SEO.defaultProps = {
    title : 'Master of Some - Blog',
    description : 'Software and technology blog written by Robert Nechitelea, software develop and front end enthusiast. Come check it out!'
};

