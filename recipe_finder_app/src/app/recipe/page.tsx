"use client";
import React from "react";

type Props = {
  id: string;
};

async function page(params: Props) {
  const { id } = params;

  fetch(process.env.NEXT_PUBLIC_API_URL + "/api/recipe/" + id).then((res) =>
    res.json()
  );

  return <div>page</div>;
}

export default page;
