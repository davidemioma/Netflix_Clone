import React, { useEffect, useState } from "react";
import {
  Subscription,
  onCurrentUserSubscriptionUpdate,
} from "@stripe/firestore-stripe-payments";
import payments from "../lib/stripe";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const useSubscription = () => {
  const [user] = useAuthState(auth);

  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    if (!user) return;

    onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
      setSubscription(
        snapshot.subscriptions.filter(
          (sub) => sub.status === "active" || sub.status === "trialing"
        )[0]
      );
    });
  }, [user]);

  return subscription;
};

export default useSubscription;
