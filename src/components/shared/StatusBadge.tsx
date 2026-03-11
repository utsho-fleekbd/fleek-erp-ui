import { cn } from "@/lib/utils";
import { type OrderStatus, statusColors } from "@/lib/mock-data";

interface StatusBadgeProps {
  status: OrderStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-[11px] font-medium capitalize border",
        statusColors[status],
      )}
    >
      {status}
    </span>
  );
}
