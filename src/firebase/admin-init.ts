import admin from 'firebase-admin';

export function initializeAdminApp() {
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
      'Firebase service account key is not set in the environment variables. Please set FIREBASE_SERVICE_ACCOUNT_KEY.'
    );
  }

  return admin.initializeApp({
    credential: admin.credential.cert(cert),
    projectId: cert.project_id,
  });
}
