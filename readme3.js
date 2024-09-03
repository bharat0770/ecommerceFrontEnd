//! BACKEND 
// refer ecommerce_backend
//! FRONTEND 
// refer ecommerce_frontend

//! INTEGETION

//! firebase functions and all 
//! redux folder and all   
//* TUT
//*  authentication and Toaster
// go to Firebase and create a project take the api and other detais and paste it into firebase.js file
// export app = initializeApp(firebaseDetails); 
// expost auth = getAuth(app); //% this will allow us to use auhtentication in Login Page 
// create  a handler and give the following auth details
// const provider  = new googleAuthProvider(); 
//  await signInWithPopup(auth, provider); 
//% Toaster 
// Toaster display brief, temporary notifications of actions, errors, or other events in an application.
//% how login will work 
// set up an api route to hit the new user endpoint from backend and set it up in store
// in login page use signInWithPopUp(auth, provider) which returns user 
// hit the created api and pass the user object this will create the document in mongoDB and return a response 
// if("data" in res) 
//* Rtk query setup/userqueries
// login 
// signout
//% redux basic
// using redux we will centralize the data flow (as it will be from single store only )
// for that configure store in redux folder
// const store =  configureStore({
    //     reducers : 
    // })
    // wrap the app in provider and provide store as arg whihc will make the store available for each component of app 
//%  rtk basics 
// for rtk query we need 2 imp function (createApi, fetchBaseQuery)
// const userApi = createApi({
//     reducerName :   "",
//     baseQuery : fetchBaseQuery({baseUrl}), 
//     endpoints : (builder) => {
//     login : builder.mutation/query({
//         query : (objectBody) => ({
//             url : "new", 
//             method : "post", 
//             body : objectBody,
//           })
//       })
// })

// useEffect(() => {
//     onAuthStateChanged (auth, async(user) => {}); 
// }, []); 


//* protecting routes for logged in  user
//% check if user is logged in or not
// setup userEffect in app 
// use onAuthStateChanged(auth, (user)=>{}) which contains  a  callback function that contains the user if it  is logged in
// set up a userReducer to save the user if it exists/notExists (NOTE : getUser from database (AXIOS) as the auth user is in different format)    
// set up the loading page thing 
//% protecting routes from logged in users
// create a route that takes some props (authentication details) and wrap your other routes (that needs  to be authenticated) in this new route 
 //% how signOut works

//* rtk query for product
//? USER : 
//? latestproduct
//? categories 
//? search 
//? ADMIN : 
//? allProdust : NOTE : will do later
//? create product    
//? update product
//? delete product 

//* cart reducer
//% how cart functionality works? 
//% addToCart
//% removeFromCart
//% calculatePrice
// addtocartHandler, incrementHandler, decrementHandler, removeHandler
//* discounts and coupons
// axios get
// cancel  token    
//* rtk for order 
// allTransactions
// singleTranscation
// myOrders
//* stripe payment 4:46
// how does stripe payment works
//*allUsers
//*dashboard api 
//? remaining 
// skeleton-loading 
// admin routes 
// allProdust : NOTE : will do later
// create product : 2:26 - 2:40    

//? tasks
// admin management routes 
// invalidate  default rtk chache
// create product 
// update product 



//? my functionalities
//! how does the cart works