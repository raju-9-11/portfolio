// Placeholder for EmailJS service
// This file can be easily swapped with another implementation

export const sendEmail = async (formData) => {
  // Simulate network request
  console.log("Sending email with data:", formData);

  return new Promise((resolve) => {
    setTimeout(() => {
      // For now, we just simulate success.
      // In a real scenario, you would integrate emailjs-com here.
      // Example:
      // return emailjs.send(serviceID, templateID, formData, publicKey);
      resolve({ text: "OK" });
    }, 1000);
  });
};
