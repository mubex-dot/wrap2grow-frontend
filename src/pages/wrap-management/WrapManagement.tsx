import { useGetWrapsQuery } from "@/apis/wrapApi";
import LinearProgress from "@/components/LinearProgress";
import PageHeader from "@/components/PageHeader";
import { Progress } from "@/components/ui/progress";
import RegisterWrapModal from "@/components/ui/RegisterWrapModal";
import WrapDetailsModal from "@/components/ui/WrapDetailsModal";
import { Calendar, LocationEdit } from "lucide-react";
import { useState } from "react";

const WrapManagement = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleRegisterWrap = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedWrap, setSelectedWrap] = useState<any | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openDetails = (wrap: any) => {
    setSelectedWrap(wrap);
    setDetailsOpen(true);
  };
  const closeDetails = () => {
    setSelectedWrap(null);
    setDetailsOpen(false);
  };
  const { data: wraps, isLoading } = useGetWrapsQuery();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string");
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div>
      <PageHeader
        header={"Wrap Management"}
        subHeader={"Track and manage your biodegradable wraps"}
        buttonText={"Add New Wrap"}
        handleClick={handleRegisterWrap}
      />
      <RegisterWrapModal open={modalOpen} onClose={handleModalClose} />

      {isLoading && <LinearProgress />}

      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
          {wraps?.data?.map((wrap) => (
            <div
              onClick={() => openDetails(wrap)}
              role="button"
              tabIndex={0}
              className="border-2 border-[#E7E2DA] bg-[#FFFFFF] p-7 rounded-lg flex flex-col gap-3 cursor-pointer hover:shadow-md"
              key={wrap.id}
            >
              <div className="flex justify-between">
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="font-bold capitalize">
                      {wrap.wrap_type.replace("_", " ")}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="flex gap-2 items-center">
                      <LocationEdit /> {wrap.wrap_location}
                    </p>
                    <p className="flex gap-2 items-center">
                      <Calendar /> Added {formatDate(wrap.created_at)}
                    </p>
                  </div>
                </div>
                <div>
                  <div
                    className={`p-2 ${
                      wrap.wrap_status === "active"
                        ? "bg-primary"
                        : wrap.wrap_status === "completed"
                        ? "bg-[#22C35D]"
                        : "bg-[#EE9D2B]"
                    } rounded-full`}
                  >
                    <p className="text-white text-xs capitalize">
                      {wrap.wrap_status}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center w-full">
                  <p>Degradation Progress</p>
                  <p>{wrap.degradation_percentage}%</p>
                </div>
                <Progress value={wrap.degradation_percentage} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <WrapDetailsModal
        open={detailsOpen}
        onClose={closeDetails}
        wrap={selectedWrap}
      />
    </div>
  );
};

export default WrapManagement;
