

//Firestore Data 
//TODO - put into env file 




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

