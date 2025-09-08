'use client'
import { Fragment, useEffect, useState } from "react";
import DialogContainer from "./dialog-container";
import moment from "moment";
import campaignsList from "./campaign-list";

const CampaginManager = ({children}) => {

    const [time, setTime] = useState(moment().utc());
    const [campaigns, setCampaigns] = useState([...campaignsList]);

    useEffect(() => {
        setTime(moment().utc());
        let c = campaigns.map((campain) => ({...campain, active: campain.active !== undefined ? campain.active : time.valueOf() >= moment.utc(campain.startDate).valueOf() && time.valueOf() <= moment.utc(campain.endDate).valueOf() }));
        // c.forEach(element => {
        //     console.log('start:', moment.utc(element.startDate).toString() );
        //    console.log('end:', moment.utc(element.endDate).toString() );
        //    console.log('now:', time.toString());
        // });
        setCampaigns(c);
    }, []);

    return (
        <section>
             {
                campaigns.map(({startDate, endDate, content, title, active}, index) => (
                    <DialogContainer 
                        title={title || "info"}
                        key={startDate}
                        showModal={active}
                        closeModal={(val) => {
                            setCampaigns((prev) => {
                                prev[index].active = false;
                                return [...prev];
                            })
                        }}
                    >
                        {content}
                    </DialogContainer>
                ))
            }
            {children}
        </section>
    )    
}

export default CampaginManager;