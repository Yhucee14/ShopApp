import React from "react";

const Home = () => {
  return (
    <div>
      <header className="flex justify-between items-center py-8 px-8">
        <div className="flex justify-center items-center">
          <h1 className="font-bold text-3xl">ShopApp</h1>
        </div>

        <div className="relative w-[45%]">
          <input
            type="text"
            placeholder="Search for anything..."
            // value={searchTerm}
            // onChange={handleSearch}
            className="block w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-[#A4A4A4] focus:border-[#A4A4A4]"
          />
          <div className="absolute inset-y-0 right-2 flex p-2 items-center">
            <img
            //   src={search}
              alt="Search Icon"
              className="h-[25px] w-[25px] bg-transparent"
              style={{ fill: "white" }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-lg">Welcome</div>
        </div>
      </header>
    </div>
  );
};

export default Home;
