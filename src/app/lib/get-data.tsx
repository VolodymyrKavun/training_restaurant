export async function getMenu() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed in Menu!");
    }

    const data = await res.json();

    if (res.status === 200) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}
