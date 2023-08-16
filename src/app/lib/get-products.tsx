export async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products`, {
      cache: "no-store",
    });

    const data = await res.json();

    if (res.status === 200) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}
