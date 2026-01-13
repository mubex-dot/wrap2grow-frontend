import CustomTextField from "@/components/inputs/CustomTextField";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "./schema";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/app/authApiSlice";
import { useDispatch } from "react-redux";
import { login } from "../authSlice";
import { useToast } from "@/context/ToastContext";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const { showToast } = useToast();

  const dispatch = useDispatch();

  const [loginRequest] = useLoginMutation();

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      const userData = await loginRequest(data).unwrap();
      dispatch(login(userData));
      showToast("Login successful", "success");
      // navigate("/lesson-plans");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.status === 401 || error.status === 404) {
        // alert("Incorrect username or passsord");
        // showToast("Incorrect username or passsord", "error");
        showToast(error.data.message, "error");
      } else {
        // alert("something went wrong");
        showToast("something went wrong", "error");
      }
    }
  };

  return (
    <div className="h-full w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md py-4">
        <div className="flex flex-col gap-1">
          <CustomTextField
            label="Username"
            placeholder="Enter your Username"
            register={register("username")}
            errorMessage={errors.username}
            className="my-2"
          />

          <CustomTextField
            label="Password"
            placeholder="•••••••••"
            type="password"
            register={register("password")}
            errorMessage={errors.password}
            checkPassword
            className="my-2"
          />

          <Button
            className="mt-2 w-full"
            type="submit"
            variant={"default"}
            size={"default"}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Log in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
