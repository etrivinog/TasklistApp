import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppTemplate from '../components/AppTemplate'
import { Link } from 'react-router-dom';

/**
 * This component shows two options to the user.
 * When the user choose an option, the url changes and another component is shown.
 */
class HomeContainer extends Component {
    render() {
        return (
            <div>
                <AppTemplate
                    header={"Welcome to tasklist-app"}
                    body={
                        <div>
                            <div>
                                <Link to='tasklist' >Manage tasklists</Link>
                            </div>
                            <div>
                                <Link to='user' >Manage users</Link>
                            </div>
                        </div>
                    }
                    >
                </AppTemplate>
            </div>
        );
    }
}

HomeContainer.propTypes = {

};

export default HomeContainer;