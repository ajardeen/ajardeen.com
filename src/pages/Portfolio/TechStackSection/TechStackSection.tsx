import { TECH_STACK } from "@/data/tech-stack";
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/panel";


function TechStackSection() {
  return (
    <Panel id="tech-stack">
      <PanelHeader>
        <PanelTitle>Tech Stack</PanelTitle>
      </PanelHeader>

       <PanelContent>
        <ul className="flex flex-wrap gap-2">
          {TECH_STACK.map((tech) => {
            return (
              <li key={tech.key} className="flex">
                <a
                  href={tech.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={tech.title}
                  className="flex items-center gap-1.5 rounded-full border bg-zinc-50 px-1.5 py-0.5 text-xs tracking-wide text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 [&_img]:size-3.5 [&_img]:select-none"
                >
                  {tech.theme ? (
                    <>
                      <img
                        className="hidden [html.light_&]:block"
                        src={`https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}-light.svg`}
                        alt={`${tech.title} light icon`}
                        width={14}
                        height={14}
                      />
                      <img
                        className="hidden [html.dark_&]:block"
                        src={`https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}-dark.svg`}
                        alt={`${tech.title} dark icon`}
                        width={14}
                        height={14}
                      />
                    </>
                  ) : (
                    <img
                      src={`https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}.svg`}
                      alt={`${tech.title} icon`}
                      width={14}
                      height={14}
                    />
                  )}
                  {tech.title}
                </a>
              </li>
            )
          })}
        </ul>
      </PanelContent>
    </Panel>
  );
}

export default TechStackSection;