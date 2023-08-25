export async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed in products!");
    }

    const data = await res.json();

    if (res.status === 200) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}
