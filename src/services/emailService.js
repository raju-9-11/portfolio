import emailjs from '@emailjs/browser';

export const sendEmail = async (formData) => {
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  return emailjs.send(serviceID, templateID, formData, publicKey);
};
