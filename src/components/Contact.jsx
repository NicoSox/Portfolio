import React, { useState } from 'react';
import './Contact.css';

const Contact = ({ data, labels }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <div className="section-header">
          <h2 className="section-title">{labels.title}</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">{labels.subtitle}</p>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h3>{labels.cards.email}</h3>
              <a href={`mailto:${data.mail}`}>{data.mail}</a>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-phone"></i>
              </div>
              <h3>{labels.cards.phone}</h3>
              <a href={`tel:${data.telefono}`}>{data.telefono}</a>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fab fa-github"></i>
              </div>
              <h3>{labels.cards.github}</h3>
              <a href={data.github} target="_blank" rel="noopener noreferrer">
                {labels.cards.viewProfile}
              </a>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fab fa-linkedin"></i>
              </div>
              <h3>{labels.cards.linkedin}</h3>
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
                {labels.cards.connect}
              </a>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{labels.form.name}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder={labels.form.placeholderName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">{labels.form.email}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={labels.form.placeholderEmail}
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">{labels.form.subject}</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder={labels.form.placeholderSubject}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">{labels.form.message}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder={labels.form.placeholderMessage}
              ></textarea>
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Enviando...' : labels.form.submit}
              <i className="fas fa-paper-plane"></i>
            </button>
            {success && (
              <div className="success-message">
                ✅ ¡Mensaje enviado exitosamente! Te responderé pronto.
              </div>
            )}
            {error && (
              <div className="error-message">
                ❌ Error al enviar el mensaje. Por favor intenta nuevamente.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
