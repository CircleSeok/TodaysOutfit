import { initializeApp } from 'firebase/app';
import errorImg from '../assets/error-img.png';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  signOut,
  GoogleAuthProvider,
  updateProfile,
  signInWithRedirect,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import { ClothesItem } from '../types/ClothesItem';
import { LeisureItem } from '../types/LeisureItem';
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
  password: string,
  nickname: string
): Promise<UserCredential> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // 회원가입 시 유저 정보에 닉네임 추가
    if (user) {
      await updateProfile(user, {
        displayName: nickname,
      });
    }

    return userCredential;
  } catch (error) {
    console.error('회원가입 중 에러 발생:', error);
    throw error;
  }
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

export async function signInWithGoogle(): Promise<void> {
  try {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error('Google 로그인 중 에러 발생:', error);
    throw error;
  }
}

//db 가져오기

export async function fetchClothesData(
  weatherCategories: string[]
): Promise<ClothesItem[]> {
  const clothesCollection = collection(db, 'clothes');
  const clothesQuery = query(
    clothesCollection,
    where('category', 'in', weatherCategories)
  );
  const querySnapshot = await getDocs(clothesQuery);

  const clothesData: ClothesItem[] = [];
  querySnapshot.forEach((doc) => {
    clothesData.push(doc.data() as ClothesItem);
  });

  return clothesData;
}

//clothe db

export async function AllClothesData(): Promise<ClothesItem[]> {
  const clothesCollection = collection(db, 'clothes');
  const querySnapshot = await getDocs(clothesCollection);

  const clothesData: ClothesItem[] = [];
  querySnapshot.forEach((doc) => {
    clothesData.push(doc.data() as ClothesItem);
  });

  return clothesData;
}

export async function fetchLeisureData(
  leisureCategories: string[]
): Promise<LeisureItem[]> {
  const LeisureCollection = collection(db, 'leisure');
  const leisureQuery = query(
    LeisureCollection,
    where('category', 'in', leisureCategories)
  );
  const querySnapshot = await getDocs(leisureQuery);

  const leisureData: LeisureItem[] = [];
  querySnapshot.forEach((doc) => {
    leisureData.push(doc.data() as LeisureItem);
  });

  return leisureData;
}

///leisureDB
export async function AllLeisureData(): Promise<LeisureItem[]> {
  const LeisureCollection = collection(db, 'leisure');
  const querySnapshot = await getDocs(LeisureCollection);

  const leisureData: ClothesItem[] = [];
  querySnapshot.forEach((doc) => {
    leisureData.push(doc.data() as ClothesItem);
  });

  return leisureData;
}

//comments

//배경이미지
export async function getWeatherImageFromFirestore(
  temp: number,
  rain: number | undefined,
  snow: number | undefined
): Promise<string | null> {
  const db = getFirestore();

  const q = query(collection(db, 'weatherBackgrounds'));

  try {
    const querySnapshot = await getDocs(q);

    for (const doc of querySnapshot.docs) {
      const data = doc.data();

      if (rain && data.name === 'rain') {
        return data.imageURL;
      } else if (snow && data.name === 'snow') {
        return data.imageURL;
      } else if (temp >= 24 && data.name === 'hot') {
        return data.imageURL;
      } else if (temp >= 17 && temp < 24 && data.name === 'warm') {
        return data.imageURL;
      } else if (temp >= 12 && temp < 17 && data.name === 'fall') {
        return data.imageURL;
      } else if (temp < 12 && data.name === 'cold') {
        return data.imageURL;
      }
    }
    return null;
  } catch (error) {
    console.error('Firestore에서 날씨 배경을 불러오는 중 오류 발생:', error);
    return errorImg;
  }
}
