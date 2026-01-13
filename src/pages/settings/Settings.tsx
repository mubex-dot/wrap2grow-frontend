import CustomTextField from "@/components/inputs/CustomTextField";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/pages/auth/authSlice";
import { Check } from "lucide-react";
import { useEditUserMutation } from "@/pages/auth/userApiSlice";
import { accountSchema, type AccountSchema } from "./schema";
import PageHeader from "@/components/PageHeader";

const Settings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccountSchema>({ resolver: zodResolver(accountSchema) });

  const [editUser] = useEditUserMutation();

  const { showToast } = useToast();
  const currentUser = useSelector(selectCurrentUser);

  const onSubmit: SubmitHandler<AccountSchema> = async (data) => {
    try {
      await editUser(data).unwrap();
      console.log(data);
      showToast("Profile updated successfully", "success");
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast("Something went wrong", "error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div>
          <PageHeader
            header={"Settings"}
            subHeader={"Update your profile settings here"}
          />
        </div>
        <div className="my-4 w-full bg-[#FFFFFF] rounded-lg p-6 border border-[#E7E2DA]">
          <div>
            <div>
              <CustomTextField
                label="Email Address"
                placeholder="Type your email here"
                register={register("email")}
                errorMessage={errors.email}
                defaultValue={currentUser?.email}
                type="email"
                // className="my-3"
              />

              <CustomTextField
                label="Username"
                placeholder="Type your username name here"
                register={register("username")}
                errorMessage={errors.username}
                defaultValue={currentUser?.username}
                className="my-3"
              />

              <CustomTextField
                label="Farm Location"
                placeholder="Type your farm location here"
                register={register("farm_location")}
                errorMessage={errors.farm_location}
                defaultValue={currentUser?.farm_location}
                className="my-3"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                className="mt-2 w-full"
                type="submit"
                variant={"default"}
                size={"default"}
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                <Check /> Save Changes
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
