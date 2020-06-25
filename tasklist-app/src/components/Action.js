import React from 'react';
import PropTypes from 'prop-types';

const Action = ({ children }) => {
    return (
        <div>
            <div className="action">
                <div>{children}</div>
            </div>
        </div>
    );
};

Action.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Action;