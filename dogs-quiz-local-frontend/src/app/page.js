"use client";
import DogList from "@/components/DogList";

export default function Home() {
  return (
    <div>
      <h1 className="mb-10 text-3xl font-bold text-center">Pet Dogs</h1>
      <DogList />
    </div>
  );
}
