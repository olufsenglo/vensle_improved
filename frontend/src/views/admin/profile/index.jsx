import React, { useState, useEffect } from 'react';
import Card from "components/card";
import Banner from "./components/Banner";
import General from "./components/General";
import Notification from "./components/Notification";
import Project from "./components/Project";
import Storage from "./components/Storage";
import Upload from "./components/Upload";

const ProfileOverview = () => {

  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    number: '',
    address: '',
    // images: null,
  });

  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: '',
    new_password_confirmation: '',
  });


  const userProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };	 

  const passwordDataChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...userProfile,
      [name]: value,
    });
  };  
  
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-6 lg:!mb-0">
          <Banner />
        </div>

        <div className="col-span-6 lg:!mb-0">
          <Storage />
        </div>
      </div>
      {/* all project & ... */}

      <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
          <Card extra={"w-full p-4 h-full"}>
            <div className="mb-8 w-full">
              <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                Update Details
              </h4>
              <form class="mt-10 flex flex-col space-y-4">
              <div>
                  <label for="name" class="text-xs font-semibold text-gray-500">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={userProfile.name}
                    onChange={userProfileChange}
                    name="name"
                    class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  />
                </div>                
                <div>
                  <label for="email" class="text-xs font-semibold text-gray-500">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userProfile.email}
                    onChange={userProfileChange}
                    class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div class="relative">
                  <label for="number" class="text-xs font-semibold text-gray-500">Phone number</label>
                  <input
                    type="text"
                    id="number"
                    name="number"
                    value={userProfile.number}
                    onChange={userProfileChange}
                    class="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /><img src="/images/uQUFIfCYVYcLK0qVJF5Yw.png" alt="" class="absolute bottom-3 right-3 max-h-4"
                  />
                </div>
                <div class="relative">
                  <label for="Address" class="text-xs font-semibold text-gray-500">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={userProfile.address}
                    onChange={userProfileChange}
                    class="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /><img src="/images/uQUFIfCYVYcLK0qVJF5Yw.png" alt="" class="absolute bottom-3 right-3 max-h-4"
                  />
                </div>
              </form>
            </div>
          </Card>
        </div>
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <Card extra={"w-full p-4 h-full"}>
            <div className="mb-8 w-full">
              <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                Change password
              </h4>
              <div className="mt-2">
                
              <form class="mt-10 flex flex-col space-y-4">
                <div>
                  <label for="old_password" class="text-xs font-semibold text-gray-500">Old Password</label>
                  <input
                    type="password"
                    id="old_password"
                    name="old_password"
                    value={passwordData.old_password}
                    onChange={passwordDataChange}
                    class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div class="relative">
                  <label for="new_password" class="text-xs font-semibold text-gray-500">New Password</label>
                  <input
                    type="password"
                    id="new_password"
                    name="new_password"
                    value={passwordData.new_password}
                    onChange={passwordDataChange}
                    class="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /><img src="/images/uQUFIfCYVYcLK0qVJF5Yw.png" alt="" class="absolute bottom-3 right-3 max-h-4"
                  />
                </div>
                <div class="relative">
                  <label for="new_password_confirmation" class="text-xs font-semibold text-gray-500">Confirm New Password</label>
                  <input
                    type="password"
                    id="new_password_confirmation"
                    name="new_password_confirmation"
                    value={passwordData.new_password_confirmation}
                    onChange={passwordDataChange}
                    class="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /><img src="/images/uQUFIfCYVYcLK0qVJF5Yw.png" alt="" class="absolute bottom-3 right-3 max-h-4"
                  />
                </div>
                <div className="mt-4">
                  <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                    Save
                  </button>
                </div>
              </form>

              </div>
            </div>
          </Card>
        </div>

        <div className="col-span-5 lg:col-span-12 lg:mb-0 3xl:!col-span-3">
          <Notification />
        </div>
      </div>

      <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
          <Project />
        </div>
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <General />
        </div>
      </div>

    </div>
  );
};

export default ProfileOverview;
