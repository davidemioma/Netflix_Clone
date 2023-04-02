import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import useSubscription from "../hooks/useSubscription";
import BtnSpinner from "./BtnSpinner";
import { goToBillingPortal } from "../lib/stripe";

const Membership = () => {
  const [user] = useAuthState(auth);

  const subscription = useSubscription();

  const [loading, setLoading] = useState(false);

  const manageSubscription = async () => {
    setLoading(true);

    try {
      await goToBillingPortal();

      setLoading(false);
    } catch (err) {
      setLoading(false);

      console.log(err);
    }
  };

  return (
    <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
      <div className="space-y-2 py-4">
        <h4 className="text-lg text-[gray]">Membership & Billing</h4>

        <button
          className="bg-gray-300 w-3/5 md:w-4/5 flex items-center justify-center py-2 shadow-md text-black text-sm rounded hover:bg-gray-200 disabled:cursor-not-allowed"
          disabled={loading || !subscription}
          onClick={manageSubscription}
        >
          {loading ? <BtnSpinner /> : <p>Cancel Membership</p>}
        </button>
      </div>

      <div className="col-span-3 text-sm md:text-base">
        <div className="flex flex-col justify-between border-b border-white/10 py-4 md:flex-row">
          <div>
            <p className="font-medium">{user?.email}</p>

            <p className="text-[gray]">Password: ********</p>
          </div>

          <div className="md:text-right">
            <p className="membershipLink">Change email</p>

            <p className="membershipLink">Change password</p>
          </div>
        </div>

        <div className="flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0">
          <div>
            <p>
              {subscription?.cancel_at_period_end
                ? "Your membership will end on "
                : "Your next billing date is "}
              {subscription?.current_period_end}
            </p>
          </div>

          <div className="md:text-right">
            <p className="membershipLink">Manage payment info</p>

            <p className="membershipLink">Add backup payment method</p>

            <p className="membershipLink">Billing Details</p>

            <p className="membershipLink">Change billing day</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
