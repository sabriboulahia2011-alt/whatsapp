import * as React from "react";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
}

export function Switch({ label, ...props }: SwitchProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <input type="checkbox" className="accent-green-500 w-5 h-5" {...props} />
      <span className="text-base font-medium text-gray-800 dark:text-gray-200">{label}</span>
    </label>
  );
}
