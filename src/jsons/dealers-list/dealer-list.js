/* Dealers List to use */
// @ts-ignore
import DealersListAgo from "@/jsons/dealers-list/dealers-list-ago2025.json";

/*------------------------------------------------------------------------------*/
/*
    This file is going to load the dealers list to add the dynamic fields
    like the user numeration on the list.
*/
/*------------------------------------------------------------------------------*/
export const DealersList = DealersListAgo.map((item, index) => ({...item, id: index + 1}));