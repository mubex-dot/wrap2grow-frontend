import React from "react";
import { X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@/context/ToastContext";
import CustomSelect from "../inputs/CustomSelect";
import { Button } from "./button";
import {
  addWrapSchema,
  type AddWrapSchema,
} from "@/pages/wrap-management/schema";
import CustomTextField from "../inputs/CustomTextField";
import { useAddWrapsMutation } from "@/apis/wrapApi";

interface AddWrapModalProps {
  open: boolean;
  onClose: () => void;
}

const AddWrapModal: React.FC<AddWrapModalProps> = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddWrapSchema>({
    resolver: zodResolver(addWrapSchema),
  });

  const { showToast } = useToast();
  const [registerWrap] = useAddWrapsMutation();

  const onSubmit: SubmitHandler<AddWrapSchema> = async (data) => {
    try {
      await registerWrap(data).unwrap();
      showToast("Wrap registered successfully", "success");
      onClose();
    } catch (error) {
      console.error("Error registering wrap: ", error);
      showToast("Something went wrong", "error");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F5F5F566] backdrop-blur-sm ">
      <div className="bg-background rounded-lg shadow-lg p-6 w-1/4 min-w-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-text-primary">
            Add New Wrap
          </h3>
          <button onClick={onClose} className="cursor-pointer">
            <X className="text-text-primary" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md py-4"
        >
          <div>
            <div>
              <CustomSelect
                label="Wrap Type"
                register={register("wrap_type")}
                errorMessage={errors.wrap_type}
                className="my-2"
                options={
                  [
                    { name: "Wrap A", value: "wrap_a" },
                    { name: "Wrap B", value: "wrap_b" },
                  ].map((area) => ({
                    name: area.name,
                    value: area.value,
                  })) || []
                }
                // disabled={isFetchingAreas}
              />

              <CustomTextField
                label="Location"
                placeholder="Type location on farmland here"
                register={register("wrap_location")}
                errorMessage={errors.wrap_location}
                className="my-2"
              />

              <CustomSelect
                label="Initial status"
                register={register("wrap_status")}
                errorMessage={errors.wrap_status}
                className="my-2"
                options={
                  [
                    { name: "Active", value: "active" },
                    { name: "Degrading", value: "degrading" },
                    { name: "Completed", value: "completed" },
                  ].map((area) => ({
                    name: area.name,
                    value: area.value,
                  })) || []
                }
                // disabled={isFetchingAreas}
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
                Register wrap
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWrapModal;
