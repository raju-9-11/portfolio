import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import PixelCard from './common/PixelCard';
import { sendEmail } from '../services/emailService';
import { useTheme } from '../context/ThemeContext';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100%;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--text-dim);
  color: var(--text-main);
  padding: 10px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: var(--neon-cyan);
    box-shadow: 0 0 5px var(--neon-cyan);
  }
`;

const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--text-dim);
  color: var(--text-main);
  padding: 10px;
  font-family: inherit;
  flex: 1;
  resize: none;

  &:focus {
    outline: none;
    border-color: var(--neon-cyan);
    box-shadow: 0 0 5px var(--neon-cyan);
  }
`;

const Button = styled.button`
  background: var(--neon-pink);
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background: #d946ef;
    transform: translateY(-2px);
  }

  &:disabled {
    background: var(--text-dim);
    cursor: not-allowed;
    transform: none;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid #ffffff;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: ${spin} 1s linear infinite;
`;

const Status = styled.div`
  color: ${props => props.$error ? '#ff5555' : 'var(--neon-green)'};
  font-size: 0.9rem;
  text-align: center;
`;

const TEXT_CONFIG = {
  cyberpunk: {
    placeholders: {
      name: "CODENAME (Name)",
      email: "FREQUENCY (Email)",
      message: "PAYLOAD (Message)"
    },
    errors: {
      name: "INVALID CODENAME (1-100 CHARS)",
      email: "INVALID FREQUENCY (EMAIL FORMAT)",
      message: "PAYLOAD ERROR (1-1000 CHARS)",
      transmission: "TRANSMISSION FAILED"
    },
    button: {
      default: "INITIATE UPLOAD",
      loading: "UPLOADING..."
    },
    status: {
      success: "TRANSMISSION SENT SUCCESSFULLY"
    }
  },
  professional: {
    placeholders: {
      name: "Your Name",
      email: "Email Address",
      message: "How can I help you?"
    },
    errors: {
      name: "Please enter a valid name (1-100 characters)",
      email: "Please enter a valid email address",
      message: "Message must be between 1 and 1000 characters",
      transmission: "Failed to send message. Please try again."
    },
    button: {
      default: "Send Message",
      loading: "Sending..."
    },
    status: {
      success: "Message sent successfully!"
    }
  }
};

const Contact = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const currentText = TEXT_CONFIG[theme] || TEXT_CONFIG.professional;

  const validateForm = (data) => {
    if (!data.name || data.name.length > 100) return currentText.errors.name;
    // Basic email regex for security validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) return currentText.errors.email;
    if (!data.message || data.message.length > 1000) return currentText.errors.message;
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Security: Input sanitization and validation
    const sanitizedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim()
    };

    const validationError = validateForm(sanitizedData);
    if (validationError) {
      setStatus({ type: 'error', text: validationError });
      return;
    }

    setLoading(true);

    try {
      await sendEmail(sanitizedData);
      setStatus({ type: 'success', text: currentText.status.success });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.log(error);
      setStatus({ type: 'error', text: currentText.errors.transmission });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PixelCard title="Contact" id="contact-section">
      <Form onSubmit={handleSubmit} noValidate>
        <Input
          placeholder={currentText.placeholders.name}
          aria-label="Name"
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          required
        />
        <Input
          type="email"
          placeholder={currentText.placeholders.email}
          aria-label="Email Address"
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
          required
        />
        <TextArea
          placeholder={currentText.placeholders.message}
          aria-label="Message"
          value={formData.message}
          onChange={e => setFormData({...formData, message: e.target.value})}
          required
        />
        <Button type="submit" disabled={loading} aria-busy={loading}>
          {loading && <Spinner aria-hidden="true" />}
          {loading ? currentText.button.loading : currentText.button.default}
        </Button>
        <div role="alert" aria-live="polite">
          {status && <Status $error={status.type === 'error'}>{status.text}</Status>}
        </div>
      </Form>
    </PixelCard>
  );
};

export default Contact;
