import React from "react";
import formateDate from "../../utils/formateDate";

const Appointments = ({ data }) => {
  const appointments=data;

  return (
    <div className="">
    <table className="w-full text-left text-sm text-gray-500  gradient__background">
      <thead className="text-xs text-gray-700 uppercase bg-gray-200">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          
          <th scope="col" className="px-6 py-3">
            Payment
          </th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
          <th scope="col" className="px-6 py-3">
            Booked On
          </th>
        </tr>
      </thead>

      <tbody>
        {appointments?.map((item) => {
          return (
            <tr key={item._id} className="text-gray-50">
              
              <td
                scope="row"
                className="flex items-center px-6 py-4 text-gray-300 whitespace-nowrap"
              >
                <img src={item?.user?.photo} className="w-10 h-10 rounded-full border-2 border-purple-200" />
                <div className="pl-3">
                  <div className="text-base font-semibold text-white">
                    {item?.user?.name}
                  </div>
                  <div className="text-normal text-white">
                    {item?.user?.email}
                  </div>
                </div>
              </td>

              <td className="px-6 py-4">
                {item.isPaid && (
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2 "></div>
                    Paid
                  </div>
                )}
                {!item.isPaid && (
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                    Unpaid
                  </div>
                )}
              </td>
              
              <td className="px-6 py-4">{item.ticketPrice}</td>
              <td className="px-6 py-4">{formateDate(item.createdAt)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
};

export default Appointments;
