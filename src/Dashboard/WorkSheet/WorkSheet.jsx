import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import useAxiosOpen from "../../Hooks/useAxiosOpen";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import WorkTable from "./WorkTable";

const people = [
  { name: "Sales" },
  { name: "Support" },
  { name: "Content" },
  { name: "Paper Work" },
  { name: "Meeting" },
  { name: "Design" },
];
const WorkSheet = () => {
  const axiosOpen = useAxiosOpen();
  const [selected, setSelected] = useState(people[0]);

  const user = useAuth();

  const { data: worksData, refetch } = useQuery({
    queryKey: ["workData"],
    queryFn: async () => {
      const res = await axiosOpen.get(`/worksheet/${user?.user?.email}`);
      return res.data;
    },
  });
  const handleWorkSheet = async (e) => {
    e.preventDefault();
    const form = e.target;
    const hour = form.hour.value;
    const date = form.date.value;
    const workSheet = {
      task: selected.name,
      hour: hour,
      date: date,
      name: user.user.displayName,
      email: user.user.email,
      timeStamp: new Date(),
    };
    // sending data to database
    const res = await axiosOpen.post("/worksheet", workSheet);
    if (res.data.insertedId) {
      Swal.fire({
        position: "middle",
        icon: "success",
        title: "Your work has been saved and updated",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    e.target.reset();
    refetch();
  };
  return (
    <div className="mx-10">
      {/* Work Form */}
      <div className="flex flex-col lg:flex-row md:justify-evenly ">
        {/* Drop Down */}
        <div className="  lg:w-72 z-30">
          <label>Tasks:</label>
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full bg-orange-400 cursor-default rounded-lg  py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{selected.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 " aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {people.map((person, personIdx) => (
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
        <form
          onSubmit={handleWorkSheet}
          className=" flex flex-col lg:flex-row gap-2 lg:gap-10 "
        >
          {/* hours Worked */}
          <div className="grid">
            <label>Hours Worked:</label>
            <input
              className="input input-warning"
              placeholder="Hours Worked"
              type="number"
              name="hour"
              required
            />
          </div>
          {/* Date */}
          <div className="grid">
            <label>Date:</label>
            <input
              className="input input-warning"
              type="date"
              name="date"
              required
            />
          </div>
          {/* submit button */}
          <div className="mt-5 flex justify-center">
            <input
              className="btn btn-outline btn-warning"
              type="submit"
              value="Add"
            />
          </div>
        </form>
      </div>
      {/* Table */}
      <div className="">
        <WorkTable worksData={worksData} />
      </div>
    </div>
  );
};

export default WorkSheet;
