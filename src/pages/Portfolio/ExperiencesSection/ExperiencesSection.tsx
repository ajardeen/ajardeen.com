import { EXPERIENCES } from "@/data/experiences";
import { Panel, PanelHeader, PanelTitle } from "@/components/panel";
import { ExperienceItem } from "./experience-item";

 function ExperiencesSection() {
  return (
    <Panel id="experience">
      <PanelHeader>
        <PanelTitle>Experience</PanelTitle>
      </PanelHeader>

      <div className="pr-2 pl-4">
        {EXPERIENCES.map((experience) => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </div>
    </Panel>
  );
}

export default ExperiencesSection;