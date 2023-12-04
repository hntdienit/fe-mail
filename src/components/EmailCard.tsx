import Link from "next/link";
import React from "react";
import { requestHasura } from "@/services/request";
import AttachmentCard from "./AttachmentCard";

type Props = {
  emailData: {
    content: string;
    date: string;
    from: string;
    id: string;
    snippet: string;
    subject: string;
    to: string;
    user_id: string;
  };
};

const EmailCard: React.FC<Props> = async ({ emailData }) => {
  const EmaiDetailQuery = `#graphql
    query MyQuery($_eq: String = "") {
      attachments(where: {email_id: {_eq: $_eq}}) {
        email_id
        filename
        id
        url
      }
    }
  `;

  const res_attachments = await requestHasura.post("", {
    query: EmaiDetailQuery,
    variables: {
      _eq: emailData.id,
    },
  });

  const data_attachments = res_attachments.data.data.attachments;

  // const from = headers.find((i: any) => {
  //   return i.name === "From";
  // });

  return (
    <>
      <Link href={`/emails/${emailData.id}`}>
        <div className="grid gap-x-8 gap-y-4 grid-cols-2 bg-gray-200/70 rounded-xl px-8 py-3 w-[1000px] mb-4 bg-white">
          <div className="relative w-full">
            <p className="font-semibold">{emailData.from}</p>
          </div>
          <div className="relative w-full">
            <p className="text-sm text-gray-700">
              {emailData.subject} - {emailData.snippet.substring(0, 60 - emailData.subject.length)}
              {emailData.subject.length > 10 ? "..." : ""}
            </p>
          </div>
          <div></div>
          <div>
            {data_attachments.map((i: any) => (
              <div key={i.id}>
                <AttachmentCard attachmentData={i} />
              </div>
            ))}
          </div>
        </div>
      </Link>
    </>
  );
};

export default EmailCard;
