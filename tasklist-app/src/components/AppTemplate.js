import React from 'react';
import PropTypes from 'prop-types';
import AppHeader from './AppHeader';

const AppTemplate = ({header, body}) => {
    return (
        <div>
            <div className="app-frame">
                <AppHeader title={header}></AppHeader>
                <div>{body}</div>
            </div>
        </div>
    );
};

AppTemplate.propTypes = {
    header: PropTypes.string.isRequired,
    body: PropTypes.element.isRequired,
};

export default AppTemplate;