import emailjs from '@emailjs/browser';

export const sendEmail = async (formData) => {
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  return emailjs.send(serviceID, templateID, formData, publicKey);
};

export const sendRookAlert = async ({ senderName, senderContact, message }) => {
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const contact = (senderContact || '').trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const emailVal = isEmail ? contact : 'rook-agent@portfolio.local';

  const formattedMessage = `[Message from Rook Agent Assistant]
From: ${senderName || 'Anonymous Visitor'}
Contact: ${contact || 'Not provided'}
Timestamp: ${new Date().toLocaleString()}

Message / Opportunity:
${message || 'Requested connection via Rook Agent'}`;

  const payload = {
    name: senderName || 'Rook Agent Lead',
    email: emailVal,
    message: formattedMessage
  };

  try {
    if (serviceID && templateID && publicKey) {
      const res = await emailjs.send(serviceID, templateID, payload, publicKey);
      console.log('[Rook Alert] Dispatched successfully via EmailJS:', res);
      return { success: true, method: 'emailjs' };
    }
  } catch (err) {
    console.warn('[Rook Alert] EmailJS send failed:', err);
  }

  // Fallback logging & persistence in browser
  try {
    if (typeof localStorage !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem('portfolio_leads') || '[]');
      stored.push({ ...payload, timestamp: new Date().toISOString() });
      localStorage.setItem('portfolio_leads', JSON.stringify(stored));
    }
  } catch (e) {
    console.warn('LocalStorage save failed:', e);
  }

  return { success: true, method: 'local_fallback' };
};
