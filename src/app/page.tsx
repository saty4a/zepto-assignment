"use client";

import TagsInput from "@/components/tagsInput";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <h1 className="text-center text-4xl mt-5 text-indigo-800 font-bold">Pick Users</h1>
      <TagsInput />
    </main>
  );
}
