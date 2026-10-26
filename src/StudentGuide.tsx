import { BookOpenIcon, DownloadSimpleIcon, ArrowLeftIcon } from '@phosphor-icons/react';
import asset from './student-guide.json';
import type { PreviewDocument } from './AcademicPlans';

export function StudentGuide({ onPreview }: { onPreview: (document: PreviewDocument) => void }) {
  const title = 'دليل الطلاب للعام الدراسي 2025–2026';
  return <section className="student-guide" aria-labelledby="student-guide-title">
    <div className="student-guide-icon"><BookOpenIcon size={28}/></div>
    <div className="student-guide-copy">
      <p className="student-guide-eyebrow">قبل أن تختار خطّتك</p>
      <h2 id="student-guide-title">دليل الطلاب</h2>
      <p>جامعة الزيتونة الأردنية · العام الدراسي <bdi>2025–2026</bdi></p>
      <span className="document-meta"><bdi>PDF</bdi> · {asset.pages.length} صفحة</span>
      <div className="student-guide-actions">
        <button onClick={() => onPreview({ title, file: 'student-guide', pages: asset.pages, downloadHref: asset.file })}>استعرض الدليل <ArrowLeftIcon size={18}/></button>
        <a href={asset.file} download><DownloadSimpleIcon size={18}/> تحميل الدليل</a>
      </div>
    </div>
  </section>;
}
