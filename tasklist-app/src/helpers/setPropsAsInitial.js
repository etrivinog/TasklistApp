
/**
 * Higher order component to set the form´s initial values from props
 */
import React from 'react';
import { Component } from 'react';

export const setPropsAsInitial = WrappedComponent => (
    class extends Component {
        render() {
            return <WrappedComponent {...this.props}
                        initialValues={this.props}
                        /*enableReinitialize*/ />
        }
    }
);