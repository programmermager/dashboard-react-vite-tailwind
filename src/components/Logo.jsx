import { cn } from "../lib/helper/utils";

export const Logo = ({ className, size, onClick }) => {
  var sizeClass = "w-12 h-12";
  var sizeClassCenter = "w-16 h-16 -mx-5";

  switch (size) {
    case "sm":
      sizeClass = "w-8 h-8";
      sizeClassCenter = "w-10 h-10 -mx-3";
      break;
    case "md":
      sizeClass = "w-10 h-10";
      sizeClassCenter = "w-10 h-10 -mx-4";
      break;
    default:
      sizeClass = "w-12 h-12";
      sizeClassCenter = "w-16 h-16 -mx-5";
      break;
  }

  return (
    <div onClick={onClick} className={cn("mr-2 flex items-center", className)}>
      <div className={`${sizeClass} rounded-full bg-[#012238]`}></div>
      <div
        className={`${sizeClassCenter} z-10 rounded-full bg-[#2f3369] bg-opacity-85`}
      ></div>
      <div className={`${sizeClass} rounded-full bg-[#de688a]`}></div>
    </div>
  );
};
