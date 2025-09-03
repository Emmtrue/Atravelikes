
import * as admin from 'firebase-admin';

// Use the service account key from the dedicated file.
// This is a more robust method than relying on multiple environment variables.
import serviceAccountKey from '../../../firebase-admin-scripts/serviceAccountKey.json';

// Ensure the private key is formatted correctly.
const privateKey = (serviceAccountKey.private_key || '').replace(/\\n/g, '\n');

const serviceAccount = {
  ...serviceAccountKey,
  private_key: privateKey,
  project_id: serviceAccountKey.project_id
} as admin.ServiceAccount;


/**
 * Initializes and returns the Firebase Admin App instance.
 * It ensures that the app is initialized only once.
 */
export function getFirebaseAdminApp() {
    // If the app is already initialized, return it.
    if (admin.apps.length > 0 && admin.apps[0]) {
        return admin.apps[0];
    }
    
    // Otherwise, initialize a new app.
    try {
        const credential = admin.credential.cert(serviceAccount);
        return admin.initializeApp({
            credential,
        });
    } catch (error) {
        const errorMessage = (error as Error).message;
        if (errorMessage.includes("already exists")) {
             return admin.app();
        }
        console.error("Firebase Admin Initialization Error:", error);
        throw error;
    }
}
