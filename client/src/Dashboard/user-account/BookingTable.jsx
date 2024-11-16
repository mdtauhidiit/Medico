import React from "react";
import formateDate from "../../utils/formateDate";
import Capitalize from "../../utils/capitalizeString";

const BookingTable = ({appointments}) => {

  return (
    <div className="mt-6 overflow-x-auto ">
      <table className="w-full  text-left text-sm text-gray-500  bg-gray-900">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>

            <th scope="col" className="px-6 py-3">
              Specialization
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Ticket Price
            </th>
            <th scope="col" className="px-6 py-3">
              Booked On
            </th>
          </tr>
        </thead>

        <tbody>
          {appointments?.map((item) => {
            return (
              <tr key={item._id} className="text-gray-50 border-b border-slate-800 ">
                <td
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-300 whitespace-nowrap"
                >
                  <img
                    src={item?.doctor?.photo}
                    className="w-10 h-10 rounded-full border-2 border-purple-200"
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold text-white">
                      {item?.doctor?.name}
                    </div>
                    <div className="text-normal text-white">
                      {item?.doctor?.email}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  
                    <div className="flex items-center">
                    
                      {item && Capitalize(item?.doctor.specialization)}
                    </div>
                  
                 
                </td>
              
                <td className="px-6 py-4">{item?.doctor.phone}</td>
                <td className="px-6 py-4">{item?.doctor.ticketPrice}</td>
                <td className="px-6 py-4">{item && formateDate(item?.createdAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
