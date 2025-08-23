import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// Load user's basket from Firestore
export const loadUserBasket = async (userId) => {
  try {
    const basketDoc = await getDoc(doc(db, 'baskets', userId));
    if (basketDoc.exists()) {
      return basketDoc.data().items || [];
    }
    return [];
  } catch (error) {
    console.error('Error loading basket:', error);
    return [];
  }
};

// Save user's basket to Firestore
export const saveUserBasket = async (userId, basket) => {
  try {
    await setDoc(doc(db, 'baskets', userId), {
      userId: userId,
      items: basket,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error saving basket:', error);
  }
};

// Update user's basket in Firestore
export const updateUserBasket = async (userId, basket) => {
  try {
    await updateDoc(doc(db, 'baskets', userId), {
      items: basket,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating basket:', error);
  }
};

// Clear user's basket from Firestore
export const clearUserBasket = async (userId) => {
  try {
    await deleteDoc(doc(db, 'baskets', userId));
  } catch (error) {
    console.error('Error clearing basket:', error);
  }
};
