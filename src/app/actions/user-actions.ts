
'use server';

import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

function initializeAdminApp() {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const cert = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(
        Buffer.from(
          process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
          'base64'
        ).toString('utf-8')
      )
    : undefined;

  if (!cert) {
    throw new Error(
      'Firebase service account key is not set in the environment variables.'
    );
  }

  return admin.initializeApp({
    credential: admin.credential.cert(cert),
    projectId: cert.project_id,
  });
}


type CreateEmployeeInput = {
  name: string;
  email: string;
  password?: string;
};

export async function createEmployeeAction(data: CreateEmployeeInput) {
  try {
    initializeAdminApp();
    const auth = getAuth();
    const firestore = getFirestore();

    // Create user in Firebase Authentication
    const userRecord = await auth.createUser({
      email: data.email,
      password: data.password,
      displayName: data.name,
    });

    // Create user profile in Firestore
    const userProfile = {
      name: data.name,
      email: data.email,
      role: 'employee',
      avatarUrl: userRecord.photoURL || `https://avatar.vercel.sh/${userRecord.email}.png`,
      points: 0,
    };

    await firestore.collection('users').doc(userRecord.uid).set(userProfile);
    
    // Set custom claim for role-based access control
    await auth.setCustomUserClaims(userRecord.uid, { role: 'employee' });

    return { uid: userRecord.uid };
  } catch (error: any) {
    console.error('Error creating employee:', error);
    // Provide a more user-friendly error message
    let message = 'An unexpected error occurred.';
    if (error.code === 'auth/email-already-exists') {
      message = 'An account with this email address already exists.';
    } else if (error.code === 'auth/invalid-password') {
      message = 'The password must be at least 6 characters long.';
    }
    return { error: message };
  }
}
