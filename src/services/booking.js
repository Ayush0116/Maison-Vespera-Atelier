/**
 * Simulates appointment enquiry submission.
 * Single seam for future backend connection (NO network calls made).
 */
export async function submitEnquiry(data) {
  // Simulate natural brief server processing time
  await new Promise(resolve => setTimeout(resolve, 600));

  return {
    ok: true,
    mode: "demo",
    timestamp: new Date().toISOString(),
    summary: {
      name: data.name,
      phone: data.phone,
      serviceName: data.serviceName,
      professionalName: data.professionalName || "Any available senior artisan",
      date: data.date,
      time: data.time,
      notes: data.notes || ""
    }
  };
}
