import MayCampaign from "./MKT-CAMPAINS/may_campain/may_campaign"
import StartCampaign from "./MKT-CAMPAINS/may_campain/start_campain";

const campaignsList = [
    {
        country: ["US", "CA"],
        lang:"en",
        startDate: "2025-05-13T07:00:00Z",
        endDate: "2025-05-15T06:58:00Z",
        crossColor: "text-white",
        title: "Something photogenic is coming...",
        content: <StartCampaign />,
    },
    {
        country: ["US", "CA"],
        lang:"en",
        startDate: "2025-05-15T07:00:00Z",
        endDate: "2025-06-06T05:00:00Z",
        crossColor: "text-white",
        title: "Photogenic Campaign",
        content: <MayCampaign />,
    },
];

export default campaignsList;