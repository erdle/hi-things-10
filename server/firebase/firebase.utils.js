import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection,
  doc, 
  query, 
  where, 
  getDocs, 
  getDoc,
  setDoc} from "firebase/firestore";

  //import "firebase/auth";
  //import "firebase/storage";

//used for creating new session 
import Shopify from '@shopify/shopify-api';
import { Session } from "@shopify/shopify-api/dist/auth/session";

//Firestore Data 
//TODO - put into env file 
let firebaseConfig = {
  apiKey: "AIzaSyBaaA3ppumdtOzHyQUwTh1OLRPRSEkkhm8",
  authDomain: "hi-things-shopify-app.firebaseapp.com",
  projectId: "hi-things-shopify-app",
  storageBucket: "hi-things-shopify-app.appspot.com",
  messagingSenderId: "218616689255",
  appId: "1:218616689255:web:3ada5de7d4116216ad1ac2",
  measurementId: "G-RKHPSJ8ZSH"
};
console.log('firebaseConfig ------------------------------')
console.log(firebaseConfig)

// init firebase app 
initializeApp(firebaseConfig);

// init firestore
//use db any time we need to get data from firestore
const db = getFirestore();


export const storeCallBack = async (session) => {
  console.log('running storecallback')

  try {
    let payload = {... session};

    //TODO - delete
    console.log('session', session); 
    console.log('payload', payload);

    await setDoc(doc(db, 'sessions',session.id), {
      id: session.id,
      payload: payload,
      shop: payload.shop,
    });
    // await db.collection("shops").doc(shop).set(shopData);
    return true;
  } catch (e) {
    throw new Error(e);
  }
};
const setSession = async (id) => {
  console.log('Old id===============================');
  console.log(id);
  
  //find shop in db 
  //TODO - find shop in Firestore db
  const ref = doc(db, 'sessions', id);
  const docSnap = await getDoc(ref);

  
  // grab that data 
  const shopData = docSnap.data();
// take that data and put it into a new session 
  console.log('shopData===============================', shopData);

  let session = new Session(shopData.id);
  console.log('new session:', session);
  const { shop, state, scope, accessToken, isOnline, expires, onlineAccessInfo } =  shopData.payload;

  session.shop = shop
  session.state = state
  session.scope = scope
  session.expires = expires ? new Date(expires) : undefined //initially undefined
  session.isOnline = isOnline //initially undefined
  session.accessToken = accessToken //initially undefined
  session.onlineAccessInfo = onlineAccessInfo //initially undefined

  console.log('New session ===============================')
  console.log(session)
  return session;
};

export const loadCallback = async (id) => {
  console.log('loadCallback ID===============================')
  console.log(id)
  try {
    console.log('loadCallback New session starting===============================')
    return await setSession(id);
  } catch (e) {
    throw new Error(e);
  }
};
export const deleteCallback = async (id) => {
  console.log('deleteCallback ID===============================')
  console.log(id)
  try {
    return true;
  } catch (e) {
    throw new Error(e);
  }
};

