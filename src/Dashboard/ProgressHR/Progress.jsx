import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "../../Hooks/useAxiosOpen";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const Progress = () => {
  const axiosOpen = useAxiosOpen();
  const { data: employeeName } = useQuery({
    queryKey: ["employeeName"],
    queryFn: async () => {
      const res = await axiosOpen.get("/progress/name");
      return res.data;
    },
  });
  const people = employeeName;
  const [selected, setSelected] = useState({ name: "search" });
  // const [progressDatas, setProgressDatas] = useState(progress);
  const { data: progress, refetch } = useQuery({
    queryKey: ["progress"],
    queryFn: async () => {
      const res = await axiosOpen.get(`/progress/p?name=${selected.name}`);
      return res.data;
    },
  });
  const [progressDatas, setProgressDatas] = useState(progress);
  const totalHour = progressDatas?.reduce((acc, data) => {
    return acc + parseInt(data.hour);
  }, 0);
  useEffect(() => {
    setProgressDatas(progress);
    refetch();
  }, [progress, refetch, selected]);
  const handleSort = (e) => {
    if (e.target.value === "Search by Month") {
      return setProgressDatas(progress);
    }
    const matchingMonth = progress.filter((data) => {
      const dateObject = new Date(data.date);
      const monthFromData = dateObject.getMonth() + 1;
      return parseInt(e.target.value) === monthFromData;
    });
    setProgressDatas(matchingMonth);
  };

  return (
    <div>
      <p className="text-center text-2xl font-semibold">
        Total WorkingHour: {totalHour}
      </p>
      <div className="text-center lg:text-left">
        {/* Search */}
        <div className="flex flex-col lg:flex-row lg:justify-evenly ">
          {/* Drop Down */}
          <div className=" mx-auto w-72 z-30">
            <label>Name:</label>
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full bg-orange-400 cursor-default rounded-lg  py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{selected.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 "
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {people?.map((person, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                          }`
                        }
                        value={person}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {person.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          {/* Date */}
          <div className=" mx-auto mt-2 w-72 z-30">
            <label>Month:</label>

            <select
              onChange={handleSort}
              className="relative w-full bg-orange-400 cursor-default rounded-lg  py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
              // className="select select-warning w-full max-w-xs"
            >
              <option
                selected
                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
              >
                Search by Month
              </option>
              <option
                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                value="1"
              >
                January
              </option>
              <option
                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                value="2"
              >
                February
              </option>
              <option
                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                value="3"
              >
                March
              </option>
              <option
                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                value="4"
              >
                April
              </option>
              <option
                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                value="5"
              >
                May
              </option>
              <option
                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                value="6"
              >
                June
              </option>
              <option
                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                value="7"
              >
                July
              </option>
              <option
                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                value="8"
              >
                August
              </option>
              <option
                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                value="9"
              >
                September
              </option>
              <option
                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                value="10"
              >
                October
              </option>
              <option
                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                value="11"
              >
                November
              </option>
              <option
                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                value="12"
              >
                December
              </option>
            </select>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-auto h-64">
        <table className="table table-pin-rows">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Task</th>
              <th>Hour</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {progressDatas?.length < 1 ? (
              <tr className="mx-auto my-10 text-center">
                <td></td>
                <td className="text-red-500">No Data Found !</td>
              </tr>
            ) : (
              progressDatas?.map((workData, index) => (
                <tr key={workData?._id}>
                  <td>{index + 1}</td>
                  <td>{workData?.name}</td>
                  <td>{workData?.task}</td>
                  <td>{workData?.hour}</td>

                  <td>{workData?.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Progress;
