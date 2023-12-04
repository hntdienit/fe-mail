import React from "react";
import Image from "next/image";
import { envLib } from "@/libs/env";

type Props = {
  attachmentData: {
    email_id: string;
    filename: string;
    id: string;
    url: string;
  };
  detailPage?: boolean;
};

const AttachmentCard: React.FC<Props> = async ({ attachmentData, detailPage = false }) => {
  let imageAttachment = envLib.imageAttachment.pdf;
  if (attachmentData.url.includes(".xml")) {
    imageAttachment = envLib.imageAttachment.xml;
  }

  return (
    <>
      <div>
        {detailPage ? (
          <div className="w-full h-36 border-2 border-gray-400 rounded-xl">
            <div className="w-full h-4/6 rounded-xl flex items-stretch md:items-center place-content-center">
              {/* <img id=":o0" className="aSM" src="//ssl.gstatic.com/docs/doclist/images/mediatype/icon_1_text_x16.png" title="XML"> */}
              <Image src={imageAttachment} width={20} height={20} alt="123" />
            </div>
            <div className="w-full h-2/6 bg-gray-200 rounded-xl flex items-stretch md:items-center place-content-center">
              <Image className="inline-block" src={imageAttachment} width={20} height={20} alt="123" />
              <span className="pl-2">{attachmentData.filename.substring(0, 12)}...</span>
            </div>
          </div>
        ) : (
          <div className="flex rounded-full max-w-fit border-2 border-neutral-400 p-2 px-8">
            <Image src={imageAttachment} width={20} height={20} alt="123" />
            <p className="pl-3">
              {attachmentData.filename.substring(0, 15)}
              {attachmentData.filename.length > 15 ? "..." : ""}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default AttachmentCard;
