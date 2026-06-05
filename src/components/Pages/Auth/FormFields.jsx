import { Input } from "@/components/UI";
import SelectField from "./SelectField";
import PasswordField from "./PasswordField";

const FormFields = ({
  field,
  value,
  error,
  onChange,
  showPassword,
  togglePassword,
}) => {
  const renderField = () => {
    switch (field.type) {
      case "select":
        return (
          <SelectField
            field={field}
            value={value}
            onChange={onChange}
          />
        );

      case "password":
        return (
          <PasswordField
            field={field}
            value={value}
            onChange={onChange}
            visible={showPassword}
            onToggle={togglePassword}
          />
        );

      default:
        return (
          <Input
            type={field.type}
            name={field.name}
            value={value}
            onChange={onChange}
            placeholder={field.placeholder}
            className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        );
    }
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {field.label}
      </label>

      {renderField()}

      {error && (
        <p className="mt-1 pl-1 text-sm font-medium text-red-500">
          *{error}
        </p>
      )}
    </div>
  );
};

export default FormFields;