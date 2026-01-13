import React from "react";
import { X } from "lucide-react";
import type { WrapItem } from "@/types/wrap.types";

interface WrapDetailsModalProps {
  open: boolean;
  onClose: () => void;
  wrap: WrapItem | null;
}

const WrapDetailsModal: React.FC<WrapDetailsModalProps> = ({
  open,
  onClose,
  wrap,
}) => {
  if (!open || !wrap) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F5F5F566] backdrop-blur-sm">
      <div className="bg-background rounded-lg shadow-lg p-6 w-1/3 min-w-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-text-primary">
            Wrap Details
          </h3>
          <button onClick={onClose} className="cursor-pointer">
            <X className="text-text-primary" />
          </button>
        </div>

        <div className="space-y-4 text-sm text-text-primary">
          <div>
            <p className="text-xs text-text-secondary">Type</p>
            <p className="font-medium capitalize">
              {wrap.wrap_type.replace("_", " ")}
            </p>
          </div>

          <div>
            <p className="text-xs text-text-secondary">Location on farmland</p>
            <p className="font-medium">{wrap.wrap_location}</p>
          </div>

          <div>
            <p className="text-xs text-text-secondary">Status</p>
            <p className="font-medium capitalize">{wrap.wrap_status}</p>
          </div>

          <div>
            <p className="text-xs text-text-secondary">Degradation</p>
            <p className="font-medium">{wrap.degradation_percentage}%</p>
          </div>

          <div>
            <p className="text-xs text-text-secondary">Added</p>
            <p className="font-medium">
              {new Date(wrap.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-[#E7E2DA] text-text-primary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default WrapDetailsModal;
