import { useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Vikas Mourya",
    role: "Teacher, TIAT",
    image: "/assets/vikas.jpeg",
    content:
      "Auto CRM has transformed the way we manage our customer relationships. The automation features save us hours every week—absolutely essential for our team!",
    isSocialMedia: true,
  },
  {
    name: "Mayank Padwal",
    role: "HOD, Thakur College of Engineering and Technology",
    image: "/assets/mayank.jpg",
    content:
      "This is my application so I'll only say good things about it. It's the piece of crap. Although it took me so much time and energy to build. I'm proud of it.",
    isSocialMedia: false,
  },
  {
    name: "Sanjeev Kansyakar",
    role: "Teacher, Harvard",
    image: "/assets/sanjeev.jpg",
    content:
      "Auto CRM has transformed the way we manage our customer relationships. The automation features save us hours every week—absolutely essential for our team!",
    isSocialMedia: true,
  },
  {
    name: "Steve Fernandes",
    role: "Teacher, TIA",
    image: "/assets/mayank.jpg",
    content:
      "This is my application so I'll only say good things about it. It's the piece of crap. Although it took me so much time and energy to build. I'm proud of it.",
    isSocialMedia: false,
  },
  {
    name: "Rahul Singh",
    role: "HOD, TSDC",
    image: "/assets/rahul.jpg",
    content:
      "Auto CRM has transformed the way we manage our customer relationships. The automation features save us hours every week—absolutely essential for our team!",
    isSocialMedia: true,
  },
  {
    name: "Aniket Thakur",
    role: "Front-End developer, Bullshire",
    image:
      "https://res.cloudinary.com/dcn9t5qfr/image/upload/v1725278617/gdgiri_izimrm.jpg",
    content:
      "This is my application so I'll only say good things about it. It's the piece of crap. Although it took me so much time and energy to build. I'm proud of it.",
    isSocialMedia: false,
  },
  {
    name: "Arvind Gupta",
    role: "Manager, Thakur College of Engineering",
    image: "/assets/arvind.jpg",
    content:
      "Auto CRM has transformed the way we manage our customer relationships. The automation features save us hours every week—absolutely essential for our team!",
    isSocialMedia: true,
  },
];

export default function TestimonialGrid() {
  const containerRef = useRef(null);
  const containerRef2 = useRef(null);
  const containerRef3 = useRef(null);

  const createScrollEffect = (ref, direction, speed) => {
    useEffect(() => {
      const container = ref.current;
      if (!container) return;

      let animationFrameId;
      let scrollPos = direction === "up" ? 0 : -container.scrollHeight / 2;

      const scroll = () => {
        scrollPos += direction === "up" ? -speed : speed;
        if (Math.abs(scrollPos) >= container.scrollHeight / 2) {
          scrollPos = direction === "up" ? 0 : -container.scrollHeight / 2 + 1;
        }
        container.style.transform = `translateY(${scrollPos}px)`;
        animationFrameId = requestAnimationFrame(scroll);
      };

      animationFrameId = requestAnimationFrame(scroll);

      return () => cancelAnimationFrame(animationFrameId);
    }, []);
  };

  // Adding the effect to reset the grid every 10 seconds
  useEffect(() => {
    const resetGridInterval = setInterval(() => {
      // Reset the scroll positions by setting their transform to the initial state
      [containerRef, containerRef2, containerRef3].forEach((ref) => {
        const container = ref.current;
        if (container) {
          container.style.transform = "translateY(0)";
        }
      });
    }, 10000); // 10 seconds

    return () => clearInterval(resetGridInterval);
  }, []);

  createScrollEffect(containerRef, "up", 1);
  createScrollEffect(containerRef2, "down", 1);
  createScrollEffect(containerRef3, "up", 1);

  const TestimonialCard = ({ testimonial, isAlternate }) => (
    <div className={`mb-4 rounded-lg shadow-lg ${isAlternate ? 'bg-[#cfe0ec]' : 'bg-white'}`}>
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <img src={testimonial.image} alt={testimonial.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{testimonial.name}</p>
            <p className="text-sm text-gray-600">{testimonial.role}</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-700">{testimonial.content}</p>
      </div>
    </div>
  );

  return (
    <div className="relative grid grid-cols-1 h-screen md:grid-cols-3 gap-4 overflow-hidden p-4">
      {[containerRef, containerRef2, containerRef3].map((ref, index) => (
        <div key={index} className={`relative overflow-hidden ${index === 1 ? 'md:block hidden' : 'md:block'}`}>
          <div className="absolute inset-x-0 top-0 h-40 pointer-events-none bg-gradient-to-b from-white via-white/80 to-transparent z-[2]" />
          <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-white via-white/80 to-transparent z-[2]" />
          <div ref={ref} className="space-y-4">
            {[...testimonials, ...testimonials, ...testimonials].map((testimonial, i) => (
              <TestimonialCard key={`${index}-${i}`} testimonial={testimonial} isAlternate={i % 2 === 0} />
            ))}
          </div>
        </div>
      ))}
      <div className="absolute inset-0 pointer-events-none [background-image:linear-gradient(to_bottom,rgba(255,255,255,0.9)_0%,transparent_15%,transparent_85%,rgba(255,255,255,0.9)_100%)] z-[5]" />
    </div>
  );
}
