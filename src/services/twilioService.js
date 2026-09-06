// Twilio Alert Service for Rook Agent

export async function dispatchTwilioAlert({ senderName, senderContact, message }) {
  const webhookUrl = import.meta.env?.VITE_TWILIO_WEBHOOK_URL;
  const accountSid = import.meta.env?.VITE_TWILIO_ACCOUNT_SID;
  const authToken = import.meta.env?.VITE_TWILIO_AUTH_TOKEN;
  const fromPhone = import.meta.env?.VITE_TWILIO_FROM_NUMBER;
  const toPhone = import.meta.env?.VITE_TWILIO_TO_NUMBER || "+919876543210";

  const payload = {
    senderName: senderName || "Anonymous Visitor",
    senderContact: senderContact || "No contact provided",
    message: message || "Requested connection via Rook Agent",
    timestamp: new Date().toISOString()
  };

  // 1. If a backend webhook / Firebase cloud function is configured (Recommended for production)
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) return { success: true, method: 'webhook' };
    } catch (err) {
      console.warn("Twilio webhook dispatch failed:", err);
    }
  }

  // 2. If direct Twilio REST API credentials are provided in .env
  if (accountSid && authToken && fromPhone && toPhone) {
    try {
      const bodyText = `[ROOK AGENT ALERT] 🚀 Portfolio Lead:\nFrom: ${payload.senderName}\nContact: ${payload.senderContact}\nMessage: ${payload.message}`;
      const params = new URLSearchParams();
      params.append('To', toPhone);
      params.append('From', fromPhone);
      params.append('Body', bodyText);

      const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      });

      if (res.ok) {
        return { success: true, method: 'twilio_direct' };
      }
    } catch (err) {
      console.warn("Direct Twilio dispatch failed:", err);
    }
  }

  // 3. Fallback / Dev Mode: Log alert to console and localStorage
  console.log("%c[ROOK AGENT TWILIO DISPATCH]", "color: #00f3ff; font-weight: bold;", payload);
  try {
    if (typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function') {
      const alerts = JSON.parse(localStorage.getItem('rook_alerts') || '[]');
      alerts.push(payload);
      if (typeof localStorage.setItem === 'function') {
        localStorage.setItem('rook_alerts', JSON.stringify(alerts.slice(-10)));
      }
    }
  } catch {
    // Ignore storage quota error
  }

  return { success: true, method: 'local_simulation' };
}
