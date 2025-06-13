import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useColor } from '../context/ColorContext';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const { colorScheme } = useColor();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedbackMessage('');

    const serviceID = 'service_2d1xbcq';
    const templateID = 'template_sr0xenc';
    const publicKey = 'HuORjpvKqMxU4SAz0';

    emailjs.send(serviceID, templateID, {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Steven Pierre',
    }, publicKey)
      .then(() => {
        setLoading(false);
        setFeedbackMessage('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(() => {
        setLoading(false);
        setFeedbackMessage('Failed to send message. Try again later.');
      });
  };

  return (
    <section className="py-12 px-4 sm:px-6 md:px-12" style={{ backgroundColor: colorScheme.background }}>
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: colorScheme.primary }}>
          Contact Me
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {['name', 'email', 'message'].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-sm font-medium mb-1"
                style={{ color: colorScheme.text }}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {field !== 'message' ? (
                <input
                  id={field}
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-md border outline-none text-sm"
                  style={{
                    backgroundColor: colorScheme.secondary,
                    color: colorScheme.onSecondary,
                    border: '1px solid #ccc',
                  }}
                />
              ) : (
                <textarea
                  id={field}
                  name={field}
                  rows={5}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-md border outline-none text-sm"
                  style={{
                    backgroundColor: colorScheme.secondary,
                    color: colorScheme.onSecondary,
                    border: '1px solid #ccc',
                  }}
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 rounded-md font-semibold transition-all duration-300"
            style={{
              backgroundColor: colorScheme.primary,
              color: colorScheme.onPrimary,
              border: 'none',
            }}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>

          {feedbackMessage && (
            <p className="text-center text-sm mt-4" style={{ color: colorScheme.primary }}>
              {feedbackMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
