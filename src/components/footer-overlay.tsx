function FooterOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-10 h-[calc(--spacing(24)+env(safe-area-inset-bottom,0))] bg-linear-to-b from-transparent from-[calc(env(safe-area-inset-bottom,0%))] to-background mask-linear-[to_top,var(--background)_25%,transparent] backdrop-blur-[1px]"
      aria-hidden="true"
    />
  );
}

export default FooterOverlay;
