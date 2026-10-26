import { useEffect, useRef, useState } from 'react';
import { TransformWrapper, TransformComponent, type ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { DownloadSimpleIcon, XIcon, MagnifyingGlassPlusIcon, MagnifyingGlassMinusIcon, ArrowsOutSimpleIcon } from '@phosphor-icons/react';

export function GuideViewer({ title, file, pages, downloadHref, onClose }: { title: string; file: string; pages?: string[]; downloadHref?: string; onClose: () => void }) {
  const [page, setPage] = useState(0);
  const [failed, setFailed] = useState(false);
  const pageSources = pages ?? [`./images/${file}`];
  const original = downloadHref ?? `./images/${file}`;
  const controls = useRef<ReactZoomPanPinchRef>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [natural, setNatural] = useState({ width: 1, height: 1 });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = reduced ? 0 : 220;
  function changePage(next: number) {
    controls.current?.resetTransform(0);
    setPage(next);
    setFailed(false);
  }
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      controls.current?.resetTransform(0);
    });
    if (viewport.current) observer.observe(viewport.current);
    return () => observer.disconnect();
  }, []);
  const fit = Math.min(size.width / natural.width, size.height / natural.height);
  return <div className="viewer">
    <TransformWrapper ref={controls} minScale={1} maxScale={5} centerOnInit centerZoomedOut smooth={!reduced}
      wheel={{ step: .12 }} doubleClick={{ mode: 'toggle', step: 1, animationTime: duration }}
      autoAlignment={{ animationTime: duration }} zoomAnimation={{ disabled: reduced, animationTime: duration }}
      velocityAnimation={{ disabled: reduced }}
      onTransform={(_, state) => setScale(Math.round(state.scale * 100) / 100)}>
      {({ zoomIn, zoomOut, resetTransform, setTransform, instance }) => <>
        <div className="viewer-toolbar flex flex-wrap items-center justify-between gap-3">
          <h2 id="viewer-title">{title}</h2>
          <div className="viewer-tools flex items-center gap-2">
            <button onClick={() => zoomOut(.3, duration)} disabled={scale <= 1.01} aria-label="تصغير الصورة"><MagnifyingGlassMinusIcon size={21}/></button>
            <output className="zoom-level" aria-label="مستوى التكبير" dir="ltr">{Math.round(scale * 100)}%</output>
            <button onClick={() => zoomIn(.3, duration)} disabled={scale >= 4.99} aria-label="تكبير الصورة"><MagnifyingGlassPlusIcon size={21}/></button>
            <button onClick={() => resetTransform(duration)} aria-label="إعادة ضبط العرض" title="إعادة ضبط العرض"><ArrowsOutSimpleIcon size={21}/></button>
            <a href={original} download aria-label="تحميل الملف الأصلي"><DownloadSimpleIcon size={21}/></a>
            <button onClick={onClose} aria-label="إغلاق العرض" autoFocus><XIcon size={21}/></button>
          </div>
        </div>
        {pageSources.length > 1 && <nav className="page-navigation" aria-label="صفحات الملف">
          <button disabled={page === 0} onClick={() => changePage(page - 1)}>السابقة</button>
          <label className="page-picker">الصفحة <select aria-label="انتقل إلى الصفحة" value={page} onChange={event => changePage(Number(event.target.value))}>{pageSources.map((_, index) => <option key={index} value={index}>{index + 1}</option>)}</select> من {pageSources.length}</label>
          <button disabled={page === pageSources.length - 1} onClick={() => changePage(page + 1)}>التالية</button>
        </nav>}
        <div ref={viewport} className="guide-viewport" dir="ltr" tabIndex={0} role="region" aria-label="معاينة الدليل. استخدم زائد وناقص للتكبير والأسهم للتحريك وصفر لإعادة الضبط."
          onKeyDown={event => {
            const { positionX, positionY, scale: currentScale } = instance.state;
            if (event.key === '+' || event.key === '=') zoomIn(.3, duration);
            else if (event.key === '-') zoomOut(.3, duration);
            else if (event.key === '0') resetTransform(duration);
            else if (event.key.startsWith('Arrow')) {
              const x = event.key === 'ArrowLeft' ? 60 : event.key === 'ArrowRight' ? -60 : 0;
              const y = event.key === 'ArrowUp' ? 60 : event.key === 'ArrowDown' ? -60 : 0;
              setTransform(positionX + x, positionY + y, currentScale, duration);
            } else return;
            event.preventDefault();
          }}>
          <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }} contentStyle={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {failed ? <p className="preview-error" role="alert">تعذّر عرض الصفحة. <a href={original} target="_blank" rel="noopener noreferrer">افتح الملف الأصلي</a></p> : <img key={pageSources[page]} src={pageSources[page]} alt={`${title} — الصفحة ${page + 1}`} draggable={false} onError={() => setFailed(true)} onLoad={event => setNatural({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight })} style={{ width: natural.width * fit, height: natural.height * fit }} />}
          </TransformComponent>
        </div>
        <p className="viewer-hint">كبّر بعجلة الفأرة أو بإصبعين، واسحب للتنقّل. انقر مرتين للتكبير أو إعادة الضبط.</p>
      </>}
    </TransformWrapper>
  </div>;
}
