import { useQuery } from "@apollo/client";
import Navbar from "../../components/layout/Navbar";
import { GET_SCHOLARSHIP_BY_ID } from "../../graphql/Query";
import { useParams } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";

const ScholarshipDetail = () => {
  let { id } = useParams();

  const { data } = useQuery(GET_SCHOLARSHIP_BY_ID, {
    variables: { id },
  });

  const detail = data?.getScholarById;

  console.log("detail", detail);

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl px-2 py-10 sm:px-6 lg:px-8">
        <span className="bg-blue-100 text-blue-600 rounded-full px-3 py-2 text-sm">
          <span className="bg-blue-200 text-blue-800 rounded-full px-2 py-0.5 text-sm mr-2">
            Dalam Negeri
          </span>
          Beasiswa Terkini
        </span>

        <div className="mt-5">
          <h1 className="text-5xl text-neutral-950 font-semibold">
            {detail?.name}
          </h1>

          <div className="bg-neutral-100 rounded-md mt-10">
            <img
              className="w-full object-contain h-[402px] "
              src={detail?.banner_image}
              alt=""
            />
          </div>
          <div className="mt-5">
            <div className="flex space-x-10">
              <div>
                <p className="text-blue-600 text-sm">Diunggah oleh</p>
                <p className="flex items-center space-x-2 font-medium text-neutral-950 text-lg">
                  <span className="bg-blue-100 flex items-center rounded-full p-1 mr-2">
                    <UserIcon className="w-5 h-5 text-blue-600 font-bold" />
                  </span>{" "}
                  {detail?.user?.name}
                </p>
              </div>
              <div>
                <p className="text-blue-600 text-sm">Deadline Submisi</p>
                <p className="flex items-center space-x-2 font-medium text-neutral-950 text-lg">
                  17 Jan 2022
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h1 className="text-3xl text-neutral-950 font-semibold">
              Introduction
            </h1>
            <p className="text-lg text-neutral-600">
              {detail?.short_description}
            </p>
          </div>

          <div className="mt-10">
            <h1 className="text-3xl text-neutral-950 font-semibold">
              Daftar Beasiswa
            </h1>
            <p className="text-lg text-neutral-600">
              {detail?.detailed_description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScholarshipDetail;
