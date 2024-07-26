"use client";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

/**
 * generic that gets all documents from a firestore database
 * @param {database} db
 * @param { } collectionName
 * @returns
 */

async function getAllDocuments(db, collectionName) {
  //console.log(db);
  const querySnapshot = await getDocs(collection(db, collectionName));
  const documents = [];

  querySnapshot.forEach((event) => {
    documents.push({ id: event, ...event.data() });
  });

  //console.log(collectionName, documents);
  return documents;
}
/**
 * Adds document to Firestore database
 * @param {database instance} db instance of Cloud Firestore Database
 * @param {string} collectionName The name of the db collection
 * @param {object} data An object representing a collection
 */

async function addDocument(db, collectionName, data) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function updateDocument(db, collectionName, id, data) {
  try {
    const docRef = doc(db, collectionName, id);

    if (docRef) {
      await updateDoc(docRef, data);
    } else {
      console.log("No Reference", id);
    }
  } catch (error) {
    console.log("Error updating", error);
  }
}

async function deleteDocument(db, collectionName, id) {
  try {
    const docRef = doc(db, collectionName, id);
    if (docRef) {
      await deleteDoc(docRef);
      console.log("Document deleted", docRef.id);
    }
  } catch (error) {
    console.log("Error deleting document", error);
  }
}

export {
  getAllDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
  collection,
  getDocs,
};
