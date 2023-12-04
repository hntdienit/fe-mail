import React from "react";
import parse from "html-react-parser";
import { requestHasura } from "@/services/request";
import AttachmentCard from "@/components/AttachmentCard";
import Link from "next/link";
// import { Table } from "antd";
// import type { ColumnsType } from "antd/es/table";

type invoiceType = {
  currency: string;
  exchange_rate: number;
  form_number: string;
  full_serial: string;
  id: string;
  name: string;
  serial: number;
  symbol: string;
  created_at: string;
  buye: {
    address: string;
    contract_id: string;
    end_date: string;
    id: string;
    name: string;
    payment_method: string;
    start_date: string;
    tax_code: string;
  };
  payment: {
    Total_amount_without_tax: string;
    Total_payment_in_numbers: string;
    Total_payment_in_words: string;
    id: string;
    total_tax: number;
    total_value_added: number;
  };
  seller: {
    address: string;
    id: string;
    name: string;
    tax_code: string;
    tel: string;
  };
  services: [
    {
      id: string;
      money: number;
      name: string;
      numerical_order: number;
      total_money: string;
      vat_amount: number;
      vat_rate: number;
    }
  ];
};

interface DataType {
  key: string;
  name: string;
  money: string;
  address: string;
}

// const columns: ColumnsType<DataType> = [
//   {
//     title: "Name",
//     dataIndex: "name",
//   },
//   {
//     title: "Cash Assets",
//     className: "column-money",
//     dataIndex: "money",
//     align: "right",
//   },
//   {
//     title: "Address",
//     dataIndex: "address",
//   },
// ];

// const data1: DataType[] = [
//   {
//     key: "1",
//     name: "John Brown",
//     money: "￥300,000.00",
//     address: "New York No. 1 Lake Park",
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     money: "￥1,256,000.00",
//     address: "London No. 1 Lake Park",
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     money: "￥120,000.00",
//     address: "Sydney No. 1 Lake Park",
//   },
// ];

const InvoiceDetail = async ({ params }: { params: { slug: string } }) => {
  const InvoiceDetailQuery = `#graphql
    query MyQuery($_eq: String = "") {
      invoices(where: {email_id: {_eq: $_eq}}) {
        currency
        exchange_rate
        form_number
        full_serial
        id
        name
        serial
        symbol
        created_at
        buye {
          address
          contract_id
          end_date
          id
          name
          payment_method
          start_date
          tax_code
        }
        payment {
          Total_amount_without_tax
          Total_payment_in_numbers
          Total_payment_in_words
          id
          total_tax
          total_value_added
        }
        seller {
          address
          id
          name
          tax_code
          tel
        }
        services {
          id
          money
          name
          numerical_order
          total_money
          vat_amount
          vat_rate
        }
      }
    }
  `;

  const res_invoiceDetail = await requestHasura.post("", {
    query: InvoiceDetailQuery,
    variables: {
      _eq: params.slug,
    },
  });

  const data: invoiceType = res_invoiceDetail.data?.data?.invoices[0];

  return (
    <>
      <div className="grid gap-x-8 gap-y-4 grid-cols-1 rounded-xl border-2 border-neutral-400 px-8 py-3 w-[800px] mb-4 bg-white">
        <div className="font-semibold pl-3 text-3xl">Chi tiết hóa đơn 00{data.serial}</div>
        <div className="px-3 bg-blue-100 w-full h-[100px] rounded-xl flex">
          <div className="flex-1 p-3">
            Số hóa đơn: <span className="text-3xl text-red-500">00{data.serial}</span>
          </div>
          <div className="flex-1 p-3">
            Ký hiệu: <span className="font-semibold text-2xl">{data.symbol}</span>
          </div>
          <div className="flex-1 p-3">
            Mẫu số: <span className="font-semibold text-2xl">{data.form_number}</span>
          </div>
          <div className="flex-1 p-3">
            Ngày hóa đơn: <span className="font-semibold text-2xl">{data.created_at.split("T")[0]}</span>
          </div>
        </div>
        <hr />
        <div>
          <div>
            Đơn vị bán hàng: <span className="font-semibold text-lg text-blue-500">{data.seller.name}</span>
          </div>
          <div>
            Mã số thuế: <span className="font-semibold text-lg text-blue-500">{data.seller.tax_code}</span>
          </div>
          <div>
            Địa chỉ: <span className="font-semibold text-lg text-blue-500">{data.seller.address}</span>
          </div>
          <div className="grid gap-x-8 gap-y-4 grid-cols-2">
            <div>
              Điện thoại: <span className="font-semibold text-lg text-blue-500">{data.seller.tel.split(": ")[1]}</span>
            </div>
            <div>Số tài khoản:</div>
          </div>
        </div>
        <hr />
        <div>
          <div>Họ tên người mua:</div>
          <div>
            Đơn vị mua hàng: <span className="font-semibold text-lg text-blue-500">{data.buye.name}</span>
          </div>
          <div>
            Mã số thuế: <span className="font-semibold text-lg text-blue-500">{data.buye.tax_code}</span>
          </div>
          <div>
            Địa chỉ: <span className="font-semibold text-lg text-blue-500">{data.buye.address}</span>
          </div>
          <div className="grid gap-x-8 gap-y-4 grid-cols-2">
            <div>Số tài khoản:</div>
            <div>
              Hình thức thanh toán:{" "}
              <span className="font-semibold text-lg text-blue-500">{data.buye.payment_method}</span>
            </div>
          </div>
        </div>

        <div>
          <table className="border-collapse border border-slate-50 w-full">
            <thead>
              <tr className="bg-gray-300">
                <th className="border border-slate-600 h-[80px] w-[100px]">STT</th>
                <th className="border border-slate-600 w-2/12">Tên hàng hóa, dịch vụ</th>
                <th className="border border-slate-600  w-[100px]">Đơn vị tính</th>
                <th className="border border-slate-600  w-[100px]">Số lượng</th>
                <th className="border border-slate-600  w-[100px]">Đơn giá</th>
                <th className="border border-slate-600">Thành tiền chưa có thuế GTGT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-700 font-semibold text-center h-[50px]">1</td>
                <td className="border border-slate-700 font-semibold text-center">2</td>
                <td className="border border-slate-700 font-semibold text-center">3</td>
                <td className="border border-slate-700 font-semibold text-center">4</td>
                <td className="border border-slate-700 font-semibold text-center">5</td>
                <td className="border border-slate-700 font-semibold text-center">6=4x5</td>
              </tr>
              {data.services.map((i) => (
                <tr key={i.id}>
                  <td className="border border-slate-700 h-[100px] text-center">{i.numerical_order}</td>
                  <td className="border border-slate-700 pl-3">{i.name}</td>
                  <td className="border border-slate-700"></td>
                  <td className="border border-slate-700"></td>
                  <td className="border border-slate-700"></td>
                  <td className="border border-slate-700 text-right pr-3">{data.payment.Total_amount_without_tax}</td>
                </tr>
              ))}

              <tr>
                <td className="border border-slate-700 text-right pr-3" colSpan={5}>
                  Tổng tiền chưa có thuế GTGT:
                </td>
                <td className="border border-slate-700 text-right pr-3">{data.payment.Total_amount_without_tax}</td>
              </tr>
              <tr>
                <td className="border border-slate-700 text-right pr-3" colSpan={5}>
                  Tổng tiền thuế GTGT {data.payment.total_value_added}%:
                </td>
                <td className="border border-slate-700 text-right pr-3">{data.payment.total_tax}</td>
              </tr>
              <tr>
                <td className="border border-slate-700 text-right pr-3" colSpan={5}>
                  Tổng tiền thanh toán đã có thuế GTGT:
                </td>
                <td className="border border-slate-700 text-right pr-3"><span className="font-semibold text-lg text-red-500">{data.payment.Total_payment_in_numbers}</span></td>
              </tr>
              <tr>
                <td className="border border-slate-700 pl-3" colSpan={6}>
                  Số tiền viết bằng chữ: <span className="font-semibold">{data.payment.Total_payment_in_words}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid gap-x-8 gap-y-4 grid-cols-2 pb-32">
          <div className="text-center">Người mua hàng</div>
          <div className="text-center">Người bán hàng</div>
        </div>
      </div>
    </>
  );
};

export default InvoiceDetail;
