'use client' // Renders on client side
import { createContext, useContext, useEffect, useState } from "react";
import { Alert, AlertsWrapper } from "../components/general/alert";

const AlertsContext = createContext();

const AlertsProvider = ({ children }) => {
  
    const [alerts, setAlerts] = useState([]);
    const [isNavSticky, setIsNavSticky] = useState(false);
    const [reachesBottom, seReachesBottom] = useState(false);
    const [scrollPos, setScrollPos] = useState(0);

    // 

    useEffect(() => {
        window.onscroll = () => {
            const body = document.body;
            const html = document.documentElement;
            const height = Math.max( body.scrollHeight, body.offsetHeight, 
                html.clientHeight, html.scrollHeight, html.offsetHeight );
            
            setIsNavSticky(window.scrollY > (16 * 5))
            setScrollPos(window.scrollY);
            seReachesBottom(window.scrollY === (html.scrollHeight - html.clientHeight))
        }
    }, [])
    
    const addAlert = (message="", severity = "info" | "success" | "warning" | "error", timeout=5, handleDismiss=null) => {
        const id = Math.random().toString(36).slice(2, 9) + new Date().getTime().toString(36);
        setAlerts((prev) => [{ message, severity, timeout, handleDismiss, id: id }, ...prev]);
        return id;
    }

    const dismissAlert = (id) => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }

    return (
        <AlertsContext.Provider value={{ alerts, addAlert, dismissAlert, isNavSticky, scrollPos, reachesBottom }}>
            <AlertsWrapper isSticky={isNavSticky}>
                {
                alerts.map((alert) => (
                    <Alert key={alert.id} {...alert} handleDismiss={() => { dismissAlert(alert.id) }} />
                ))
                }
            </AlertsWrapper>
            {children}
        </AlertsContext.Provider>
    );
};

export default AlertsProvider;

export const useAlertsProvider = () => useContext(AlertsContext);