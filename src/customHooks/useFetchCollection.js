// import { useEffect, useState } from 'react'
// import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
// import { db } from '../fireBase/config';
// import { toast } from 'react-toastify';

// export default function useFetchCollection(collectionName) {
//     const [data, setData] = useState([]);

//     const getCollection = () => {
//         try {
//           const docRef = collection(db, collectionName);
//           const q = query(docRef, orderBy("createdAt", "desc"));
//           onSnapshot(q, (snapshot) => {
//             const allData = snapshot.docs.map((doc) => ({
//               id: doc.id,
//               ...doc.data()
//             }))
//             setData(allData);
//           });
//         } catch (error) {
//           toast.error(error.message);
//         }
//     }

//     useEffect(() => {
//         getCollection()
//     },[])
//     return{data}
// }


import { useEffect, useState, useCallback } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../fireBase/config';
import { toast } from 'react-toastify';

export default function useFetchCollection(collectionName) {
  const [data, setData] = useState([]);

  const getCollection = useCallback(() => {
    try {
      const docRef = collection(db, collectionName);
      const q = query(docRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(allData);
      });
    } catch (error) {
      toast.error(error.message);
    }
  }, [collectionName]);

  useEffect(() => {
    getCollection();
  }, [getCollection]);

  return { data };
}