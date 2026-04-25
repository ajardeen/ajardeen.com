import {Markdown}  from "@/components/markdown";
// import { ProseMono } from "@/components/ui/typography";
import { USER } from "@/data/user";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/components/panel";
import { Prose } from "@/components/ui/typography";

 function AboutSection() {
  return (
    <Panel id="about">
      <PanelHeader>
        <PanelTitle>About</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <Prose >

          <Markdown>{USER.about}</Markdown>
        </Prose>
        {/* </ProseMono> */}
      </PanelContent>
    </Panel>
  );
}

export default AboutSection;
