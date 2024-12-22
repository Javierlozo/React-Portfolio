"use client";
import React from "react";

export default function Experience() {
  return (
    <section
      id="experience"
      className="bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-20 px-4"
    >
      {/* Section Header */}
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold dark:text-gray-100">
          Experience
        </h2>
        <p className="text-md md:text-lg lg:text-xl mt-5 dark:text-gray-400 max-w-3xl mx-auto">
          I have had the privilege of collaborating with a variety of
          organizations, where I have developed scalable applications, mentored
          teams, and optimized cloud-based solutions.
        </p>
      </div>

      {/* Content Cards */}
      <div className="mt-10 space-y-8 max-w-6xl mx-auto">
        {/* ======================= GDNA ======================= */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 text-left">
          <h3 className="text-xl font-bold text-teal-600">
            Global Digital Needs Agency (GDNA) &ndash; Charleston, SC
          </h3>
          <p className="text-gray-600 dark:text-gray-300 italic">
            Software Engineer (Contract) | April 2024 – Present
          </p>
          <ul className="list-disc pl-5 mt-2 text-gray-600 dark:text-gray-300">
            <li>
              Lead the development of React-based front-end applications,
              improving performance and responsiveness to boost user experience
              metrics.
            </li>
            <li>
              Optimize cloud delivery with AWS services (Amplify, Lambda, S3,
              CloudFront), increasing deployment efficiency by 20%.
            </li>
            <li>
              Mentor junior developers on React and Next.js best practices,
              improving team productivity and code quality consistency.
            </li>
            <li>
              Collaborate with backend teams to streamline API integrations,
              ensuring seamless data flow and functionality.
            </li>
            <li>
              Leverage GitHub Copilot to accelerate feature development,
              reducing delivery times by 15%.
            </li>
          </ul>
        </div>

        {/* ======================= Querri ======================= */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 text-left">
          <h3 className="text-xl font-bold text-teal-600">
            Querri &ndash; Charleston, SC
          </h3>
          <p className="text-gray-600 dark:text-gray-300 italic">
            Software Engineer (Contract) | August 2023 – April 2024 (9 months)
          </p>
          <ul className="list-disc pl-5 mt-2 text-gray-600 dark:text-gray-300">
            <li>
              Designed and implemented responsive web applications using Svelte
              to improve performance and user engagement.
            </li>
            <li>
              Integrated FusionAuth for secure authentication, enhancing
              application security and user confidence.
            </li>
            <li>
              Developed a custom HubSpot-based website with extended
              functionality through custom code, aligning with client
              expectations.
            </li>
          </ul>
        </div>

        {/* ================== Upstate Nutrition ================== */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 text-left">
          <h3 className="text-xl font-bold text-teal-600">
            Upstate Nutrition Consultants, Inc &ndash; Greenville, SC
          </h3>
          <p className="text-gray-600 dark:text-gray-300 italic">
            Web Developer (Contract) | July 2023 – August 2023 (2 months)
          </p>
          <ul className="list-disc pl-5 mt-2 text-gray-600 dark:text-gray-300">
            <li>
              Created and maintained web pages to improve user experience and
              engagement.
            </li>
            <li>
              Implemented new features and functionalities to meet business
              requirements and enhance overall performance.
            </li>
            <li>
              Worked closely with the CEO to design and launch a cohesive web
              platform, advancing her vision while enhancing brand consistency
              and meeting key business objectives.
            </li>
          </ul>
        </div>

        {/* ================= Interloop Technologies =============== */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 text-left">
          <h3 className="text-xl font-bold text-teal-600">
            Interloop Technologies, Inc &ndash; Charleston, SC
          </h3>
          <div className="mt-2">
            <p className="text-gray-600 dark:text-gray-300 italic">
              Software Engineer II | November 2022 – June 2023 (8 months)
            </p>
            <ul className="list-disc pl-5 mt-1 text-gray-600 dark:text-gray-300">
              <li>
                Led multiple high-impact projects using Angular, NestJS, and
                MongoDB, improving scalability and efficiency.
              </li>
              <li>
                Created and managed Azure Functions to automate processes,
                reducing operational costs for clients.
              </li>
              <li>
                Mentored junior developers through code reviews and pair
                programming, increasing their productivity and onboarding
                efficiency.
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <p className="text-gray-600 dark:text-gray-300 italic">
              Software Engineer I | July 2021 – November 2022 (1 year, 4 months)
            </p>
            <ul className="list-disc pl-5 mt-1 text-gray-600 dark:text-gray-300">
              <li>
                Developed custom Chrome extensions integrated with CRM tools via
                RESTful APIs and OAuth2.0.
              </li>
              <li>
                Improved application reliability by implementing test plans and
                automation using Cypress, optimizing testing speed and accuracy.
              </li>
            </ul>
          </div>
        </div>

        {/* ================== Coastal Millwork ===================== */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 text-left">
          <h3 className="text-xl font-bold text-teal-600">
            Coastal Millwork and Supply, LLC &ndash; Summerville, SC
          </h3>
          <p className="text-gray-600 dark:text-gray-300 italic">
            Various Roles | September 2015 – June 2021 (5 years, 9 months)
          </p>
          <ul className="list-disc pl-5 mt-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>Business Developer / Estimator:</strong> Managed 6–8 bid
              proposals per week for commercial millwork projects, ensuring
              accurate cost data, material listings, and labor estimates under
              tight deadlines.
            </li>
            <li>
              <strong>Project Design Engineer:</strong> Led the design and
              execution of 30+ high-end commercial architectural projects,
              including Mt. Pleasant Town Hall, Volvo Manufacturing, and Google
              Charleston Office.
            </li>
            <li>
              <strong>Field Project Manager:</strong> Supervised the
              installation of 5 large millwork projects, ensuring on-time
              delivery and adherence to client specifications and budget goals.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
