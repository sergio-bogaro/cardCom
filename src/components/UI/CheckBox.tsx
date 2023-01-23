interface checkboxProps {
  label: string;
}

export function Checkbox({ label }: checkboxProps) {
  return (
    <label className="flex items-center gap-2">
      {label}
      <input className="h-3 w-3" type={'checkbox'} />
    </label>
  );
}
