import React from "react";
import parse from "html-react-parser";
import { requestHasura } from "@/services/request";
import AttachmentCard from "@/components/AttachmentCard";
import Link from "next/link";

const EmailDetail = async ({ params }: { params: { slug: string } }) => {
  const EmaiDetailQuery = `#graphql
    query MyQuery($id: String = "") {
      emails_by_pk(id: $id) {
        content
        date
        from
        id
        snippet
        subject
        to
        user_id
      }
    }
  `;

  const AttachmentsQuery = `#graphql
    query MyQuery($_eq: String = "") {
      attachments(where: {email_id: {_eq: $_eq}}) {
        email_id
        filename
        id
        url
      }
    }
  `;

  const res_emailDetail = await requestHasura.post("", {
    query: EmaiDetailQuery,
    variables: {
      id: params.slug,
    },
  });

  const data = res_emailDetail.data?.data?.emails_by_pk;

  const res_attachments = await requestHasura.post("", {
    query: AttachmentsQuery,
    variables: {
      _eq: params.slug,
    },
  });

  const data_attachments = res_attachments.data?.data?.attachments;

  return (
    <>
      <div className="grid gap-x-8 gap-y-4 grid-cols-1 rounded-xl border-2 border-neutral-400 px-8 py-3 w-[1000px] mb-4 bg-white">
        <div className="relative w-full py-1">
          <div className="font-semibold pl-3 text-3xl">{data.subject}</div>
        </div>
        <div className="relative w-full py-1 grid gap-x-8 gap-y-4 grid-cols-2">
          <div className="font-semibold pl-3">
            <div>{data.from}</div>
            <div className="text-xs text-gray-400">to: {data.to}</div>
          </div>
          <div className="text-right pr-4 text-gray-400">{data.date}hh</div>
        </div>
        <div className="relative w-full">
          <div className="pl-3">{parse(data.content)}</div>
        </div>
        <hr />
        <div>
          <div className="mb-3">
            <b>One attachment</b> • Scanned by Gmail
          </div>
          <div className="flex">
            {data_attachments.map((i: any) => (
              <div key={i.id} className="w-1/5 pr-2">
                <a href={i.url}>
                  <AttachmentCard attachmentData={i} detailPage />
                </a>
              </div>
            ))}
          </div>
        </div>
        <div>
          <hr />
          <div className="py-3">
            <b>View invoice</b>
          </div>
          <Link
          href={`/invoice/${data.id}`}
            className="rounded-md border border-primary px-3 py-2 text-sm font-semibold text-primary shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            invoice
          </Link>
        </div>
      </div>
    </>
  );
};

export default EmailDetail;
