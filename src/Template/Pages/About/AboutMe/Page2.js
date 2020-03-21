import React from "react";

const TextContent = [
  {
    title: "HOW IT WORKS",
    description: "Browse interesting posts, accounts, and topics.",
    subDescription:
      "Search & Explore offers you fresh content based on people you follow and posts you like."
  },
  {
    title: "TOPIC CHANNELS",
    description: "See more of what interests you.",
    subDescription:
      "If you want to see more of a topic you like, browse categories based on posts you've engaged with in the past."
  },
  {
    title: "DYNAMIC GRID",
    description: "Discover something new.",
    subDescription:
      "Simply refresh the Explore page to see an entirely new set of photos and videos, all curated based on your interests."
  }
];

const Page2 = () => {
  const PageItem = ({ title = "", description = "", subDescription = "" }) => (
    <div className="_8h2u _8jt3">
      <div className="_8f30">
        <div className="_8f0s">
          <div className="_8h2w" />
        </div>
        <div className="_8f0s _8knk _8f0z">
          <div className="_8g8k _8g8o _8g8t _8g90 _8g95">
            <div className="_8g87 _8g88 _8g5_ _8hkw _8hk-">
              <div id="u_0_d" style={{ opacity: 1 }}>
                <div className="_8g86 _8g7y _8g80">
                  <p className="_8g86 _8kjd _8iq5 _8ird">{title}</p>
                  <h2 className="_8iq3 _8g86 _8kjd _8iq7">{description}</h2>
                  <p className="_8g86 _8iq8 _8ipi">{subDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-2">
      {TextContent.map((item, idx) => (
        <PageItem key={idx} {...item} />
      ))}
    </div>
  );
};

export default Page2;
