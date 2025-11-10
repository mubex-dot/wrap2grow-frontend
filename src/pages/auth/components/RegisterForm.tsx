import CustomTextField from "@/components/inputs/CustomTextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "./schema";
import { Button } from "@/components/ui/button";
import CustomTextArea from "@/components/inputs/CustomTextArea";
import { useRegisterMutation } from "@/app/authApiSlice";
import { useToast } from "@/context/ToastContext";

const evaluatePasswordStrength = (password: string) => {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  const strengthLevels = ["Weak", "Fair", "Good", "Strong"];
  return {
    score,
    label: strengthLevels[score] || "Very Weak",
    color: [
      "text-red-500",
      "text-orange-500",
      "text-yellow-500",
      "text-green-500",
    ][score],
  };
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

  const password = watch("password", "");
  const { label, color } = evaluatePasswordStrength(password);
  const [registerUser] = useRegisterMutation();

  const { showToast } = useToast();

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    try {
      await registerUser(data).unwrap();
      showToast("Registration Successful! Please login.", "success");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      showToast("Something went wrong! Please try again.", "error");
    }
  };

  return (
    <div className="h-full w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md py-4">
        <div className="flex flex-col gap-1">
          <CustomTextField
            label="Company Name"
            placeholder="Enter Company Name"
            register={register("company_name")}
            errorMessage={errors.company_name}
            className="my-2"
          />

          <CustomTextField
            label="Physical Address"
            placeholder="Enter Company Address"
            register={register("address")}
            errorMessage={errors.address}
            className="my-2"
          />

          <CustomTextField
            label="Email Address"
            placeholder="Enter Email Address"
            type="email"
            register={register("username")}
            errorMessage={errors.username}
            className="my-2"
          />

          <CustomTextField
            label="Password"
            placeholder="Enter Password"
            type="password"
            register={register("password")}
            errorMessage={errors.password}
            checkPassword
            className="my-2"
          />

          <CustomTextField
            label="Confirm Password"
            placeholder="Confirm Password"
            type="password"
            register={register("confirm_password")}
            errorMessage={errors.confirm_password}
            checkPassword
            className="my-2"
          />

          <CustomTextArea
            label="Description"
            placeholder="Description"
            register={register("description")}
            errorMessage={errors.description}
            className="my-2"
          />

          {password && (
            <div className={`text-sm mt-1 font-semibold ${color}`}>
              Password Strength: {label}
            </div>
          )}

          <Button
            className="mt-2 w-full"
            type="submit"
            variant={"default"}
            size={"default"}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
