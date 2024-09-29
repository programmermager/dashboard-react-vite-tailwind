import { cn } from "../lib/helper/utils";

function Button({ text, onClick, className, disabled, isLoading }) {
  if (isLoading) {
    return (
      <center>
        <svg
          className="h-6 w-6 animate-spin rounded-full border-b-2 border-current"
          viewBox="0 0 24 24"
        ></svg>
      </center>
    );
  }
  return (
    <div>
      <button
        onClick={disabled ? null : onClick}
        className={cn(
          `w-full rounded-lg ${disabled ? "bg-slate-400" : "bg-primary"} p-3 text-sm text-white`,
          className,
        )}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
