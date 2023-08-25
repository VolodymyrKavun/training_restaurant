import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";

type Props = {
  params: {
    intentId: string;
  };
};

export const PUT = async ({ params }: Props) => {
  const { intentId } = params;
  // console.log("🚀 ~ intentId:", intentId);

  try {
    await prisma.order.update({
      where: {
        intent_id: intentId,
      },
      data: { status: "Being prepared!" },
    });

    return new NextResponse(
      JSON.stringify({ message: "Order has been update!" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
