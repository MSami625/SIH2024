import React, { useState } from 'react';

function FAQ() {
  
  const [openItems, setOpenItems] = useState(Array(4).fill(false));

  const faqData = [
    {
      question: 'What is Flowbite?',
      answer:
        'Flowbite is an open-source library of interactive components built Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque, dolorem?',
    },
    {
      question: 'How do I use Flowbite?',
      answer:
        'To use Flowbite, simply install it via npm or yarn and import the components you need into your project.',
    },
    {
      question: 'Is Flowbite free?',
      answer:
        'Yes, Flowbite is free and open-source. You can use it for personal and commercial projects.',
    },
    {
      question: 'Can I customize Flowbite?',
      answer:
        'Yes, you can customize Flowbite by overriding the default styles with your own CSS or Tailwind classes.',
    },
  ];

 
  const toggleAccordion = (index) => {
    setOpenItems((prev) =>
      prev.map((item, i) => (i === index ? !item : item))
    );
  };

  return (
    <div className="bg-white py-60 flex flex-row items-start justify-start">
      <div className="flex flex-col justify-center items-start px-[8vw] gap-10 pb-20">
        <div className="px-4 py-2 text-xs font-bold bg-[#2F2B36] tracking-widest text-white border-2 rounded-tr-xl">
          FAQ
        </div>
        <p className="text-4xl text-black font-semibold">Your questions, answered</p>
      </div>

      <div id="accordion-flush" className="text-center ">
        <h4 className="font-bold mb-[16px] mt-[-50px]">Frequently asked questions</h4>

        {faqData.map((item, index) => (
          <div key={index}>
            <h2 id={`accordion-flush-heading-${index}`}>
              <button
                type="button"
                className="flex w-[300px] items-center justify-between py-5 font-medium border-b border-gray-200  text-black gap-3"
                onClick={() => toggleAccordion(index)}
                aria-expanded={openItems[index]}
                aria-controls={`accordion-flush-body-${index}`}
              >
                <span>{item.question}</span>
                <svg
                  data-accordion-icon
                  className={`w-3 h-3 transform ${openItems[index] ? 'rotate-180' : ''} shrink-0`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5L5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id={`accordion-flush-body-${index}`}
              className={`${openItems[index] ? 'block' : 'hidden'} w-[300px] transition-all duration-300 ease-in-out`}
              aria-labelledby={`accordion-flush-heading-${index}`}
            >
              <div className="py-5 text-left border-b border-gray-200 ">
                <p className="mb-2 text-sm text-black ">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
