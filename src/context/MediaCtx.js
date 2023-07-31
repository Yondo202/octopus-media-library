import React, { useContext } from 'react';

const Context = React.createContext();

export const CustomContext = ({ children, jwt, webId, mainUrl }) => {
    const [loading, setLoading] = React.useState(false);

    const mainLoadH = (cond, infinite) => {
        setLoading(cond);
        if (infinite === true || cond === false) return
        setTimeout(() => {
            setLoading(false)
        }, 5000)
    }

    return (
        <Context.Provider value={{ useLoading: mainLoadH, jwt, loading, webId, mainUrl }} >
            {children}
        </Context.Provider>
    );
};

export default Context

export const useLoad = () => {
    return useContext(Context);
};