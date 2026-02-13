export async function generateCounterBill(scanId: string, token: string) {
  const res = await fetch(
    `http://localhost:5000/api/counter-bill/${scanId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ scanId: scanId })
    },
  );
  return res.json();
}
