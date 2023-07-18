import React, { useContext } from 'react';
import PropTypes from 'prop-types';

const Context = React.createContext();

export const CustomContext = ({ children,jwt, webId, folders, mainUrl }) => {
    const [loading, setLoading] = React.useState(false);

    const mainLoadH = (cond, infinite) => {
        setLoading(cond);
        if (infinite === true || cond === false) return
        setTimeout(() => {
            setLoading(false)
        }, 5000)
    }

    return (
        <Context.Provider value={{ useLoading: mainLoadH, jwt, loading, webId, folders, mainUrl }} >
            {children}
        </Context.Provider>
    );
};

export default Context

CustomContext.propTypes = {
    children: PropTypes.any,
};

export const useLoad = () => {
    return useContext(Context);
};