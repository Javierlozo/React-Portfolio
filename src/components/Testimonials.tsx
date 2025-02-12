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
        "Luis at IberiaTech does amazing work. He is a skilled developer and really great to work with.",
      name: "Dave Ingram",
      position: "Querri",
      image: querriImage, // Use the imported image
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-40 -right-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center text-white mb-16 animate-fade-in">
          Testimonials
        </h3>

        <div className="max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="glass-morphism p-8 rounded-2xl animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                {testimonial.image && (
                  <div className="w-24 h-24 relative flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={`${testimonial.name}'s picture`}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="text-xl text-gray-300 italic mb-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-400">{testimonial.position}</p>
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
