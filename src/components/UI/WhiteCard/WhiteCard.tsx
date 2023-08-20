interface WhiteCardProps {
  children: React.ReactNode;
  isFocused: boolean;
}

const WhiteCard = ({ children, isFocused }: WhiteCardProps) => {
  return (
    <div className={`white-card-container ${isFocused ? "card--focused" : ""}`}>
      {children}
    </div>
  );
};

export default WhiteCard;
