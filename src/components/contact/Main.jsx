import { useRef, useState } from 'react';
// migrated to Tailwind utilities (removed Contact.css import)
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

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

      <div className="contact-card max-w-3xl mx-auto p-8 rounded-xl bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm">
        <h2 className="text-2xl font-semibold mb-4">Contact Me</h2>
        <form ref={form} onSubmit={sendEmail} className="grid grid-cols-1 gap-4">
          <input className="px-4 py-3 rounded-md border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/60" type="text" name="user_name" placeholder="Your Name" required />
          <input className="px-4 py-3 rounded-md border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/60" type="email" name="user_email" placeholder="Your Email" required />
          <textarea className="px-4 py-3 rounded-md border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/60" name="message" rows="6" placeholder="Your Message" required></textarea>
          <div className="flex items-center justify-end">
            <button className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-md" type="submit">Send</button>
          </div>
        </form>

        {sent && <p className="text-green-600 mt-4">Message sent successfully!</p>}
        {error && <p className="text-red-500 mt-4">Oops! Something went wrong.</p>}
      </div>
      </div>
    </>
  );
};

export default Contact;
