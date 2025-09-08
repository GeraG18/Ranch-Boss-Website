'use client' // Renders on client side
import { act, createContext, useContext, useEffect, useState } from "react";
import moment from "moment";
import DialogContainer from "@/components/campaign-manager/dialog-container";
import { useLocale } from "next-intl";
import StartCampaign from "@/components/campaign-manager/MKT-CAMPAINS/may_campain/start_campain";
import MayCampaign from "@/components/campaign-manager/MKT-CAMPAINS/may_campain/may_campaign";
import { usePathname, useRouter } from "next/navigation";
// Creates the campaign context
const CampaignContext = createContext();

const CampaignProvider = ({ children }) => {

    const router = useRouter();
    const pathname = usePathname();
    // List of campaigns
    const campaignsList = [
        {
            id: 1,
            country: ["US", "CA"],
            lang:"en",
            startDate: "2025-05-13T07:00:00Z",
            endDate: "2025-05-15T06:58:00Z",
            crossColor: "text-white",
            title: "Something photogenic is coming...",
            content: <StartCampaign />,
        },
        {
            id: 2,
            country: ["US", "CA"],
            lang:"en",
            startDate: "2025-05-15T07:00:00Z",
            endDate: "2025-06-06T05:00:00Z",
            crossColor: "text-white",
            title: "Photogenic Campaign",
            content: <MayCampaign onItemClick={() => {
                console.log('click');
                setActiveCampaign((prev) => ({...prev, active: false}))
                router.push('/blog/details/horizon-photo-contest');
            }}/>,
        },
    ];
    //Get the locale
    const locale = useLocale();
    // Create a variable with actual time in UTC format
    const [time, setTime] = useState(moment().utc());
    // Create a variable with the campaigns list
    const [campaigns, setCampaigns] = useState([...campaignsList]);
    // Create a variable for the active campaign
    const [activeCampaign, setActiveCampaign] = useState();

    useEffect(() => {
        if(pathname.includes('/blog') && activeCampaign) {
            let newList = [...campaigns];
            newList.find((campaign) => campaign.id === activeCampaign.id).active = false;
            setCampaigns(newList);
        }
    }, [pathname])
    
    useEffect(() => {
        (async () => {
            try {
                const ipRequest = await fetch('/api/location');
                if (!ipRequest.ok) return;
                const data = (await ipRequest.json()).ip;
                const data_alt = ipRequest.headers.get('x-user-ip');
                const ip = (data || data_alt).split(',')[0]; // Get the first IP if there are multiple, separated by a comma
                // console.log('User Public IP:', ip);
                const request2 = await fetch(`/api/specific-location?ip=${ip}`);
                // console.log('ejecuta 2nda');
                if (!request2.ok) return;
                const res = await request2.json();
                const country = res.country || 'Unknown';
                console.log('Country Code:', country);
                // Reset active campaign on every page refresh
                setActiveCampaign();
                // Update the time on every page refresh
                setTime(moment().utc());
                // Map the campaigns list to add the active property checking the date and the locale
                let mappedList = campaignsList.map((campaign) => {
                    // Campaign language condition (* = all languages)
                    const langCondition = campaign.country === '*'? true : campaign.country.includes(country);
                    // Time start condition
                    const timeStartCondition = time.valueOf() >= moment.utc(campaign.startDate).valueOf(); 
                    // Time end condition
                    const timeEndCondition = time.valueOf() <= moment.utc(campaign.endDate).valueOf();
                    // Route condition
                    const routeCondition = !pathname.includes('/blog');
                    // Add active property to the campaign object
                    return ({
                        ...campaign,
                        active: (langCondition && timeStartCondition && timeEndCondition && routeCondition)
                    })
                });
                // Gets the first active campaign
                let active = mappedList.filter((campaign) => campaign.active);
                // If there is an active campaign, set the activeCampaign variable to it, else keep it as undefined 
                if(active.length > 0) setActiveCampaign(active[0]);
                // Set the mapped list to the campaigns variable
                setCampaigns(mappedList);
            } catch (error) {
                console.log('err', error);
            }
        })();
    }, [locale]);

    return (
        <CampaignContext.Provider value={{activeCampaign}}>
            {   // Map the campaigns list to render
                campaigns.map(({startDate, endDate, crossColor, content, title, active, id}, index) => (
                    // Render the dialog container for each active campaign
                    <DialogContainer 
                        title={title || "info"}
                        key={startDate}
                        showModal={active}
                        crossColor={crossColor}
                        closeModal={(val) => {
                            let newList = [...campaigns];
                            newList.find((campaign) => campaign.id === id).active = false;
                            setCampaigns(newList);
                        }}
                    >
                        {content}
                    </DialogContainer>
                ))
            }
            {children}
        </CampaignContext.Provider>
    );
};
// Default export
export default CampaignProvider;
// Creates a hook to use the context
export const useCampaignContext = () => useContext(CampaignContext);