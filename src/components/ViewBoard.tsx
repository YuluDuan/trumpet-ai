const ViewBoard = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <section className="viewboard">{children}</section>
    </>
  );
};

export default ViewBoard;
