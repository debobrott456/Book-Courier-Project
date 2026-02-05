import { useState } from "react";
import "./faq.css";
const faqData = [
  {
    question: "How long does it take to deliver my books?",
    answer:
      "For local orders, we usually deliver within 24-48 hours. Nationwide shipping typically takes 3-5 business days depending on your location.",
  },
  {
    question: "Do you offer Cash on Delivery (COD)?",
    answer:
      "Yes, we offer Cash on Delivery for most locations. You can also pay upfront via secure online payment methods like Credit/Debit cards or mobile banking.",
  },
  {
    question: "Are the books new or used?",
    answer:
      "We primarily sell brand-new books. However, we have a specific 'Pre-loved' section for high-quality used books, which is clearly marked on the product page.",
  },
  {
    question: "What is your return and refund policy?",
    answer:
      "If you receive a damaged book or the wrong title, you can request a return within 7 days of delivery for a full refund or exchange.",
  },
  {
    question: "Can I track my book courier in real-time?",
    answer:
      "Absolutely! Once your order is dispatched, you will receive a tracking ID via SMS and email to monitor your package's journey.",
  },

];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container ">
     <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Frequently Asked <span className="text-[#d34e2d]">Question</span>
                    </h2>

      {faqData.map((item, index) => (
        <div className="faq-item " key={index}>
          <button className="faq-question" onClick={() => toggleFAQ(index)}>
            <span>{item.question}</span>
            <span className="faq-icon">
              {activeIndex === index ? "-" : "+"}
            </span>
          </button>

          {activeIndex === index && (
            <div className="faq-answer">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
