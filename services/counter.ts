export async function generateCounterBill(scanId: string) {
  const res = await fetch(
    `http://localhost:5000/api/counter-bill/${scanId}`,
    { method: "POST" }
  );
  return res.json();
}
