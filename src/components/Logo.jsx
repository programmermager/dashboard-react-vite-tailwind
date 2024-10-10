import { cn } from "../lib/helper/utils";

export const Logo = ({ className, size, onClick }) => {
  var sizeClass = "w-6 h-6";
  var sizeClassCenter = "w-8 h-8 -mx-2";

  switch (size) {
    case "sm":
      sizeClass = "w-5 h-5";
      sizeClassCenter = "w-7 h-7 -mx-2";
      break;
    case "md":
      sizeClass = "w-10 h-10";
      sizeClassCenter = "w-10 h-10 -mx-4";
      break;
    default:
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
