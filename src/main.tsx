import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpLeftIcon, InstagramLogoIcon, WhatsappLogoIcon, MoonIcon, SunIcon, DownloadSimpleIcon, MagnifyingGlassPlusIcon, MapTrifoldIcon, CalendarDotsIcon, ArrowLeftIcon } from '@phosphor-icons/react';
import '@fontsource-variable/noto-sans-arabic';
import './styles.css';
import { BrandLogo } from './BrandLogo';
import { GuideViewer } from './GuideViewer';
import { AcademicPlans, type PreviewDocument } from './AcademicPlans';
import { StudentGuide } from './StudentGuide';

const guides = [
  { title: 'دليل مباني الجامعة', description: 'أسماء المباني وأرقامها، لتصل إلى وجهتك بسهولة.', file: 'campus-guide.jpeg', label: 'خريطة الجامعة', Icon: MapTrifoldIcon, number: '01' },
  { title: 'رموز الجدول الدراسي', description: 'تعرّف على رموز الأيام والأوقات وأنماط المحاضرات.', file: 'schedule-guide.jpeg', label: 'الجدول الدراسي', Icon: CalendarDotsIcon, number: '02' },
];
function App() {
  const [theme, setTheme] = useState(document.documentElement.dataset.theme || 'light');
  const [selected, setSelected] = useState<PreviewDocument | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('iteam-theme', theme); } catch { /* Theme remains usable without storage. */ }
  }, [theme]);
  useEffect(() => {
    if (!selected) return;
    const previous = document.activeElement as HTMLElement;
    dialog.current?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; previous?.focus(); };
  }, [selected]);
  function close() { dialog.current?.close(); setSelected(null); }
  return <>
    <a href="#links" className="skip-link">انتقل إلى الروابط</a>
    <div className="page-shell mx-auto max-w-3xl px-5 sm:px-9">
      <header className="flex items-center justify-between py-7 sm:py-9">
        <a className="wordmark" href="#" aria-label="iTeam الرئيسية" dir="ltr"><BrandLogo compact /></a>
        <button className="theme-button flex items-center gap-2" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={theme === 'dark' ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}>{theme === 'dark' ? <SunIcon size={19}/> : <MoonIcon size={19}/>}<span className="text-xs">{theme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن'}</span></button>
      </header>
      <main>
        <section className="hero text-center" aria-labelledby="intro">
          <div className="hero-brand mx-auto"><BrandLogo /></div>
          <p className="eyebrow">فريق واحد. رحلة مشتركة.</p>
          <h1 id="intro">معك في رحلتك<span>الجامعية<span className="orange-dot">.</span></span></h1>
          <p className="intro-copy">روابطنا وأدلتك الطلابية، كلّها في مكان واحد.</p>
          <div className="hero-rule" aria-hidden="true"><span/><span/><span/><span/></div>
        </section>
        <section id="links" aria-labelledby="links-heading" className="mb-12">
          <div className="section-heading flex items-center justify-between"><h2 id="links-heading">خلّينا على تواصل</h2><span dir="ltr">STAY CONNECTED</span></div>
          <div className="grid gap-3">
            <a className="social-link instagram flex items-center gap-4 sm:gap-5" href="https://www.instagram.com/iteamzuj?rpxt=eTZubjJ6ZHVlZTU3" target="_blank" rel="noopener noreferrer"><span className="social-icon"><InstagramLogoIcon size={29}/></span><span className="grow"><strong>تابعنا على إنستغرام</strong><small>فعالياتنا، أخبارنا، وكل جديد <bdi>@iteamzuj</bdi></small></span><ArrowUpLeftIcon size={23} aria-label="يفتح في نافذة جديدة"/></a>
            <a className="social-link instagram flex items-center gap-4 sm:gap-5" href="https://www.instagram.com/it.zuj?obrf=MTc2amplNmRtNmNwdg%3D%3D&amp;utm_source=qr" target="_blank" rel="noopener noreferrer"><span className="social-icon"><InstagramLogoIcon size={29}/></span><span className="grow"><strong>حساب <bdi>it.zuj</bdi> على إنستغرام</strong><small><bdi>@it.zuj</bdi></small></span><ArrowUpLeftIcon size={23} aria-label="يفتح في نافذة جديدة"/></a>
            <a className="social-link whatsapp flex items-center gap-4 sm:gap-5" href="https://chat.whatsapp.com/CrXm427Lh1bE8uvGxYN91B" target="_blank" rel="noopener noreferrer"><span className="social-icon"><WhatsappLogoIcon size={29}/></span><span className="grow"><strong>انضمّ لمجتمعنا على واتساب</strong><small>خلّيك قريب من الفريق والزملاء</small></span><ArrowUpLeftIcon size={23} aria-label="يفتح في نافذة جديدة"/></a>
          </div>
        </section>
        <section aria-labelledby="guides-heading">
          <div className="section-heading flex items-center justify-between"><h2 id="guides-heading">دليلك للحياة الجامعية</h2><span>خطوتك الأولى أسهل</span></div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {guides.map(guide => <article className="guide-card" key={guide.file}>
              <button className="guide-preview" onClick={() => setSelected(guide)} aria-label={`عرض ${guide.title}`}><img src={`./images/${guide.file}`} alt={guide.label} loading="lazy"/><span className="preview-label"><guide.Icon size={17}/>{guide.label}</span><span className="preview-open"><MagnifyingGlassPlusIcon size={20}/></span></button>
              <div className="p-5"><div className="flex items-center justify-between gap-2"><h3>{guide.title}</h3><span className="guide-number">{guide.number}</span></div><p className="guide-description">{guide.description}</p><div className="guide-actions flex items-center justify-between"><button onClick={() => setSelected(guide)}>استعرض الدليل <ArrowLeftIcon size={17}/></button><a href={`./images/${guide.file}`} download aria-label={`تحميل ${guide.title}`}><DownloadSimpleIcon size={20}/></a></div></div>
            </article>)}
          </div>
        </section>
        <StudentGuide onPreview={setSelected}/>
        <AcademicPlans onPreview={setSelected}/>
      </main>
      <footer className="flex flex-col items-center gap-2 pb-8 pt-12"><span className="footer-brand" dir="ltr">iTeam<span>●</span></span><p>معك، خطوة بخطوة.</p></footer>
    </div>
    <dialog ref={dialog} onCancel={close} onClick={event => { if (event.target === dialog.current) close(); }} aria-labelledby="viewer-title">
      {selected && <GuideViewer key={selected.file} {...selected} onClose={close} />}
    </dialog>
  </>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
