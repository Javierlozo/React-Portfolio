"use client";
import React from "react";
import Image, { StaticImageData } from "next/image"; // Import Image and StaticImageData
import querriImage from "../public/pictures/querri.png"; // Import the image

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  position: string;
  image?: string | StaticImageData; // Allow string or StaticImageData
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote:
        "Luis at IberiaTech does amazing work. He's a skilled developer and really great to work with.",
      name: "Dave Ingram",
      position: "Querri",
      image: querriImage, // Use the imported image
    },
  ];

  return (
    <section id="testimonials" className="py-10 bg-gray-100 dark:bg-gray-800">
      <h3 className="text-3xl text-center dark:text-white">Testimonials</h3>
      <div className="max-w-4xl mx-auto mt-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="mb-6 flex items-center">
            {testimonial.image && (
              <Image
                src={testimonial.image} // Use Image component
                alt={`${testimonial.name}'s picture`}
                width={64} // Specify width
                height={64} // Specify height
                className="rounded-full mr-4" // Optional: add Tailwind classes for styling
              />
            )}
            <div>
              <p className="text-xl text-gray-700 dark:text-gray-300 italic">
                {testimonial.quote}
              </p>
              <p className="text-gray-900 dark:text-gray-100 mt-2 font-semibold">
                - {testimonial.name}, {testimonial.position}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
