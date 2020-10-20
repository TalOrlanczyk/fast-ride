import React from "react";

const ExplainCard = ({img,imgAlt,content,cardClassName}) => {
  return (
    <div className={`ticket-explain-container text-center ${cardClassName ? cardClassName: ""}`}>
      <img
        className="border-radius-max p-3 img-bg image-small"
        src={img}
        alt={imgAlt}
      />
      <p className="text-grayish">
        {content}
      </p>
    </div>
  );
};
export default ExplainCard;
