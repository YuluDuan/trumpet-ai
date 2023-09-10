import Image from "next/image";
const UseCase = () => {
  return (
    <div id="use_case" className="use_case_container">
      <div className="line-flex">
        <p>How does Trumpet work?</p>
        <Image src="/assets/Line.svg" height={12} width={97} alt="line" />
      </div>
    </div>
  );
};

export default UseCase;
