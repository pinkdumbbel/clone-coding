import React, { SVGProps } from 'react';

interface SideBarRowProps {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  onClick?: () => void;
}

function SideBarRow({ Icon, title, onClick }: SideBarRowProps) {
  return (
    <div
      onClick={onClick}
      className="group flex items-center space-x-2 px-4 py-3 rounded-full hover:bg-gray-100 cursor-pointer transition-all duration-200 max-w-fit"
    >
      <Icon className="h-6 w-6" />
      <p className="group-hover:text-twitter hidden md:inline-flex text-base font-light lg:text-xl">
        {title}
      </p>
    </div>
  );
}

export default SideBarRow;
