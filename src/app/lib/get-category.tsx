export async function getCategory(props: any) {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/products?cat=${props}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed in categories!");
    }

    const data = await res.json();

    if (res.status === 200) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}
