import { Input } from "@/components/UI";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const PasswordField = ({ field, value, onChange, visible, onToggle }) => {
  return (
    <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        name={field.name}
        value={value}
        onChange={onChange}
        placeholder={field.placeholder}
        className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 pr-14 text-sm outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
      />

      <button
        type="button"
        onClick={onToggle}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-300 hover:text-emerald-500"
      >
        {visible ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
      </button>
    </div>
  );
};

export default PasswordField;
