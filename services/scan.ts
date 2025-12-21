export async function scanInvoice(file: File, token: string) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://localhost:5000/api/scan", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res.json();
}
