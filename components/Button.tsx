import { JSX } from "preact";

type ButtonProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  children: preact.ComponentChildren;
};

export default function Button({ children, class: className = "", ...rest }: ButtonProps) {
  return (
    <button
      class={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition duration-150 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}