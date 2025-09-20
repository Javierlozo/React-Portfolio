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
      className={`py-24 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Minimalist Section Header */}
        <div className="text-center mb-20">
          <h2 className={`text-3xl sm:text-4xl font-light tracking-tight mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Testimonials
          </h2>
          <div className={`w-16 h-px mx-auto mb-6 ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
          }`}></div>
          <p className={`text-lg max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            What clients and colleagues say about working with me
          </p>
        </div>

        <div className="space-y-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`p-8 border-l-4 ${
                theme === 'dark' 
                  ? 'border-gray-600 bg-gray-800/30' 
                  : 'border-gray-300 bg-white'
              }`}
            >
              <div className="flex flex-col md:flex-row items-start gap-6">
                {testimonial.image && (
                  <div className="w-16 h-16 relative flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={`${testimonial.name}'s picture`}
                      fill
                      className="rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <blockquote className={`text-lg leading-relaxed mb-6 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <p className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {testimonial.name}
                    </p>
                    <p className={`text-sm ${
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
