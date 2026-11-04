// Re-mounted by Next.js on every navigation, so each page fades in instead of snapping into place.
// Opacity only: a transform or filter here would become the containing block for `position: fixed`
// children (the About page's full-screen sections) while the animation runs.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>
}
