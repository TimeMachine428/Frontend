import React from "react";
import PropTypes from "prop-types";

import Footer from "../components/layout/Footer.jsx";
import Nav from "../components/layout/Nav.jsx";

export default class Layout extends React.Component {
  render() {
    const { location } = this.props;
    const containerStyle = {
      marginTop: "60px"
    };

    return (
      <div>

        <Nav location={location} />

        <div className="container" style={containerStyle}>
          <div className="row">
            <div className="col-lg-12">

              {this.props.children}

            </div>
          </div>
          <Footer location={location}/>
        </div>
      </div>

    );
  }
}

Layout.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
  children: PropTypes.node,
};

Layout.defaultProps = {
  location: {
    pathname: "",
  },
};
