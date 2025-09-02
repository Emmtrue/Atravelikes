
'use server';

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, writeBatch, getDocs, QuerySnapshot, DocumentData, doc } from 'firebase/firestore';
import { africanPlaces } from './places-data';

// IMPORTANT: This script is meant to be run from a Node.js environment.
// You can execute it using `npx ts-node-esm src/lib/firebase/seed.ts`
// Make sure you have `ts-node` installed (`npm install -g ts-node`)
// Also, ensure your Firebase client-side config is correct and your Firestore security rules allow writes from your client IP for seeding.

const firebaseConfig = {
  "projectId": "new-prototype-yvlyd",
  "appId": "1:625332412492:web:f45a7dc4a6052c189c14e9",
  "storageBucket": "new-prototype-yvlyd.firebasestorage.app",
  "apiKey": "AIzaSyBeYWjGEoJADzViWHegW9w0DUVJLOjNrGw",
  "authDomain": "new-prototype-yvlyd.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "625332412492"
};


const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedPlaces() {
  const placesCollection = collection(db, 'places');
  
  // Check if the collection is already populated to avoid duplicate writes.
  const snapshot: QuerySnapshot<DocumentData> = await getDocs(placesCollection);
  if (!snapshot.empty) {
    console.log('Firestore "places" collection already contains data. Seeding skipped.');
    return;
  }

  const batch = writeBatch(db);

  africanPlaces.forEach((place) => {
    // Generate a new document reference in the 'places' collection
    const docRef = doc(placesCollection); 
    // Add the original data plus a new field for case-insensitive search
    batch.set(docRef, { 
      name: place.name, 
      type: place.type,
      name_lowercase: place.name.toLowerCase() 
    });
  });

  try {
    await batch.commit();
    console.log(`Successfully seeded ${africanPlaces.length} places to Firestore.`);
  } catch (error) {
    console.error('Error seeding Firestore:', error);
  }
}

// This allows the script to be executed directly
(async () => {
    if (typeof require !== 'undefined' && require.main === module) {
        await seedPlaces();
        // The process needs to be explicitly terminated, otherwise it will hang
        // due to the active Firestore connection.
        process.exit();
    }
})();
