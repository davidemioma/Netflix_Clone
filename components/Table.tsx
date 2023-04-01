import React from "react";
import { Product } from "@stripe/firestore-stripe-payments";
import { CheckIcon, XIcon } from "@heroicons/react/solid";

interface Props {
  products: Product[];
  selectedPlan: Product | null;
}

const Table = ({ products, selectedPlan }: Props) => {
  return (
    <div className="w-full mt-6 text-xs md:text-sm">
      <div className="tableRow">
        <p className="tableDataTitle">Monthly Plan</p>

        {products.map((product) => (
          <p
            key={product.id}
            className={`${
              selectedPlan?.id === product.id ? "text-[#e50914]" : "text-[gray]"
            } tableDataFeature`}
          >
            ${product.prices[0].unit_amount! / 100}
          </p>
        ))}
      </div>

      <div className="tableRow">
        <p className="tableDataTitle">Video Quality</p>

        {products.map((product) => (
          <p
            key={product.id}
            className={`${
              selectedPlan?.id === product.id ? "text-[#e50914]" : "text-[gray]"
            } tableDataFeature capitalize`}
          >
            {product.metadata.videoQuality}
          </p>
        ))}
      </div>

      <div className="tableRow">
        <p className="tableDataTitle">Resolution</p>

        {products.map((product) => (
          <p
            key={product.id}
            className={`${
              selectedPlan?.id === product.id ? "text-[#e50914]" : "text-[gray]"
            } tableDataFeature`}
          >
            {product.metadata.resolution}
          </p>
        ))}
      </div>

      <div className="tableRow border-0">
        <p className="tableDataTitle">
          Watch on your Tv, computer, mobile phone and tablet
        </p>

        {products.map((product) => (
          <span
            key={product.id}
            className="tableDataFeature flex justify-center"
          >
            {product.metadata.portability ? (
              <CheckIcon
                className={`w-6 h-6 ${
                  selectedPlan?.id === product.id
                    ? "text-[#e50914]"
                    : "text-[gray]"
                }`}
              />
            ) : (
              <XIcon
                className={`w-6 h-6 ${
                  selectedPlan?.id === product.id
                    ? "text-[#e50914]"
                    : "text-[gray]"
                }`}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Table;
