# Atravelikes Administrator's Guide

This document explains how to manage super-admin users in the Atravelikes application. The system uses Firebase Custom Claims for Role-Based Access Control (RBAC).

## Key Concepts

- **Super-Admin Role**: A user with the `superadmin` role can access the protected `/super-admin` section of the application.
- **Firebase Custom Claims**: These are key-value pairs that you can set on a Firebase Authentication user. They are included in the user's ID token and can be used to control access to resources. Our application checks for the claim `{ "role": "superadmin" }`.
- **Firebase Admin SDK**: This is a server-side SDK that requires special credentials to perform privileged actions like creating custom claims. It is initialized using a **Service Account Key**.

## How to Add a New Super-Admin

To grant a user super-admin privileges, you must set a custom claim on their Firebase Authentication user account. This requires using the Firebase Admin SDK.

You can do this by running a simple Node.js script on a trusted environment (like your local machine or a secure server).

### Prerequisites

1.  **Node.js**: Ensure you have Node.js installed.
2.  **Firebase Admin SDK**: Install it in your script's directory: `npm install firebase-admin`.
3.  **Service Account Key**: This is the most important step.
    *   Go to your Firebase Project settings > `Service accounts`.
    *   Click "Generate new private key". A JSON file will be downloaded.
    *   **Keep this file secure and do not commit it to your repository.**
4.  **Set Environment Variable**: The application's server code reads this key from an environment variable named `FIREBASE_SERVICE_ACCOUNT_KEY`. You must make the content of the downloaded JSON file available to the application through this variable.

### Admin Script (`setAdmin.js`)

Create a file named `setAdmin.js` and add the following code:

```javascript
// setAdmin.js
const admin = require('firebase-admin');

// --- IMPORTANT ---
// Replace with the path to your downloaded service account key
const serviceAccount = require('./path/to/your-service-account-key.json'); 
const userEmailToMakeAdmin = 'user@example.com'; // The email of the user to make an admin

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function setSuperAdminClaim(email) {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { role: 'superadmin' });
    console.log(`Successfully set 'superadmin' role for user: ${email} (UID: ${user.uid})`);
    
    // Instruct the user on the next step
    console.log('\nIMPORTANT: The user must sign out and sign back in for the changes to take effect.');

  } catch (error) {
    console.error('Error setting custom claim:', error.message);
  }
  process.exit();
}

setSuperAdminClaim(userEmailToMakeAdmin);

```

### How to Run the Script

1.  Update the `serviceAccount` path and `userEmailToMakeAdmin` variable in the script.
2.  Run the script from your terminal:

    ```bash
    node setAdmin.js
    ```

### Final Step for the User

After you run the script, the user **must sign out and sign back in** to the Atravelikes application. This refreshes their ID token, which will now include the `superadmin` role claim, granting them access to the `/super-admin` dashboard.

## How to Remove a Super-Admin

To revoke super-admin privileges, you can set their custom claims to `null` or an empty object.

Create a script `removeAdmin.js`:
```javascript
// removeAdmin.js
const admin = require('firebase-admin');

const serviceAccount = require('./path/to/your-service-account-key.json'); 
const userEmailToRemoveAdmin = 'user@example.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function removeSuperAdminClaim(email) {
    try {
        const user = await admin.auth().getUserByEmail(email);
        await admin.auth().setCustomUserClaims(user.uid, null); // Set to null to remove all claims
        console.log(`Successfully removed custom claims for user: ${email}`);
        console.log('\nUser must sign out and sign back in for changes to take effect.');
    } catch (error) {
        console.error('Error removing custom claim:', error.message);
    }
    process.exit();
}

removeSuperAdminClaim(userEmailToRemoveAdmin);
```

Run it with `node removeAdmin.js`. The user must sign out and back in for the change to apply.
