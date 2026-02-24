import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { TechTower, techTowerSchema } from "./TechTower";
import { StartupOutreach, startupOutreachSchema } from "./StartupOutreach";
import { SignalAnimation, signalAnimationSchema } from "./SignalAnimation";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />

      {/* TechTower - Animated sourcing system demo */}
      <Composition
        id="TechTower"
        component={TechTower}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
        schema={techTowerSchema}
        defaultProps={{
          backgroundColor: "#f8fafc",
        }}
      />

      {/* StartupOutreach - Full outreach pipeline demo */}
      <Composition
        id="StartupOutreach"
        component={StartupOutreach}
        durationInFrames={720}
        fps={30}
        width={1920}
        height={1080}
        schema={startupOutreachSchema}
        defaultProps={{
          backgroundColor: "#f8fafc",
        }}
      />

      {/* SignalAnimation - 27s signal intelligence demo (1200x675) */}
      <Composition
        id="SignalAnimation"
        component={SignalAnimation}
        durationInFrames={820}
        fps={30}
        width={1200}
        height={675}
        schema={signalAnimationSchema}
        defaultProps={{
          backgroundColor: "#F5F5F5",
        }}
      />
    </>
  );
};
