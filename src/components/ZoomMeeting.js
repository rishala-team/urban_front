// src/components/ZoomMeeting.js
import React, { useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { ZoomMtg } from '@zoomus/websdk';

// Zoom credentials - Replace these with your values
const CLIENT_ID = '7MFoUsEiTb1hShatR1Nfw';
const CLIENT_SECRET = '5TqDkHwfXm61TgkPeRdKQISUayMQt1ZO';
const MEETING_NUMBER = '84413839146';
const PASSWORD = '5AEQD7';

const ZoomMeeting = () => {
    useEffect(() => {
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();

        async function initZoom() {
            const signature = generateSignature(CLIENT_ID, CLIENT_SECRET, MEETING_NUMBER, 0);

            ZoomMtg.init({
                leaveUrl: 'http://localhost:3000', // URL to redirect when meeting ends
                success: () => {
                    ZoomMtg.join({
                        signature: signature,
                        meetingNumber: MEETING_NUMBER,
                        userName: 'Patient/Doctor Name',
                        sdkKey: CLIENT_ID,
                        passWord: PASSWORD,
                        userEmail: 'user@example.com', // Optional
                        success: () => {
                            console.log('Zoom meeting joined successfully');
                        },
                        error: (error) => {
                            console.error('Error joining Zoom meeting', error);
                        },
                    });
                },
                error: (error) => {
                    console.error('Error initializing Zoom SDK', error);
                },
            });
        }

        initZoom();
    }, []);

    function generateSignature(apiKey, apiSecret, meetingNumber, role) {
        const timestamp = new Date().getTime() - 30000;
        const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64');
        const hash = CryptoJS.HmacSHA256(msg, apiSecret);
        const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64');
        return signature;
    }

    return <div id="zmmtg-root"></div>;
};

export default ZoomMeeting;