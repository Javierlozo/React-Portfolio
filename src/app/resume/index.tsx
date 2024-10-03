import React from "react";

const ResumePage = () => {
  return (
    <div className="mt-24 p-5">
      <h3 className="text-2xl font-bold mb-4 text-center text-teal-600">
        My Resume
      </h3>
      <div className="flex justify-center">
        <iframe
          src="/resume/Resume.pdf"
          width="100%"
          height="600px"
          className="shadow-lg border border-gray-300"
        />
      </div>
    </div>
  );
};

export default ResumePage;
