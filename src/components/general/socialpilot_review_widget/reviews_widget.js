'use client'
import dynamic from "next/dynamic";
import { useEffect } from "react";
const SocialpilotReviewWidget = dynamic(() => import('./socialpilot_review_widget'), {
  ssr: false,
  loading: null // Remove the loading component to avoid interference
});

const ReviewsWidget = () => {

    useEffect(() => {
        console.log('initalize');
        
    }, [])

    return (
        <>
            <SocialpilotReviewWidget/>
        </>
    )
}

export default ReviewsWidget;