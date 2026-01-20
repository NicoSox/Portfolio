import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { HiOutlineMenu, HiOutlineX, HiOutlineHome, HiOutlineUser, HiOutlineCode, HiOutlinePhone, HiOutlineChatAlt2, HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaWhatsapp, FaTelegramPlane, FaFilePdf } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import { AiOutlineMail } from 'react-icons/ai';
import useThemeStore from '../data/themeStore';
import { useI18n } from '../i18n';

const Header = () => {
  
  // two-stage open state to allow CSS transition:
  // visible: the drawer is mounted/visible in DOM
  // open: controls the CSS 'open' class that triggers the slide-in transition
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    if (!visible) {
      setVisible(true);
      // allow browser to paint initial state before adding class
      setTimeout(() => setOpen(true), 20);
    } else {
      // start close animation
      setOpen(false);
      // after animation, remove from DOM
      setTimeout(() => setVisible(false), 560);
    }
  };

  // focus trap refs + handlers
  const drawerRef = useRef(null);
  const prevFocusRef = useRef(null);
  const prevBodyScrollRef = useRef(0);
  const [showMailModal, setShowMailModal] = useState(false);
  const mailModalRef = useRef(null);
  const mailPrevFocusRef = useRef(null);

  useEffect(() => {
    // apply body class while the drawer is in its 'open' state so blur transitions
    if (open) {
      document.body.classList.add('menu-open');
      // save previously focused element
      // focus first focusable in drawer after paint
      setTimeout(() => {
        const root = drawerRef.current;
        if (!root) return;
        const focusable = root.querySelectorAll('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])');
        if (focusable.length) focusable[0].focus();
      }, 40);
    } else {
      document.body.classList.remove('menu-open');
      // restore body scroll position and focus
      setTimeout(() => {
        try { prevFocusRef.current?.focus(); } catch (e) { /* ignore */ }
        // restore body scrolling
        const prev = prevBodyScrollRef.current || 0;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        window.scrollTo(0, prev);
      }, 260);
    }

    const onKey = (e) => {
      if (!open) return;
      if (e.key === 'Escape') {
        setOpen(false);
        setTimeout(() => setVisible(false), 560);
      }
      if (e.key === 'Tab') {
        // simple focus trap
        const root = drawerRef.current;
        if (!root) return;
        const focusable = Array.from(root.querySelectorAll('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])')).filter(el => !el.hasAttribute('disabled'));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // i18n and theme store hooks
  const { t } = useI18n();
  const { theme, toggleTheme, lang, setLanguage, reduceMotion, setReduceMotion, accentColor, setAccentColor } = useThemeStore();

  // projects filter debounce
  const filterTimerRef = useRef(null);

  // apply accent color to CSS variable for global use
  useEffect(() => {
    if (accentColor) {
      try {
        // set CSS variables: --accent and --accent-rgb (used for rgba shadows)
        document.documentElement.style.setProperty('--accent', accentColor);
        const hexToRgb = (hex) => {
          const c = hex.replace('#','');
          const full = c.length === 3 ? c.split('').map(ch => ch+ch).join('') : c;
          const bigint = parseInt(full, 16);
          const r = (bigint >> 16) & 255;
          const g = (bigint >> 8) & 255;
          const b = bigint & 255;
          return `${r},${g},${b}`;
        };
        try {
          const rgb = hexToRgb(accentColor);
          document.documentElement.style.setProperty('--accent-rgb', rgb);

          // Helpers: convert hex -> HSL and build CSS hsl/hsla strings
          const hexToHsl = (hex) => {
            const c = hex.replace('#','');
            const full = c.length === 3 ? c.split('').map(ch => ch+ch).join('') : c;
            const bigint = parseInt(full, 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            const rf = r/255, gf = g/255, bf = b/255;
            const max = Math.max(rf,gf,bf), min = Math.min(rf,gf,bf);
            let h=0, s=0, l=(max+min)/2;
            if (max !== min) {
              const d = max - min;
              s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
              switch (max) {
                case rf: h = (gf - bf) / d + (gf < bf ? 6 : 0); break;
                case gf: h = (bf - rf) / d + 2; break;
                case bf: h = (rf - gf) / d + 4; break;
              }
              h = Math.round(h * 60);
            }
            return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
          };

          const hslToCss = (h,s,l) => `hsl(${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%)`;
          const hslaCss = (h,s,l,a) => `hsla(${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}% , ${a})`;

          const primaryHsl = hexToHsl(accentColor);

          // Mute the primary so it's visually calming: reduce saturation and
          // slightly lower brightness for dark theme, slightly raise for light.
          const mutedPrimary = {
            h: primaryHsl.h,
            s: Math.round(Math.max(8, primaryHsl.s * 0.55)),
            l: theme === 'dark' ? Math.min(48, Math.round(primaryHsl.l * 0.9)) : Math.min(82, Math.round(primaryHsl.l + 6)),
          };

          // Automatic secondary: choose hue close to primary (stay in same family),
          // avoid reds/oranges; tweak saturation/lightness to contrast but remain muted.
          const preferShift = (mutedPrimary.h >= 200 && mutedPrimary.h <= 300) ? 18 : 22;
          let secondaryH = (mutedPrimary.h + preferShift) % 360;
          const isForbiddenHue = (h) => (h <= 50 || h >= 330);
          if (isForbiddenHue(secondaryH)) {
            secondaryH = (mutedPrimary.h - preferShift + 360) % 360;
            if (isForbiddenHue(secondaryH)) secondaryH = (mutedPrimary.h + 12) % 360;
          }

          const secondaryS = Math.min(100, Math.round(mutedPrimary.s * (theme === 'dark' ? 0.95 : 1.05)) + (theme === 'dark' ? 4 : 6));
          const secondaryL = theme === 'dark' ? Math.min(54, Math.round(mutedPrimary.l + 8)) : Math.max(38, Math.round(mutedPrimary.l + 10));

          // Now derive background stops depending on theme, using mutedPrimary
          if (theme === 'dark') {
            // deep, low-light stops for dark theme (muted tones)
            document.documentElement.style.setProperty('--bg-1', hslToCss(mutedPrimary.h, Math.max(10, Math.round(mutedPrimary.s * 0.8)), 6));
            document.documentElement.style.setProperty('--bg-2', hslToCss(mutedPrimary.h, Math.max(12, Math.round(mutedPrimary.s * 0.86)), 10));
            document.documentElement.style.setProperty('--bg-3', hslToCss(mutedPrimary.h, Math.max(16, Math.round(mutedPrimary.s * 0.92)), 16));
            document.documentElement.style.setProperty('--bg-4', hslToCss(secondaryH, Math.max(12, secondaryS), Math.min(28, secondaryL)));

            document.documentElement.style.setProperty('--blob-1', hslaCss(mutedPrimary.h, Math.max(18, Math.round(mutedPrimary.s)), Math.min(44, Math.round(mutedPrimary.l + 6)), 0.12));
            document.documentElement.style.setProperty('--blob-2', hslaCss(secondaryH, Math.max(12, Math.round(secondaryS)), Math.min(40, Math.round(secondaryL - 6)), 0.09));
            document.documentElement.style.setProperty('--blob-3', hslaCss(secondaryH, Math.max(10, Math.round(secondaryS - 6)), Math.min(34, Math.round(secondaryL - 12)), 0.07));
          } else {
            // light theme: pastel, muted stops
            document.documentElement.style.setProperty('--bg-1', hslToCss(mutedPrimary.h, Math.max(10, Math.round(mutedPrimary.s * 0.9)), Math.min(96, Math.round(mutedPrimary.l + 28))));
            document.documentElement.style.setProperty('--bg-2', hslToCss(mutedPrimary.h, Math.max(12, Math.round(mutedPrimary.s * 0.98)), Math.min(92, Math.round(mutedPrimary.l + 18))));
            document.documentElement.style.setProperty('--bg-3', hslToCss(mutedPrimary.h, Math.max(16, Math.round(mutedPrimary.s * 1.02)), Math.min(86, Math.round(mutedPrimary.l + 8))));
            document.documentElement.style.setProperty('--bg-4', hslToCss(secondaryH, Math.max(12, secondaryS), Math.min(60, secondaryL)));

            document.documentElement.style.setProperty('--blob-1', hslaCss(mutedPrimary.h, Math.max(16, Math.round(mutedPrimary.s)), Math.min(64, Math.round(mutedPrimary.l + 4)), 0.14));
            document.documentElement.style.setProperty('--blob-2', hslaCss(secondaryH, Math.max(12, Math.round(secondaryS)), Math.min(58, Math.round(secondaryL - 2)), 0.10));
            document.documentElement.style.setProperty('--blob-3', hslaCss(secondaryH, Math.max(10, Math.round(secondaryS - 6)), Math.min(52, Math.round(secondaryL - 8)), 0.10));
          }
        } catch (e) { /* ignore minor color calc errors */ }
      } catch (e) {
        // ignore in non-browser contexts
      }
    }
  }, [accentColor, theme]);

  const emitFilter = (value) => {
    // dispatch a CustomEvent so the projects page can listen
    window.dispatchEvent(new CustomEvent('projects-filter', { detail: String(value || '').trim() }));
  };

  const onFilterInput = (value) => {
    if (filterTimerRef.current) clearTimeout(filterTimerRef.current);
    filterTimerRef.current = setTimeout(() => emitFilter(value), 220);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close with animation
      setOpen(false);
      setTimeout(() => setVisible(false), 560);
    }
  };

  // Mail modal helpers
  const EMAIL_ADDR = 'nicosoxkij@gmail.com';
  const openProvider = (provider) => {
    const subject = '';
    const body = '';
    let url = '';
    const to = encodeURIComponent(EMAIL_ADDR);
    const s = encodeURIComponent(subject);
    const b = encodeURIComponent(body);
    switch (provider) {
      case 'gmail':
        url = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${s}&body=${b}`;
        break;
      case 'outlook':
        url = `https://outlook.live.com/owa/?path=/mail/action/compose&to=${to}&subject=${s}&body=${b}`;
        break;
      case 'yahoo':
        url = `https://compose.mail.yahoo.com/?to=${to}&subject=${s}&body=${b}`;
        break;
      case 'mailto':
        url = `mailto:${EMAIL_ADDR}`;
        break;
      default:
        url = `mailto:${EMAIL_ADDR}`;
    }
    // open in new tab for web providers, mailto for native
    if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener');
    } else {
      window.location.href = url;
    }
    // close modal
    setShowMailModal(false);
    setTimeout(() => {
      try { mailPrevFocusRef.current?.focus(); } catch (e) {}
    }, 160);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDR);
      // small feedback could be added; just close modal
    } catch (e) {
      // fallback: select + execCommand
      const ta = document.createElement('textarea');
      ta.value = EMAIL_ADDR;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (err) {}
      document.body.removeChild(ta);
    }
    setShowMailModal(false);
    setTimeout(() => {
      try { mailPrevFocusRef.current?.focus(); } catch (e) {}
    }, 160);
  };

  // modal keyboard handling (escape to close, simple tab trap)
  useEffect(() => {
    if (!showMailModal) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setShowMailModal(false);
        setTimeout(() => { try { mailPrevFocusRef.current?.focus(); } catch (e) {} }, 120);
      }
      if (e.key === 'Tab') {
        const root = mailModalRef.current;
        if (!root) return;
        const focusable = Array.from(root.querySelectorAll('button,[tabindex]:not([tabindex="-1"])')).filter(el => !el.hasAttribute('disabled'));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length -1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showMailModal]);


  const mailModalPortal = showMailModal ? ReactDOM.createPortal(
    (
      <div className="mail-modal-overlay" role="dialog" aria-modal="true">
        <div ref={mailModalRef} className="mail-modal" role="document">
          <header className="mail-modal-header">
            <div>
              <h3 className="mail-modal-title">Enviar email a <span className="mono">{EMAIL_ADDR}</span></h3>
              <p className="mail-modal-sub">Selecciona un proveedor para redactar</p>
            </div>
            <button className="close-modal" onClick={() => setShowMailModal(false)} aria-label="Cerrar">✕</button>
          </header>
          <div className="mail-modal-body">
            <div className="mail-options-grid">
              <button className="mail-option" onClick={() => openProvider('gmail')} aria-label="Gmail">Gmail</button>
              <button className="mail-option" onClick={() => openProvider('outlook')} aria-label="Outlook">Outlook</button>
              <button className="mail-option" onClick={() => openProvider('yahoo')} aria-label="Yahoo Mail">Yahoo</button>
              <button className="mail-option" onClick={() => openProvider('mailto')} aria-label="Abrir cliente">Abrir cliente</button>
              <button className="mail-option" onClick={copyEmail} aria-label="Copiar dirección">Copiar dirección</button>
            </div>
          </div>
        </div>
      </div>
    ),
    document.body
  ) : null;

  // theme-aware swatches: light and dark palettes
  // Light palette: soft pastel tones (visible but muted)
  const lightPalette = ['#a7c8ff','#9fe7e0','#ffd8e0','#ffe5b8'];
  // Dark palette: deep blues / teal for calm, tranquil appearance
  const darkPalette = ['#1e40af','#0b7285','#0b3a66','#08325a'];
  const palette = theme === 'dark' ? darkPalette : lightPalette;

  return (
    <>
    <nav className="site-header fixed top-0 left-0 w-full z-40 backdrop-blur-sm bg-white/30 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative">
        <div className="flex items-center gap-3">
          <img src="/assets/LOGO.png" alt="Logo" className="site-logo w-10 h-10 rounded-full" />
        </div>

        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="text-center" style={{ display: 'inline-block' }}>
            <span className="header-title font-semibold text-lg" style={{ ['--delay']: '0ms', lineHeight: '1', display: 'inline-block' }}>Soxkij</span>
            <span className="header-title font-semibold text-lg" style={{ ['--delay']: '140ms', marginLeft: '4px', lineHeight: '1', display: 'inline-block' }}>Nicolás Mauricio</span>
          </div>
        </div>

        {/* desktop nav removed — navigation now lives inside the hamburger/drawer */}

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className="p-2 rounded-md text-slate-800 dark:text-slate-200 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-sky-400"
            data-test="menu-toggle"
          >
            {open ? <HiOutlineX size={20} /> : <HiOutlineMenu size={20} />}
          </button>
        </div>

        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" style={{ display: visible ? 'block' : 'none' }}>
          <div className={`absolute inset-0 bg-black/40 mobile-backdrop ${open ? 'visible' : ''}`} onClick={() => { setOpen(false); setTimeout(() => setVisible(false), 560); }} />
          <aside ref={drawerRef} className={`mobile-drawer ${open ? 'open' : ''} absolute right-0 top-0 h-full w-80 max-w-[86vw] shadow-2xl p-6`} aria-label="Menú">
                <div className="menu-header flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img src="/assets/LOGO.png" alt="Logo" className="w-9 h-9 rounded-full object-cover" />
                  <div style={{ display: 'inline-block' }}>
                    <span className="header-title font-semibold" style={{ ['--delay']: '0ms', lineHeight: '1', display: 'inline-block' }}>Soxkij</span>
                    <span className="header-title text-sm" style={{ ['--delay']: '140ms', marginLeft: '4px', lineHeight: '1', display: 'inline-block' }}>Nicolás Mauricio</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="language-inline flex gap-2 mr-2">
                    <button onClick={() => { setLanguage('es'); }} className={`lang-btn ${lang === 'es' ? 'active' : ''}`} aria-pressed={lang === 'es'}>ES</button>
                    <button onClick={() => { setLanguage('en'); }} className={`lang-btn ${lang === 'en' ? 'active' : ''}`} aria-pressed={lang === 'en'}>EN</button>
                  </div>
                  <button onClick={() => { setOpen(false); setTimeout(() => setVisible(false), 560); }} aria-label="Cerrar menú" className="p-2 rounded-md text-slate-800 dark:text-slate-200 focus:outline-none close-btn">
                    <HiOutlineX size={20} />
                  </button>
                </div>
              </div>

              {/* Quick controls: theme, language, CV. 'Estilo' palette moved here (search input removed) */}

              

              <div className="flex items-center gap-3" style={{ marginBottom: '10px' }}>
                <label className="text-sm">Estilo:</label>
                <div className="accent-palette">
                  {palette.map((c)=> (
                    <button
                      key={c}
                      aria-label={`color-${c}`}
                      onClick={() => setAccentColor(c)}
                      className={`accent-swatch ${accentColor === c ? 'selected' : ''}`}
                      aria-pressed={accentColor === c}
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 items-center mb-4">
                            <button
                              onClick={() => toggleTheme()}
                              className={`toggle-pill ${theme === 'dark' ? 'active' : ''}`}
                              aria-pressed={theme === 'dark'}
                              title={theme === 'dark' ? t('themeLight') : t('themeDark')}
                            >
                              {theme === 'dark' ? <HiOutlineMoon className="ti" /> : <HiOutlineSun className="ti" />}
                              <span style={{ fontSize: '0.92rem' }}>{theme === 'dark' ? t('themeLight') : t('themeDark')}</span>
                            </button>

                            <button
                              onClick={() => setReduceMotion(!reduceMotion)}
                              className={`motion-toggle ${reduceMotion ? 'on' : ''}`}
                              aria-pressed={!!reduceMotion}
                              title={t('reduceMotion')}
                            >
                              <span className="knob" aria-hidden />
                              <span style={{ fontSize: '0.92rem' }}>{t('reduceMotion')}</span>
                            </button>
                          </div>

              

              

              

              <div className="mb-4" style={{ marginTop: '10px' }}>
                <a
                  href="/CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="menu-item flex items-center gap-3 px-3 py-2 text-lg font-medium rounded-md btn-anim accent-preview"
                  aria-label={t('downloadCV')}
                >
                  <span className="text-xl accent"><FaFilePdf /></span>
                  <span>{t('downloadCV')}</span>
                </a>
              </div>

              <nav className="flex flex-col gap-3 mt-2">
                {[
                  { id: 'home', label: 'Inicio', icon: <HiOutlineHome /> },
                  { id: 'about', label: 'Sobre mí', icon: <HiOutlineUser /> },
                  { id: 'projects', label: 'Proyectos', icon: <HiOutlineCode /> },
                  { id: 'contact', label: 'Contacto', icon: <HiOutlineChatAlt2 /> },
                ].map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => { setOpen(false); setTimeout(() => setVisible(false), 560); scrollToSection(item.id); }}
                          className="menu-item flex items-center gap-3 px-3 py-2 text-lg font-medium rounded-md hover:bg-slate-100 dark:hover:bg-slate-800/60"
                            style={{ ['--delay']: `${i * 140}ms` }}
                  >
                          <span className="text-xl accent">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-4 border-t flex flex-col gap-3">
                <div className="flex items-center gap-3 justify-center socials">
                  <button onClick={() => {
                    // open modal with provider choices
                    mailPrevFocusRef.current = document.activeElement;
                    setShowMailModal(true);
                    setTimeout(() => {
                      const root = mailModalRef.current;
                      if (!root) return;
                      const focusable = root.querySelectorAll('button,[role="button"],[tabindex]:not([tabindex="-1"])');
                      if (focusable.length) focusable[0].focus();
                    }, 40);
                  }} className="social-link" aria-haspopup="dialog" aria-label="Email" title="Email">
                    <AiOutlineMail className="accent" />
                  </button>
                  <a href="tel:+1130991611" className="social-link" aria-label="Teléfono" title="Teléfono">
                      <HiOutlinePhone className="accent" />
                  </a>
                    <a href="https://wa.me/541130991611" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp" title="WhatsApp">
                      <FaWhatsapp className="accent" />
                    </a>
                    <a href="https://t.me/Nicolas Soxkij" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Telegram" title="Telegram">
                      <FaTelegramPlane className="accent" />
                    </a>
                    <a href="https://github.com/NicoSox" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub" title="GitHub">
                      <FaGithub className="accent" />
                    </a>
                    <a href="https://linkedin.com/in/nicolas-soxkij" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn" title="LinkedIn">
                      <FaLinkedin className="accent" />
                    </a>
                </div>
              </div>
            </aside>
          </div>
      </div>
    </nav>
    {mailModalPortal}
    </>
  );
};
export default Header;
