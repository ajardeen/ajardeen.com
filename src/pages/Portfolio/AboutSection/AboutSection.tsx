import {Markdown}  from "@/components/markdown";
// import { ProseMono } from "@/components/ui/typography";
import { USER } from "@/data/user";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/components/panel";

 function AboutSection() {
  return (
    <Panel id="about">
      <PanelHeader>
        <PanelTitle>About</PanelTitle>
      </PanelHeader>

      <PanelContent>
        {/* <ProseMono> */}
          <Markdown>{USER.about}</Markdown>
        {/* </ProseMono> */}
      </PanelContent>
    </Panel>
  );
}

export default AboutSection;
