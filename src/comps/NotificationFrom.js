import React from "react";

const NotificationFrom = ({ from, image, message }) => {
  return (
    <div
      className="w-full max-w-xs rounded-lg bg-white p-4 text-gray-900 shadow dark:bg-gray-800 dark:text-gray-300"
      role="alert"
    >
      <div className="mb-3 flex items-center">
        <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
          New Notification
        </span>
      </div>
      <div className="flex items-center">
        <div className="relative inline-block shrink-0">
          <img className="h-12 w-12 rounded-full" src={image} alt="" />
        </div>
        <div className="ml-3 text-sm font-normal">
          <div className="text-sm font-semibold text-gray-900 dark:text-white">
            {from}
          </div>
          <div className="text-sm font-normal">{message}</div>
          <span className="text-xs font-medium text-blue-600 dark:text-blue-500">
            a few seconds ago
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotificationFrom;
