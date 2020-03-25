import React from "react";
import { Image } from "cloudinary-react";
import classNames from "classnames";
import Paragraph from "./Paragraph";

const AboutItem = ({
  imageId = "",
  title = "",
  description = "",
  directText = "",
  href = "",
  alignImage = false
}) => {
  const classA3c = classNames("a3c", { "a3c-reverse": alignImage });
  const classA3t1 = classNames("a3t1", { a3t10: alignImage });

  return (
    <div className="a3">
      <div className={classA3c}>
        <div className="a3img">
          <Image publicId={imageId} className="a3img" />
        </div>
        <div className="a3t0">
          <div className={classA3t1}>
            <div className="a3t2">
              <div className="a3t3">
                <Paragraph
                  title={title}
                  description={description}
                  directText={directText}
                  href={href}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutItem;
