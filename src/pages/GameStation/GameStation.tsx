import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/panel";
import Device from "./Device/Device";

function GameStation() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle className="text-5xl">Game Station</PanelTitle>
      </PanelHeader>
      <PanelContent className="">
        <Device />
      </PanelContent>
    </Panel>
  );
}

export default GameStation;
