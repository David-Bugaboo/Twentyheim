import React from "react";

interface TableOfContentsProps {
  tableOfContents: Array<{
    id: string;
    label: string;
    type: string;
    ref?: React.RefObject<null>;
  }>;
  onItemClick: (item: any) => void;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  tableOfContents,
  onItemClick,
}) => {
    console.log(onItemClick)
  return (
    <>
      <h2
        className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 md:px-8 lg:px-16 xl:px-32 2xl:px-48"
        style={{ fontFamily: "Cinzel, serif" }}
      >
        Table of Contents
      </h2>
      {tableOfContents.map((item: any) => (
        <div
          key={item.id}
          className="flex items-center gap-4 bg-[#181111] px-4 min-h-14 justify-between cursor-pointer hover:bg-[#2a1f1f] transition-colors md:px-8 lg:px-16 xl:px-32 2xl:px-48"
          onClick={() => onItemClick(item)}
        >
          <p className="text-white text-base font-normal leading-normal flex-1 truncate">
            {item.label}
          </p>
          <div className="shrink-0">
            <div className="text-white flex size-7 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
              </svg>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TableOfContents;
