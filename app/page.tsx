import { BorderHuntGame } from "@/components/BorderHuntGame";
import { pickMysteryState } from "@/lib/game";

export const dynamic = "force-dynamic";

export default function Home() {
  return <BorderHuntGame initialMysteryState={pickMysteryState()} />;
}
