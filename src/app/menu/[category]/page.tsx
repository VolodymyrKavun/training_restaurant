import { ProductType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getCategory } from "@/app/lib/get-category";

// const getData = async (category: string) => {
//   const res = await fetch(
//     `${process.env.NEXTAUTH_URL}/api/products?cat=${category}`,
//     {
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed!");
//   }

//   return res.json();
// };

// before

// export const getStaticPaths: GetStaticPaths = async (
//   category: ProductType
// ) => {
//   const res = await fetch(
//     `${process.env.NEXTAUTH_URL}/api/products?cat=${category}`,
//     {
//       cache: "no-store",
//     }
//   );
//   const posts = await res.json();
//   const paths = posts.map(({ category }: { category: ProductType }) => ({
//     params: { category },
//   }));
//   return {
//     paths,
//     fallback: true,
//     //The paths that have not been generated at build time will not result in a 404 page.
//     //Instead, fallback: true This will be used to automatically render
//     //the page with the required props.
//   };
// };

// export const getStaticPaths: GetStaticPaths = async (category: ProductType) => {
//   // fetch list of available slugs from a database
//   const res = await fetch(
//     `${process.env.NEXTAUTH_URL}/api/products?cat=${category}`,
//     {
//       cache: "no-store",
//     }
//   );
//   const posts = await res.json();
//   const categories = posts.map((post: any) => post.category);

//   // return the possible values for the [slug] parameter
//   return {
//     paths: categories.map((category: any) => ({ params: { category } })),
//     fallback: false,
//   };
// };
// after

type Props = {
  params: { category: string };
};

const CategoryPage = async ({ params }: Props) => {
  const products: ProductType[] = await getCategory(params.category);
  // console.log("🚀 ~ products:", products);

  return (
    <div className="flex flex-wrap text-red-500">
      {products.map((item) => (
        <Link
          className="w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-50"
          href={`/product/${item.id}`}
          key={item.id}
        >
          {/* IMAGE CONTAINER */}
          {item.img && (
            <div className="relative h-[80%]">
              <Image src={item.img} alt="" fill className="object-contain" />
            </div>
          )}
          {/* TEXT CONTAINER */}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl">${item.price}</h2>
            <button className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md">
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;
