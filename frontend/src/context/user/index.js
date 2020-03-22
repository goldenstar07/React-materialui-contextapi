import React, { useReducer, useState, useContext, useEffect } from 'react';
import Context, { initialState } from './context';
import reducer from './reducer';
import { 
    getUsers,
    getUser,
    createUser,
    updateProfile,
    login,
    isLoggedIn,
    isAdmin,
    resetStore,
    sendEnquiery,
    signOut,
} from './actions';

const UserContextProvider = ({
    children,
    initialContext = initialState,
}) => {
    const [state, dispatch] = useReducer(reducer, initialContext);

    useEffect(() => {
        const userData = localStorage.getItem("appUser", state);
        if(state.updatedAt) {
            localStorage.setItem("appUser", JSON.stringify(state));
        } else if(userData) {
            resetStore(dispatch)(JSON.parse(userData));
        }
    }, [state.updatedAt]);
    return (
        <Context.Provider
            value={{
                data: state,
                methods: {
                    getUsers: getUsers(dispatch),
                    getUser: getUser(dispatch),
                    createUser: createUser(dispatch),
                    login: login(dispatch),
                    isLoggedIn: isLoggedIn(state),
                    isAdmin: isAdmin(state),
                    signOut: signOut(dispatch),
                    sendEnquiery: sendEnquiery(dispatch),
                    updateProfile: updateProfile(dispatch),
                },
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useUser = () => useContext(Context);

export default UserContextProvider;