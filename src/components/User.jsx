import { Avatar, Tooltip } from 'react-daisyui';

export default function User({ data }) {
  const statusColors = {
    online: 'ring-green-500',
    idle: 'ring-yellow-500',
    dnd: 'ring-red-500',
    offline: 'ring-gray-500',
  };

  const avatarUrl = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=256`;

  const statusColor = statusColors[data.discord_status];

  const activityMessage = data.spotify
    ? `Listening to ${data.spotify.song} by ${data.spotify.artist}`
    : data.activities[0]
    ? `Playing ${data.activities[0].name}`
    : 'Doing nothing';

  return (
    <div className="m-5">
      <Tooltip className="tooltip-bottom" message={activityMessage}>
        <Avatar
          className={`mb-5 rounded-full ring ${statusColor} ring-offset-base-100 ring-offset-2`}
          src={avatarUrl}
          size="lg"
          shape="circle"
        />
      </Tooltip>
      <p className="text-3xl">{data.discord_user.username}</p>
    </div>
  );
}
