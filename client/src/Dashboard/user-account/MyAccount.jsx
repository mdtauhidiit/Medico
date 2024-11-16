import { useContext, useState } from "react";
import userImg from "../../assets/images/doctor-img01.png";
import { authContext } from "../../context/authContext";
import MyBookings from "./MyBookings";
import Profile from "./Profile";
import { BASE_URL } from "../../config";
import useFetchData from "../../Hooks/useFetchData";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const MyAccount = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("bookings");
  const {
    data: userData,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/profile/me`);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}

        {error && <Error errMessage={error} />}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-12 ">
            <div className="pb-[50px] px-[30px] rounded-md mt-16 gradient__background max-h-[500px] w-[380px] sm:col-span-1 mx-auto  ">
              <div className="flex items-center justify-center">
                <figure className="w-[120px] h-[120px] rounded-full border-2 border-solid border-purple-200 mt-6">
                  <img
                    src={`${userData.photo ? userData.photo : userImg}`}
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </div>

              <div className="text-center mt-4 ">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {userData.name}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  {userData.email}
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Blood Type:{" "}
                  <span className="ml-2 text-headingColor leading-3 text-[15px]">
                    {userData.bloodType}
                  </span>
                </p>
              </div>

              <div className="mt-[30px] md:mt-[80px]">
                <button
                  onClick={handleLogout}
                  className="py-2 w-full leading-7 rounded-full text-white bg-slate-950 border-[1.25px] border-purple-200  "
                >
                  Logout
                </button>
                <button className="py-2 w-full bg-red-600 mt-4 leading-7 border-[1.25px] border-purple-200 rounded-full text-white ">
                  Delete account
                </button>
              </div>
            </div>

            <div className="p-5 w-[380px] md:w-full mx-auto md:col-span-2 md:px-[30px] sm:col-span-2 mt-12 sm:mt-16 rounded-md gradient__background">
              <div className="ml-[35px] text-center">
                <button
                  onClick={() => setTab("bookings")}
                  className={`${
                    tab === "bookings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 rounded-md text-headingColor  font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  My Bookings
                </button>
                <button
                  onClick={() => setTab("settings")}
                  className={`${
                    tab === "settings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  Profile Settings
                </button>
              </div>
              {tab === "bookings" && <MyBookings />}
              {tab === "settings" && <Profile userData={userData} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
