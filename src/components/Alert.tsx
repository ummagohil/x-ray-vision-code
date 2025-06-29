import { AlertProps } from "../types";
import { AlertTriangleIcon, CheckCircleIcon } from "../assets/icons";

export const Alert = ({ message, type }: AlertProps) => {
  let bgColor, textColor, Icon;

  switch (type) {
    case "error":
      bgColor = "bg-red-100";
      textColor = "text-red-700";
      Icon = <AlertTriangleIcon className="h-5 w-5 mr-2" />;
      break;
    case "success":
      bgColor = "bg-green-100";
      textColor = "text-green-700";
      Icon = <CheckCircleIcon className="h-5 w-5 mr-2" />;
      break;
    default: // info
      bgColor = "bg-blue-100";
      textColor = "text-blue-700";
      Icon = <AlertTriangleIcon className="h-5 w-5 mr-2" />;
      break;
  }

  return (
    <div
      className={`${bgColor} ${textColor} p-4 rounded-md flex items-center shadow`}
      role="alert"
    >
      {Icon}
      <span>{message}</span>
    </div>
  );
};
