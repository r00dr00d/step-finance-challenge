import { twMerge } from "tailwind-merge";

type TabHeadingButtonProps = {
  icon: React.ReactNode;
  active: boolean;
  text: string;
  onClick: () => void;
}

export const TabHeadingButton = ({ icon = null, active = false, text, onClick }: TabHeadingButtonProps) => (
  <div onClick={onClick} className={
    twMerge(
      'cursor-pointer font-extrabold flex items-center gap-4 transition-colors duration-300 bg-[#0a0a0a] text-[#787878] hover:text-[#06d6a0] px-8 py-4 rounded-t-md',
      active && 'bg-[#141414] text-[#00f8b7]'
    )
  }>
    {icon}
    <span>{text}</span>
  </div>
)
