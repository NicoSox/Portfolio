import React, { useState, useEffect } from 'react';
import './Contact.css';

const Contact = ({ data, labels }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Detectar si el usuario regresa después de enviar el correo
  useEffect(() => {
    const mailSent = sessionStorage.getItem('mailSent');
    if (mailSent === 'true') {
      // This is safe - syncing with external state (sessionStorage)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowSuccess(true);
      sessionStorage.removeItem('mailSent');
      
      // Ocultar mensaje después de 5 segundos
      const timeoutId = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      
      // Cleanup timeout on unmount
      return () => clearTimeout(timeoutId);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Marcar que se va a enviar el correo
    sessionStorage.setItem('mailSent', 'true');
    
    const mailtoLink = `mailto:${data.mail}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `${labels.form.mailBodyLabels.name}: ${formData.name}\n${labels.form.mailBodyLabels.email}: ${formData.email}\n\n${labels.form.mailBodyLabels.message}:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoLink;
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <div className="section-header">
          <h2 className="section-title">{labels.title}</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">{labels.subtitle}</p>
        </div>
        
        {/* Mensaje de éxito */}
        {showSuccess && (
          <div className="success-message">
            {labels.successMessage}
          </div>
        )}
        
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
            <button type="submit" className="btn btn-primary">
              {labels.form.send}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
