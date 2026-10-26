/** User-supplied flat logo, preserving the original English lettering. */
export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return <img className={compact ? 'brand-logo compact' : 'brand-logo'} src="./images/iteam-logo.jpeg" width={1045} height={447} alt="iTeam - Al Zaytoonah University of Jordan, Faculty of Science & Technology" decoding="async" />;
}
