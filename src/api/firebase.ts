import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  onAuthStateChanged,
  User,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { getDatabase, ref, set, get, DataSnapshot } from 'firebase/database';
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
const database = getDatabase(app);

//회원가입
export async function createUser(
  email: string,
  password: string
): Promise<UserCredential> {
  return await createUserWithEmailAndPassword(auth, email, password);
}
// 로그인
export async function signIn(
  email: string,
  password: string
): Promise<UserCredential> {
  return await signInWithEmailAndPassword(auth, email, password);
}

// 로그아웃

export async function signOutUser() {
  try {
    await signOut(auth);
    console.log('로그아웃 되었습니다.');
  } catch (error) {
    console.error('로그아웃 중 에러 발생:', error);
  }
}

export async function signInWithGoogle(): Promise<UserCredential> {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    console.error('Google 로그인 중 에러 발생:', error);
    throw error;
  }
}

// Firebase 데이터베이스에서 데이터 쓰기
export async function writeToDatabase(
  dataPath: string,
  data: any
): Promise<void> {
  const dataRef = ref(database, dataPath);

  try {
    await set(dataRef, data);
    console.log('데이터가 Firebase 데이터베이스에 성공적으로 쓰였습니다.');
  } catch (error) {
    console.error('데이터 쓰기 중 에러 발생:', error);
    throw error;
  }
}

// Firebase 데이터베이스에서 데이터 읽기
export async function readFromDatabase(
  dataPath: string
): Promise<string | null> {
  const dataRef = ref(database, dataPath);

  try {
    const snapshot: DataSnapshot = await get(dataRef);
    if (snapshot.exists()) {
      return snapshot.val() as string;
    } else {
      return null;
    }
  } catch (error) {
    console.error('데이터 읽기 중 에러 발생:', error);
    throw error;
  }
}
