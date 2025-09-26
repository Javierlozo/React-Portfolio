"use client";
import React from "react";
import Image, { StaticImageData } from "next/image"; // Import Image and StaticImageData
import querriImage from "../public/pictures/querri.png"; // Import the image
import { useTheme } from "../contexts/ThemeContext";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  position: string;
  image?: string | StaticImageData; // Allow string or StaticImageData
}

export default function Testimonials() {
  const { theme } = useTheme();
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote:
        "Luis at IberiaTech does amazing work. He is a skilled developer and really great to work with.",
      name: "Dave Ingram",
      position: "Querri",
      image: querriImage, // Use the imported image
    },
  ];

  return (
    <section
      id="testimonials"
      className={`py-16 sm:py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="container mx-auto px-3 sm:px-6 max-w-4xl">
        {/* Minimalist Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-thin mb-6 sm:mb-8 pb-2 border-b w-fit mx-auto ${
            theme === 'dark' ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'
          }`}>
            Testimonials
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            What clients and colleagues say about working with me
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`p-8 sm:p-12 border-l ${
                theme === 'dark' 
                  ? 'border-gray-700 bg-transparent' 
                  : 'border-gray-200 bg-transparent'
              }`}
            >
              <div className="flex flex-col md:flex-row items-start gap-6 sm:gap-8">
                {testimonial.image && (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 relative flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={`${testimonial.name}'s picture`}
                      fill
                      className="rounded-full object-cover border border-gray-200 dark:border-gray-700"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <blockquote className={`text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="pt-4">
                    <p className={`font-light text-base sm:text-lg ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {testimonial.name}
                    </p>
                    <p className={`text-xs sm:text-sm font-light ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
