import { WebflowIcon } from "../icons";



const UserDeatails = () => {
  return (
    <div className="mt-5">
      <h4 className="text-2xl md:text-3xl font-semibold ">Jack Smith</h4>
      <p className="flex flex-col md:flex-row gap-2 mt-3 text-lg">
        @kingjack <small className="hidden md:inline">.</small>
        <span>Senior Product Designer</span>
        <span className="text-gray-400">
          at{" "}
          <strong className="text-black">
            <WebflowIcon /> Webflow
          </strong>{" "}
          . He/Him
        </span>
      </p>
    </div>
  );
};

export default UserDeatails;
