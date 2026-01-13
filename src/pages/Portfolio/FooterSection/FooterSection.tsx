import { SOCIAL_LINKS } from "@/data/social-links";

function FooterSection() {
  return (
    <footer className="max-w-screen overflow-x-hidden screen-line-before ">
      <div className="screen-line-before  mx-auto border-x border-edge pt-4 md:max-w-3xl">
        <p className="mb-1 px-4 text-center font-mono text-sm text-balance text-muted-foreground">
          Inspired by ui.shadcn.com & chanhdai
        </p>

        <p className="mb-4 px-4 text-center font-mono text-sm text-balance text-muted-foreground">
          Built by{" "}
          <a
            className="link"
            href="https://www.linkedin.com/in/s-mohamed-ajardeen/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ajardeen
          </a>
        </p>

        {/* Social Links */}
        <div className="screen-line-before screen-line-after flex w-full before:z-1 after:z-1">
          <div className="mx-auto flex items-center justify-center gap-3 border-x border-edge bg-background px-4">
            <p className="flex font-mono text-xs font-medium text-muted-foreground">
              Social Connect
            </p>

            {SOCIAL_LINKS.map((social) => (
              <>
                <Separator />
                <a
                  key={social.title}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center transition-opacity hover:opacity-80"
                  title={social.title}
                >
                  <img
                    src={social.icon}
                    alt={social.title}
                    className="size-4 sm:size-5 grayscale-100 rounded-sm opacity-60"
                  />
                  <span className="sr-only">{social.title}</span>
                </a>
              </>
            ))}
          </div>
        </div>
      </div>

      {/* Safe area spacing */}
      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex h-2" />
      </div>
    </footer>
  );
}

export default FooterSection;

function Separator() {
  return <div className="flex h-11 w-px bg-edge" />;
}
