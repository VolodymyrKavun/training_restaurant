"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export type Props = {
  id: string;
};

const DeleteButton = ({ id }: Props) => {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return <p>Loading ...</p>;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    return;
  }

  const handleDelete = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
      { method: "DELETE" }
    );

    if (res.status === 200) {
      router.push("/menu");
      toast.success("The product has been deleted!");
    } else {
      const data = await res.json();
      toast.error(data.message);
    }
  };

  return (
    <button
      className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-full ml-6"
      onClick={handleDelete}
    >
      <Image src="/close.png" alt="" width={20} height={20} />
    </button>
  );
};

export default DeleteButton;
