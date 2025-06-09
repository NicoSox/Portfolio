import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // IMPORTA useNavigate
import emailjs from '@emailjs/browser';
import '../../styles/css/Contact.css';

const Contact = () => {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_t49mrtk', 'template_pay35rc', form.current, 'PKIgV7RsnHTivu_i-')
      .then(
        (result) => {
          setSent(true);
          setError(false);
          form.current.reset();
        },
        (error) => {
          setError(true);
          setSent(false);
        }
      );
  };

  return (
    <>
    <div className='main-scrollable'>
      <button onClick={() => navigate(-1)}style={{position: 'absolute',top: '70px',left: '10px',padding: '8px 12px',cursor: 'pointer',borderRadius: '5px',border: '1px solid #ccc',backgroundColor: '#fff',zIndex: 1100,}}>
        ← Volver
      </button>

      <div className="contact-container">
        <h2>Contact Me</h2>
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <input type="text" name="user_name" placeholder="Your Name" required />
          <input type="email" name="user_email" placeholder="Your Email" required />
          <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
          <button type="submit">Send</button>
        </form>

        {sent && <p className="success-msg">Message sent successfully!</p>}
        {error && <p className="error-msg">Oops! Something went wrong.</p>}
      </div>
      </div>
    </>
  );
};

export default Contact;
