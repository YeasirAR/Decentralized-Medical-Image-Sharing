"use client";
import { useState, useEffect } from "react";

const MyImage = (props) => {
  const { user_email } = props;
  const [clientBlocks, setClientBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchClientBlocks = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/getOwnBlock", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client: user_email,
          }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);

        setClientBlocks(data.blocks);
        console.log(clientBlocks);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientBlocks();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <div className=" grid grid-cols-2 gap-2">
        {clientBlocks.map((blocks) => (
          <>
            <div className="w-[130vh] p-4 mx-auto my-3 text-left bg-white border border-gray-200 shadow-lg shadow-purple-500/50 rounded-lg shadow sm:p-8 ">
              {/* <h5 className="mb-2 text-xl font-bold text-gray-900 ">
                Image Name :
              </h5> */}
              <h3 className="mb-2 text-xl font-bold text-gray-900 ">
                Block Id: {blocks.block_id}
              </h3>
              <p className="mb-5 text-base text-gray-500 sm:text-sm">
                Share With:{" "}
                {blocks.clients.map((client) => (
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
                  >
                    {client}
                  </button>
                ))}
              </p>
            </div>
            <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
              <a
                href="#"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                <div className="text-left rtl:text-right">
                  <div className="mb-1 text-xs">Download Image</div>
                  <div className="-mt-1 font-sans text-sm font-semibold">
                    Click Here
                  </div>
                </div>
              </a>
            </div>
          </>
        ))}
        
      </div>
    </>
  );
};

export default MyImage;