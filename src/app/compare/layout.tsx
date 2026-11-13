// Passthrough layout. The compare page is now a server component and carries
// its own metadata (title, description, canonical, OG).
export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
