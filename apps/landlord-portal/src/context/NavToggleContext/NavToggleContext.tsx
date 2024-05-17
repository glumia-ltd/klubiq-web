import React, {useState, useCallback} from 'react';
type NavProps = {
    children :React.ReactNode
}

export const Context = React.createContext({
    toggleSidebar: () => {},
    openSidebar: () => {},
    closeSidebar: () => {},
    sidebarOpen: false
})

export const NavToggleProvider = (props:NavProps) => {

    const [sidebarOpen, setSidebarOpen] = useState(false)

    const closeSidebar = useCallback(() => setSidebarOpen(false), [])
    
    const openSidebar = useCallback(() => setSidebarOpen(true), [])

    const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), [])

    const value = {
        toggleSidebar,
        openSidebar,
        closeSidebar,
        sidebarOpen
    }

    return(
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    )
}

