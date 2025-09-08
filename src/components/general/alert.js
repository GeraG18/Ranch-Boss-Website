import { useEffect } from "react";

const Alert = ({
  message = "",
  severity = "info",
  timeout = 0,
  handleDismiss = null,
}) => {
    
    const iconDictionary = {
        info: "info",
        success: "check_circle",
        warning: "warning",
        error: "error",
    };
    
    useEffect(() => {
        if (timeout > 0 && handleDismiss) {
            const timer = setTimeout(() => {
                handleDismiss();
            }, timeout * 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        message?.length && (
        <div style={{color: severity === "info" ? "rgb(3 105 161)" : (severity === "success" ? "rgb(101 163 13)" : (severity === "warning" ? "rgb(202 138 4)" : "rgb(239 68 68)") )}}
            className="bg-white border border-[#b8b8b8] font-['Montserrat'] rounded-[8px] py-3 px-4 mb-4 shadow-lg pointer-events-auto" role="alert">
            <div className="flex flex-row items-center justify-center gap-2">
                <div className="py-2 flex flex-row items-center justify-center">
                    <div style={{boxShadow: `0px 0px 8px 0px ${severity === "info" ? "rgba(3,105,161,0.75)" : (severity === "success" ? "rgba(101,163,13,0.75)" : 
                        (severity === "warning" ? "rgba(202,138,4,0.75)" : "rgba(239,68,68,0.75)") )}`}}
                        className="rounded-full bg-white flex items-center justify-center w-10 aspect-square mr-1">
                        <span className="material-symbols-outlined notranslate  text-[1.5rem]">
                            {
                                iconDictionary[severity]
                            }
                        </span>
                    </div>
                </div>
                <div>
                    <p className="font-bold m-0">{severity.toUpperCase()}</p>
                    <p className="text-base leading-4">{message}</p>
                </div>
                <div className="ml-auto">
                    {/* {handleDismiss && (
                    <button className={css(styles.fontBold, styles.textSmall, styles.button)} type="button"
                        onClick={(e) => { e.preventDefault(); handleDismiss(); }}>
                        <span className="material-symbols-outlined notranslate " >
                            close
                        </span>
                    </button>
                    )} */}
                </div>
            </div>
        </div>
        )
    );
}

const AlertsWrapper = ({ children, isSticky }) => {

    //#region view
    return (
        <div style={{top: isSticky ? '6.5rem' : '9rem',}} className="fixed right-0 p-1 z-400 pointer-events-none max-w-[24rem] min-w-fit w-full">
        {children}
        </div>
    )
}

export { Alert, AlertsWrapper };