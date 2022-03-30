import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
const PrivateRoute = ({component: Component, ...rest}) => {
    const state = useSelector(state => state.userReducer);
    return (
        <Route {...rest} render={props => (
            isLogin(state.user) ?
                <Component {...props} />
            : <Redirect to="/login"/>
        )} />
    );
};
const isLogin=(user)=>{
    if(user==null)
    {
        return false;
    }
    return true;
}
export default PrivateRoute;