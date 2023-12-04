import EmailCard from "@/components/EmailCard";
import { requestHasura } from "@/services/request";
import React from "react";

const EmailsPage = async () => {
  const EmailListQuery = `#graphql
    query MyQuery {
      emails {
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

  const email = await requestHasura.post("", {
    query: EmailListQuery,
  }, {

  });

  const data = email.data?.data?.emails;

  return (
    <div>
      <div className="text-3xl pb-4">EmailsPage</div>
      <div>
        {data.map((i: any) => (
          <div key={i.id}>
            <EmailCard emailData={i} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailsPage;
