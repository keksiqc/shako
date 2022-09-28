import { Button } from 'react-daisyui';
import {
  SiDiscord,
  SiTwitter,
  SiGithub,
  SiTwitch,
  SiSpotify,
} from 'react-icons/si';

export default function LinkButton({ title }) {
  const socials = {
    discord: {
      url: 'https://keksi.me/discord',
      textColor: 'hover:text-discord',
      borderColor: 'hover:border-discord',
      icon: <SiDiscord />,
    },
    twitter: {
      url: 'https://keksi.me/twitter',
      textColor: 'hover:text-twitter',
      borderColor: 'hover:border-twitter',
      icon: <SiTwitter />,
    },
    github: {
      url: 'https://keksi.me/github',
      textColor: 'hover:text-base-content',
      borderColor: 'hover:border-base-content',
      icon: <SiGithub />,
    },
    twitch: {
      url: 'https://keksi.me/twitch',
      textColor: 'hover:text-twitch',
      borderColor: 'hover:border-twitch',
      icon: <SiTwitch />,
    },
    spotify: {
      url: 'https://keksi.me/spotify',
      textColor: 'hover:text-spotify',
      borderColor: 'hover:border-spotify',
      icon: <SiSpotify />,
    },
  };

  const social = socials[title.toLowerCase()];

  return (
    <>
      <Button
        className={`w-3/4 h-14 mb-3 text-lg hover:scale-105 hover:bg-transparent ${social.textColor} ${social.borderColor} duration-500`}
        startIcon={social.icon}
        onClick={() => window.open(social.url, '_blank')}
        color="primary"
      >
        {title}
      </Button>
    </>
  );
}
