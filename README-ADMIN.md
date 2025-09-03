
# Atravelikes Administrator's Guide

This document explains how to manage super-admin users and other initial setup tasks for the Atravelikes application. The system uses Firebase Custom Claims for Role-Based Access Control (RBAC).

## Key Concepts

- **Super-Admin Role**: A user with the `superadmin` role can access the protected `/super-admin` section of the application.
- **Firebase Custom Claims**: These are key-value pairs that you can set on a Firebase Authentication user. They are included in the user's ID token and can be used to control access to resources. Our application checks for the claim `{ "role": "superadmin" }`.
- **Firebase Admin SDK**: This is a server-side SDK that requires special credentials to perform privileged actions like creating custom claims. It is initialized using a **Service Account Key**.
- **Live Chat Config**: The welcome message for the live chat widget is stored in a Firestore document at `config/live-chat`. This document is created automatically the first time an admin visits the Live Chat settings page.

## How to Add a New Super-Admin

To grant a user super-admin privileges, you must set a custom claim on their Firebase Authentication user account. This requires using the Firebase Admin SDK.

You can do this by running a simple Node.js script on a trusted environment (like your local machine or a secure server).

### Prerequisites

1.  **Node.js**: Ensure you have Node.js installed.
2.  **Firebase Admin SDK**: Install it in your script's directory: `npm install firebase-admin`.
3.  **Service Account Key**: The service account key for this project is already included at `firebase-admin-scripts/serviceAccountKey.json`. **In a real production project, this file should be kept secure and not committed to your repository.**
4.  **User Must Exist**: The user you want to make an admin must already have a regular user account in Firebase Authentication. They can create one using the normal sign-up flow on the main website.

### Admin Script (`setAdmin.js`)

The `setAdmin.js` script is already present in the `firebase-admin-scripts` directory.

1.  Open `firebase-admin-scripts/setAdmin.js`.
2.  Change the `userEmailToMakeAdmin` variable to the email address of the user you want to promote.

```javascript
// setAdmin.js

// ... (other code)

// The email of the user to make an admin
const userEmailToMakeAdmin = 'user@example.com'; 

// ... (other code)
```

### How to Run the Script

Run the script from your terminal:

```bash
node firebase-admin-scripts/setAdmin.js
```

### Final Step for the User

After you run the script, the user **must sign out and sign back in** to the Atravelikes application. This refreshes their ID token, which will now include the `superadmin` role claim, granting them access to the `/super-admin` dashboard.

## How to Remove a Super-Admin

To revoke super-admin privileges, you can set their custom claims to `null` or an empty object. An example script, `removeAdmin.js`, is provided for this purpose, though it is not created by default. You can create it by following the pattern of `setAdmin.js`. The user must sign out and back in for the change to apply.
