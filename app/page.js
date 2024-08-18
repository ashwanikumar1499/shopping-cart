import Link from "next/link";

export default function Home() {
  return (
    <div className="p-2 flex justify-center items-center h-full w-full">
      {" "}
      <Link href={"/products"}>Go to Products Page</Link>{" "}
    </div>
  );
}
