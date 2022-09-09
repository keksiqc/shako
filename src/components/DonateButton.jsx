import {
	Button,
	Tooltip
} from 'react-daisyui';
import {
	TbCup
} from 'react-icons/tb'


export default function DonateButton() {
  return (
		<Tooltip className="tooltip-bottom text-secondary" message="Donate">
			<Button 
				className="mb-1 hover:scale-110 duration-500"
				startIcon={<TbCup size="1.5em" />}
				shape="circle"
				onClick={() => window.open("https://keksi.me/donate", "_blank")}
				color="ghost">
			</Button>
		</Tooltip>
	)
}