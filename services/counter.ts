export async function generateCounterBill(scanId: string, token: string) {
  const res = await fetch(
    `http://localhost:5000/api/counter-bill/${scanId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({scanId : scanId})
    },
  );
  return res.json();
}
