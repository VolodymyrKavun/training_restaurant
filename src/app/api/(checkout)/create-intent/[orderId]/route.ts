import { prisma } from "@/utils/connect";
import { NextResponse, NextRequest } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export type Props = {
  params: {
    orderId: string;
  };
};

export async function POST(request: NextRequest, { params }: Props) {
  const { orderId } = params;
  // console.log("🚀 ~ orderId:", orderId);

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });
  // console.log("🚀 ~ order:", order);

  if (order) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(order.price) * 100,
      currency: "usd",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: { intent_id: paymentIntent.id },
    });

    return new NextResponse(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      {
        status: 200,
      }
    );
  } else {
    return new NextResponse(JSON.stringify({ message: "Order not found!" }), {
      status: 404,
    });
  }
}
