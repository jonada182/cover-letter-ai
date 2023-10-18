import Image from "next/image";
import React from "react";
import { FormButton } from "../Form";
import JobsBg from "@/public/img/jobs-bg.jpg";

type Props = {
  heading?: string;
  imgPath?: string;
  actionText?: string;
  handleOnClick?: () => void;
};

const PageHero = (props: Props) => {
  return (
    <div className="flex w-full h-48 md:h-80 relative bg-gray-50 rounded-xl shadow-lg overflow-hidden">
      <div className="flex justify-between flex-col z-20 relative p-6 md:p-12">
        <h1 className="text-2xl font-bold">
          {props.heading !== "" ? props.heading : "Welcome"}
        </h1>
        {props.handleOnClick && props.actionText && (
          <FormButton text={props.actionText} onClick={props.handleOnClick} />
        )}
      </div>
      <div className="opacity-25 bg-gradient-to-t from-black flex-grow w-full h-full absolute z-10"></div>
      <Image
        src={props.imgPath ?? JobsBg}
        alt="Jobs"
        className="object-cover -z-0 object-right"
        fill={true}
      />
    </div>
  );
};

export default PageHero;
