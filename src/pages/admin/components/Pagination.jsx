import { ArrowRight, ArrowLeft } from "lucide-react";

export const Pagination = ({ currentPage, totalPages, onNext, onPrev }) => {
  return (
    <>
      <div className="flex items-center">
        {" "}
        <ArrowLeft
          onClick={currentPage > 1 ? onPrev : null}
          className={`mr-5 h-8 w-8 rounded-md border ${currentPage == 1 ? `border-gray-400 text-gray-400` : `border-black text-black`} p-1`}
        />
        <div>
          Halaman <span className="font-bold">{currentPage}</span> dari{" "}
          <span className="font-bold">{totalPages}</span>
        </div>
        <ArrowRight
          onClick={currentPage < totalPages ? onNext : null}
          className={`border ${currentPage == totalPages ? `border-gray-400 text-gray-400` : `border-black text-black`} ml-5 h-8 w-8 rounded-md p-1`}
        />
      </div>
    </>
  );
};
