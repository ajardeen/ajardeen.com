

function IconWrapper({ children }: any) {
  return (
    <div className="flex size-6 shrink-0 items-center justify-center rounded-md border border-muted-foreground/15 bg-muted ring-1 ring-muted ring-offset-1 ring-offset-background [&_svg]:pointer-events-none [&_svg]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4">
      {children}
    </div>
  );
}

export default IconWrapper;
