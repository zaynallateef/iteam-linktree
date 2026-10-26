import { DownloadSimpleIcon, TreeStructureIcon, BookOpenIcon, CaretDownIcon } from '@phosphor-icons/react';
import assets from './plan-assets.json';

export type PreviewDocument = { title: string; file: string; pages?: string[]; downloadHref?: string };
type Plan = { asset: keyof typeof assets; kind: 'tree' | 'study'; year: string };
type Major = { name: string; code: string; plans: Plan[]; note?: string };
const majors: Major[] = [
  { name: 'هندسة البرمجيات', code: 'SE', plans: [{ asset: 'seT', kind: 'tree', year: '2024–2025' }, { asset: 'seS', kind: 'study', year: '2024–2025' }] },
  { name: 'علم البيانات والذكاء الاصطناعي', code: 'AI', plans: [{ asset: 'aiT', kind: 'tree', year: '2024–2025' }, { asset: 'aiS', kind: 'study', year: '2024–2025' }] },
  { name: 'الأمن السيبراني', code: 'CYS', plans: [{ asset: 'cysT', kind: 'tree', year: '2025–2026' }, { asset: 'cysS', kind: 'study', year: '2024–2025' }], note: 'تختلف سنة الخطة الشجرية عن سنة الخطة الدراسية في الملفات المتاحة. تأكّد من الخطة المعتمدة لدفعتك لدى القسم.' },
  { name: 'علم الحاسوب', code: 'CS', plans: [{ asset: 'csT', kind: 'tree', year: '2024–2025' }, { asset: 'csS', kind: 'study', year: '2024–2025' }] },
  { name: 'الرياضيات', code: 'MATH', plans: [{ asset: 'mathS', kind: 'study', year: '2026–2027' }], note: 'الخطة الشجرية غير متاحة حاليًا.' },
];

export function AcademicPlans({ onPreview }: { onPreview: (document: PreviewDocument) => void }) {
  return <section className="academic-plans" aria-labelledby="plans-heading">
    <div className="section-heading flex items-center justify-between"><h2 id="plans-heading">خطّط لرحلتك الدراسية</h2><span>خطط التخصصات</span></div>
    <p className="plans-intro">اختر تخصّصك لعرض الخطة الشجرية ومتطلبات الدراسة أو تحميلهما.</p>
    <div className="major-list">
      {majors.map((major, index) => <details className="major" key={major.code} open={index === 0}>
        <summary><span className="major-code" dir="ltr">{major.code}</span><span className="major-name"><strong>{major.name}</strong><small>{major.plans.length === 2 ? 'الخطة الشجرية والخطة الدراسية' : 'الخطة الدراسية'}</small></span><CaretDownIcon className="major-chevron" size={18}/></summary>
        <div className="major-content">
          <div className="plan-options">
            {major.plans.map(plan => {
              const asset = assets[plan.asset];
              const label = plan.kind === 'tree' ? 'الخطة الشجرية' : 'الخطة الدراسية';
              const title = `${major.name} · ${label}`;
              const Icon = plan.kind === 'tree' ? TreeStructureIcon : BookOpenIcon;
              return <div className="plan-option" key={plan.asset}>
                <div className="plan-label"><Icon size={23}/><h3>{label}</h3></div>
                <p className="plan-meta"><bdi>{plan.year}</bdi><span>·</span><bdi>{asset.file.endsWith('.pdf') ? 'PDF' : 'JPEG'}</bdi><span>·</span><span>{asset.pages.length === 1 ? 'صفحة واحدة' : `${asset.pages.length} صفحات`}</span></p>
                <div className="plan-actions"><button onClick={() => onPreview({ title, file: plan.asset, pages: asset.pages, downloadHref: asset.file })}>عرض الخطة</button><a href={asset.file} download aria-label={`تحميل ${title}`}><DownloadSimpleIcon size={18}/>تحميل</a></div>
              </div>;
            })}
          </div>
          {major.note && <p className="plan-note">{major.note}</p>}
        </div>
      </details>)}
    </div>
    <p className="plans-footnote">السنوات الموضّحة كما وردت في عناوين الملفات. اختر الخطة المناسبة لسنة قبولك.</p>
  </section>;
}
