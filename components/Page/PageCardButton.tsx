import Link from "next/link";
import React from "react";
import {
  PiFileTextThin,
  PiSuitcaseSimpleThin,
  PiUserListThin,
} from "react-icons/pi";

type IconType = "letter" | "job" | "profile";
type ThemeType = "pink" | "blue" | "gray";

type Props = {
  text: string;
  url: string;
  icon?: IconType;
  theme?: ThemeType;
};

type IconProps = {
  icon?: IconType;
};

const Icon = ({ icon }: IconProps) => {
  switch (icon) {
    case "letter":
      return <PiFileTextThin className="text-4xl" />;
    case "job":
      return <PiSuitcaseSimpleThin className="text-4xl" />;
    case "profile":
      return <PiUserListThin className="text-4xl" />;
    default:
      return null;
  }
};

const getTheme = (theme: ThemeType | undefined) => {
  switch (theme) {
    case "blue":
      return "from-blue-900 bg-blue-700";
    case "pink":
      return "from-pink-900 bg-pink-700";
    case "gray":
      return "from-gray-900 bg-gray-700";
    default:
      return "from-blue-900 bg-blue-700";
  }
};

const PageCardButton = (props: Props) => {
  return (
    <Link
      href={props.url}
      className={`flex flex-col hover:opacity-80 transition-all p-6 text-center gap-2 items-center justify-center w-full h-46 rounded-xl shadow-lg bg-gradient-to-t text-white ${getTheme(
        props.theme
      )}`}
    >
      <Icon icon={props.icon} />
      <h3 className="text-base">{props.text}</h3>
    </Link>
  );
};

export default PageCardButton;
