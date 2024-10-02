import { cn } from "../lib/helper/utils";

export const Input = ({
  label,
  id,
  register,
  name,
  rules,
  type,
  placeholder,
  onInput,
  className,
  error,
}) => {
  return (
    <div className={cn(`flex w-full flex-col gap-2`, className)}>
      <div className="flex justify-between">
        <label htmlFor={id} className="text-sm">
          {label}
        </label>
      </div>

      <input
        name={name}
        {...register(name, rules)}
        className="w-full rounded-lg border p-2 text-sm active:border-black"
        placeholder={placeholder}
        type={type}
        id={id}
        onInput={onInput}
      />
      {error && (
        <span className="flex justify-start text-xs font-bold text-red-500">
          {error}
        </span>
      )}
    </div>
  );
};
