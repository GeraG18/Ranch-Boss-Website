'use client'
import { useEffect, useState } from 'react';

/**
 * Hook to detect device information including OS, browser, device type, and platform.
 * @returns {Object} Device information including os, userAgent, platform, browser, isMobile, and deviceType.
 */
export const useOSDetector = () => {
    const [deviceInfo, setDeviceInfo] = useState({
        os: 'unknown',
        userAgent: '',
        platform: '',
        browser: 'unknown',
        isMobile: false,
        deviceType: 'unknown',
        deviceMediaQuery: false,
    });

    useEffect(() => {
        // Only run on client-side
        if (typeof window === 'undefined') return;

        const userAgent = window.navigator.userAgent;
        const platform = window.navigator.platform;
        /* IPADS MODERNOS (iPadOS 13+) */
        const isMacUserAgent = /(Macintosh)/i.test(userAgent);
        const hasTouch = 'ontouchend' in document || navigator.maxTouchPoints > 0;
        const isModernIpad = isMacUserAgent && hasTouch;
        /* IPHONES E IPADS ANTIGUOS */
        const isiPadClassic = /(iPad)/i.test(userAgent); // iPad antes de iPadOS 13 o si el UA es forzado a móvil
        const isiPhone = /(iPhone)/i.test(userAgent);
        const isiPod = /(iPod)/i.test(userAgent);

        console.log('isModernIpad', isModernIpad);
        
        // Detect OS
        let os = 'unknown';
        if (userAgent.includes('Win')) os = 'Windows';
        else if ((userAgent.includes('Mac') || isMacUserAgent) && !hasTouch) os = 'macOS';
        else if (userAgent.includes('Linux')) os = 'Linux';
        else if (userAgent.includes('Android')) os = 'Android';
        else if (
            userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad') ||
            isModernIpad || isiPadClassic || isiPhone || isiPod
        ) os = 'iOS';

        // Detect browser
        let browser = 'unknown';
        if (userAgent.includes('Firefox')) browser = 'Firefox';
        else if (userAgent.includes('Chrome')) browser = 'Chrome';
        else if (userAgent.includes('Safari')) browser = 'Safari';
        else if (userAgent.includes('Edge')) browser = 'Edge';
        else if (userAgent.includes('Opera')) browser = 'Opera';

        // Detect if mobile
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

        // Detect device type
        let deviceType = 'desktop';
        if (isMobile) {
            deviceType = /tablet|ipad|playbook|silk/i.test(userAgent) ? 'tablet' : 'mobile';
        }

        const mediaQuery = window.matchMedia("(max-width: 1024px)");
        let deviceMediaQuery = mediaQuery.matches;

        const onMediaChange = (event) => {
            deviceMediaQuery = event.matches;
        }

        mediaQuery.addEventListener("change", onMediaChange);

        
        setDeviceInfo({
            os,
            userAgent,
            platform,
            browser,
            isMobile,
            deviceType,
            deviceMediaQuery
        });

        return () => {
            // componentwillunmount
            mediaQuery.removeEventListener("change",onMediaChange)
        }
    }, []); // Empty dependency array as we only need to run this once

    return deviceInfo;
};