import React from 'react';
import {Route, Link} from 'react-router-dom';

export function InputChange(e) {
    const {name, value} = e.target;
    this.setState({[name]: value});
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