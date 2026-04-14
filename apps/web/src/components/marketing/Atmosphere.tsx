/** Full-viewport ambient layers: depth without hurting readability. */
export function Atmosphere() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg"
      aria-hidden
    >
      <div className="ed-aurora absolute -inset-[25%] min-h-[140%] min-w-[140%]" />
      <div className="ed-noise absolute inset-0" />
      <div className="ed-grid absolute inset-0" />
      <div className="ed-vignette absolute inset-0" />
    </div>
  );
}
