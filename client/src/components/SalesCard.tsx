/* eslint-disable @next/next/no-img-element */
/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */

import Link from "next/link";
import React from "react";

export type SalesProps = {
  name: string;
  saleAmount: string;
  id: string;
};

export default function SalesCard(props: SalesProps) {
  return (
    <Link href={"/course/" + props.id + "/0/0"} className="flex flex-wrap justify-between gap-3">
      <section className="flex justify-between items-center gap-3 ">
        <div className=" h-12 w-12 rounded-full bg-gray-100 p-1">
          <img
            width={200}
            height={200}
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${props.name}`}
            alt="avatar"
          />
        </div>
        <div className="text-base">
          <p>{props.name}</p>
        </div>
      </section>
      <p className="text-base text-zinc-100">{props.saleAmount}</p>
    </Link>
  );
}
