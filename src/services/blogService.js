import {
    collection, 
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    getDoc,
    updateDoc,
  
} from "firebase/firestore"

import { db } from "../firebase/firebase"

//
export const addBlog = async (blogData) => {
    const docRef = await addDoc(collection(db, "posts"), blogData);

};

//
export const getBlogs = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));

    const blogs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return blogs;
}

//
export const deleteBlogById = async (id) => {
    await deleteDoc(doc(db, "posts", id));
}


//
export const getBlogById = async (id) => {
    const docRef = doc(db, "posts", id)

    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
        throw new Error(" Blog not Found")
    }

    return {
        id: docSnap.id,
        ...docSnap.data(),
    };
}

//

export const updateBlog = async (id, updatedData) => {
    const docRef = doc(db, "posts", id);

    await updateDoc(docRef, updatedData);
}