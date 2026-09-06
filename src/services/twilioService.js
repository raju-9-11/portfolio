// Alert Notification Service for Rook Agent (Dispatches via EmailJS)
import { sendRookAlert } from './emailService';

export async function dispatchTwilioAlert({ senderName, senderContact, message }) {
  return sendRookAlert({ senderName, senderContact, message });
}

