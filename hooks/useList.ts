import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, onSnapshot } from "@firebase/firestore";
import { MovieProps } from "../types";

const useList = () => {
  const [user] = useAuthState(auth);

  const [myList, setMyList] = useState<MovieProps[]>([]);

  useEffect(() => {
    if (!user) return;

    return onSnapshot(
      collection(db, "customers", `${user?.uid}`, "myList"),
      (snapshot) => {
        setMyList(
          snapshot.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    );
  }, [user?.uid]);

  return myList;
};

export default useList;
