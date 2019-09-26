import React from 'react';
import {Route, Link} from 'react-router-dom';

export function InputChange(e) {
    const { status } = { ...this.state };
    const currentState = status;
    const { name, value } = e.target;
    currentState[name] = value;

    this.setState({ status: currentState });
}

export const CustomMenu = ({path, children}) => (
    <Route
        path={path}
        exact
        children={({match})=>{
            return (
                <Link className={match ? 'active' : ''} to={path}>{children}</Link>
            )
        }}
    />
);