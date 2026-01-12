import { CollapsibleList } from "@/components/collapsible-list";

import { CERTIFICATIONS } from "@/data/certifications";
import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "@/components/panel";
import { CertificationItem } from "./certification-item";

function CertificationsSection() {
  return (
    <Panel id="certs">
      <PanelHeader>
        <PanelTitle>
          Certifications
          <PanelTitleSup>({CERTIFICATIONS.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <CollapsibleList
        items={CERTIFICATIONS}
        max={8}
        renderItem={(item) => <CertificationItem certification={item} />}
      />
    </Panel>
  );
}

export default CertificationsSection;