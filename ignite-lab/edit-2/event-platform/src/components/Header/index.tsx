import { Logo } from "../Icons/Logo";

export function Header() {
  return (
    <div className="py-5 flex items-center justify-center h-16 w-full bg-gray-700 border-b border-gray-600">
      <Logo />
    </div>
  );
}
