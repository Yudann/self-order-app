import { ChangeEvent } from "react";

interface SearchInputProps {
  onSearchChange: (value: string) => void;
}

export default function SearchInput({ onSearchChange }: SearchInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="w-full px-5">
      <input
        placeholder="Search products...."
        className="w-full p-4 rounded-2xl bg-white ring-primary-green ring-1"
        onChange={handleChange}
      />
    </div>
  );
}
