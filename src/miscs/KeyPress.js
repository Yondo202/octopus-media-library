import React from 'react'
function KeyPress(targetKey, handleFunc, passValue) {
  
    const keyPress = React.useCallback(e => {
        if(!handleFunc) return
        
        if (e.key === targetKey) {
            if(passValue) return handleFunc(passValue)
            handleFunc(false)
        }
    }, []);
    
    React.useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress);
    }, [keyPress]);
}

export default KeyPress
