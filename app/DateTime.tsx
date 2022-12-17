import React, { useEffect, useState } from "react";

type DateTimePropsType = {
  locale?: string;
  hour12?: boolean;
};

const DateTime = ({
  locale = "en-US",
  hour12 = false,
}: DateTimePropsType): JSX.Element => {
  const [hourFormatted, setHourFormatted] = useState<string>(() =>
    new Date().toLocaleTimeString(locale, {
      hour: "numeric",
      minute: "numeric",
      hour12,
    })
  );

  const [dateFormatted, setDateFormatted] = useState<string>(() =>
    new Date().toLocaleDateString(locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
  );

  useEffect(() => {
    const updateTimeInterval = setInterval(() => {
      const date = new Date();

      setHourFormatted(() =>
        date.toLocaleTimeString(locale, {
          hour: "numeric",
          minute: "numeric",
          hour12,
        })
      );

      setDateFormatted(() =>
        date.toLocaleDateString(locale, {
          weekday: "long",
          day: "numeric",
          month: "long",
        })
      );
    }, 1000);

    return () => clearInterval(updateTimeInterval);
  }, []);

  return (
    <div className="flex flex-col items-center w-screen text-dark dark:text-light">
      <div className="mt-16 font-semibold text-8xl">
        <h1 className="relative">
          {hourFormatted.slice(0, 5)}
          {hour12 && (
            <span className="absolute bottom-0 text-xl font-normal -right-6">
              {hourFormatted.slice(6, 8)}
            </span>
          )}
        </h1>
      </div>
      <div className="mt-3 text-xl">{dateFormatted}</div>
    </div>
  );
};

export default DateTime;
