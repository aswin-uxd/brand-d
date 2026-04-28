import Script from 'next/script';

interface AEOAnswerBlockProps {
  question: string;
  answer: string;
  listItems?: string[];
  id?: string;
}

export default function AEOAnswerBlock({ question, answer, listItems, id }: AEOAnswerBlockProps) {
  // Generate JSON-LD for Answer Engine Optimization (Perplexity, ChatGPT, Google SGE)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": answer + (listItems ? `<ul>${listItems.map(i => `<li>${i}</li>`).join('')}</ul>` : '')
      }
    }]
  };

  return (
    <div className="aeo-block my-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900" id={id}>
      <Script
        id={`json-ld-faq-${id || Math.random().toString(36).substring(7)}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 
        AEO semantic structure: 
        Must use strict heading hierarchy and bolding of entities for AI parsing.
      */}
      <h3 className="mb-4 text-xl font-bold tracking-tight text-black dark:text-white md:text-2xl">
        {question}
      </h3>
      
      <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
        {answer}
      </p>

      {listItems && listItems.length > 0 && (
        <ul className="space-y-2 pl-4 text-gray-700 dark:text-gray-300">
          {listItems.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 mt-1 text-black dark:text-white">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
