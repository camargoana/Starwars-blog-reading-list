import React from "react";
import propTypes from "prop-types";

export const Title = ({text}) => {
    return (
        <h1 className="display-6 fw-bold">{text}</h1>
    );
};

Title.prototype = {
    text: propTypes.string
};