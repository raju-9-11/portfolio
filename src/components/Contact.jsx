import { useState } from 'react';
import styled from 'styled-components';
import WindowFrame from './common/WindowFrame';
import { sendEmail } from '../services/emailService';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9rem;
  margin-bottom: 2px;
`;

const Input = styled.input`
  border: 2px inset var(--win-white);
  padding: 5px;
  background: var(--win-white);
  font-family: inherit;
`;

const TextArea = styled.textarea`
  border: 2px inset var(--win-white);
  padding: 5px;
  background: var(--win-white);
  font-family: inherit;
  min-height: 100px;
  resize: vertical;
`;

const Button = styled.button`
  align-self: flex-start;
  background: var(--win-gray);
  border: 2px solid;
  border-color: var(--win-white) var(--win-black) var(--win-black) var(--win-white);
  padding: 5px 20px;
  font-weight: bold;
  cursor: pointer;

  &:active {
    border-color: var(--win-black) var(--win-white) var(--win-white) var(--win-black);
    transform: translateY(1px);
  }

  &:disabled {
    color: var(--win-gray-dark);
    cursor: not-allowed;
  }
`;

const StatusMessage = styled.p`
  font-size: 0.9rem;
  color: ${props => props.error ? 'red' : 'green'};
  margin: 5px 0 0;
`;

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await sendEmail(formData);
      setStatus({ type: 'success', text: 'Message sent successfully!' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) { // eslint-disable-line no-unused-vars
      setStatus({ type: 'error', text: 'Failed to send message.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <WindowFrame title="OUTLOOK_EXPRESS / CONTACT">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Name:</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Message:</Label>
          <TextArea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Button type="submit" disabled={loading}>
          {loading ? 'SENDING...' : 'SEND'}
        </Button>
        {status && (
          <StatusMessage error={status.type === 'error'}>
            {status.text}
          </StatusMessage>
        )}
      </Form>
    </WindowFrame>
  );
};

export default Contact;
