"use client";

import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";

const ResetButton = () => {
  const { status } = useSession();

  const reset = useCartStore((state) => state.reset);

  return (
    <>
      {status === "authenticated" ? (
        <button
          className="ml-4 cursor-pointe"
          type="button"
          onClick={() => reset()}
        >
          Reset
        </button>
      ) : (
        <div>Not</div>
      )}
    </>
  );
};

export default ResetButton;
