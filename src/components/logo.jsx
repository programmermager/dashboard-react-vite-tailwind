import { cn } from "../lib/helper/utils";

export const Logo = ({className, size}) => {
    var sizeClass = 'w-12 h-12';
    var sizeClassCenter = 'w-16 h-16 -mx-5';

    switch (size) {
        case 'sm':
            sizeClass = 'w-8 h-8';
            sizeClassCenter = 'w-10 h-10 -mx-3';
            break;
        case 'md':
            sizeClass = 'w-10 h-10';
            sizeClassCenter = 'w-10 h-10 -mx-4';
            break;
        default:
            sizeClass = 'w-12 h-12';
            sizeClassCenter = 'w-16 h-16 -mx-5';
            break;
    }
    
    return (
        <div className={cn('flex items-center mr-2', className)}>
            <div className={`${sizeClass} bg-[#012238]  rounded-full`}></div>
            <div className={`${sizeClassCenter} z-10  bg-[#2f3369] bg-opacity-85 rounded-full`}></div>
            <div className={`${sizeClass} bg-[#de688a] rounded-full`}></div>
        </div>
    );
}