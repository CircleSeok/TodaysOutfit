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
import {
  getFirestore,
  collection,
  getDocs,
  query,
  doc,
  addDoc,
} from 'firebase/firestore';
import { ClothesItem } from '../pages/ClothesList';
import { LeisureItem } from '../pages/Leisure';
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
export const auth = getAuth(app);
export const db = getFirestore(app);

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

//구글 로그인

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

//db 가져오기

export async function fetchClothesData(): Promise<ClothesItem[]> {
  const clothesCollection = collection(db, 'clothes');
  const clothesQuery = query(clothesCollection);
  const querySnapshot = await getDocs(clothesQuery);

  const clothesData: ClothesItem[] = [];
  querySnapshot.forEach((doc) => {
    clothesData.push(doc.data() as ClothesItem);
  });

  return clothesData;
}

export async function fetchLeisureData(): Promise<LeisureItem[]> {
  const LeisureCollection = collection(db, 'leisure');
  const leisureQuery = query(LeisureCollection);
  const querySnapshot = await getDocs(leisureQuery);

  const leisureData: LeisureItem[] = [];
  querySnapshot.forEach((doc) => {
    leisureData.push(doc.data() as LeisureItem);
  });

  return leisureData;
}
