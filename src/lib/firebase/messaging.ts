
import { getMessaging, getToken } from "firebase/messaging";
import { app, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import type { User } from 'firebase/auth';

export const requestPermissionAndSaveToken = async (user: User) => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
        console.log("This browser does not support desktop notification");
        return;
    }

    try {
        const messaging = getMessaging(app);
        
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            // IMPORTANT: Replace with your actual VAPID key from Firebase Console > Project Settings > Cloud Messaging > Web configuration
            const fcmToken = await getToken(messaging, { vapidKey: 'BDS6B8K1Z5gX8QjX1eR4Y6j8Hw9h5vC3n7JkL0f9aB4s2d1gC6k7mO3pI2uN5r8tU9iP0oQ1wE7xZ' }); 
            
            if (fcmToken) {
                console.log('FCM Token:', fcmToken);
                // Save the token to Firestore
                const userDocRef = doc(db, 'users', user.uid);
                await setDoc(userDocRef, { fcmToken }, { merge: true });
            } else {
                console.log('No registration token available. Request permission to generate one.');
            }
        } else {
            console.log('Unable to get permission to notify.');
        }

    } catch (error) {
        console.error('An error occurred while retrieving token. ', error);
    }
}
