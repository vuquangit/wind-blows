import React, { useEffect, useState } from "react";
import { message } from "antd";
import { uuid } from "utils/uuid";

import { toBase64 } from "utils/toBase64";

// const

const AddImage = ({
  totalFilesSelected = 0,
  handleAddDataImages = () => {},
  handleUpdateImages = () => {}
}) => {
  const [data, setData] = useState(null);
  const fetchUploadImage = async e => {
    e.preventDefault();

    const filesSeleted = Array.from(e.target.files);
    if (totalFilesSelected + filesSeleted.length > 9) {
      message.warning({
        content: "You can only upload a maximum of 9 files",
        duration: 5
      });
      e.preventDefault();
      return; // exit upload
    }

    const items = await Promise.all(
      filesSeleted.map(async item => {
        const uuidFile = await uuid();
        await handleAddDataImages({
          uuidFile,
          isConverted: false,
          isUploaded: false
        });
        return { info: item, uuidFile };
      })
    );

    await Promise.all(
      items.map(async file => {
        const { base64 = "", type = "" } = await toBase64(file.info);
        const image = {
          name: file.info.name,
          type,
          base64,
          uuidFile: file.uuidFile,
          isConverted: true
        };

        // handleUpdateImages(image);
        setData(image);
      })
    );
  };

  useEffect(() => {
    if (data) {
      handleUpdateImages(data);
    }
  }, [data, handleUpdateImages]);

  return (
    <div className="add-image">
      <span className="_kkr">
        <div className="_m _6a">
          <div className="__9u __9t" rel="ignore">
            <div className="_3jk">
              <input
                accept="image/*, image/heic, image/heif"
                multiple
                name="composer_photo"
                title="Select images to upload"
                data-testid="add-more-photos"
                display="inline-block"
                type="file"
                className="_n _5f0v"
                id="js_e9p"
                onChange={fetchUploadImage}
              />
            </div>
          </div>
        </div>
      </span>
    </div>
  );
};

export default AddImage;
