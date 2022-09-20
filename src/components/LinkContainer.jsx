import { Divider } from "react-daisyui";

import LinkButton from "./LinkButton";
import DonateButton from "./DonateButton";

export default function LinkContainer() {
  const socials = ["Discord", "Twitter", "Github", "Twitch", "Spotify"];

  return (
    <div className="max-w-2xl m-auto">
      {socials.map((title, i) => {
        return <LinkButton key={i} title={title} />;
      })}
      <Divider className="w-4/5 m-auto" />
      <DonateButton />
    </div>
  );
}
