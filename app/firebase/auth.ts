import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1gjbpJIsXHLI2io9PNf2RuHUXCoWnqK8",
  authDomain: "flash-cart-dddc5.firebaseapp.com",
  projectId: "flash-cart-dddc5",
  storageBucket: "flash-cart-dddc5.firebasestorage.app",
  messagingSenderId: "658151886598",
  appId: "1:658151886598:web:2b613b7a44a7a199e61887",
  measurementId: "G-181LJG3G28"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);