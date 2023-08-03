interface WhiteCardProps {
  children: React.ReactNode;
}

const WhiteCard = ({ children }: WhiteCardProps) => {
  return <div className="white-card-container">{children}</div>;
};

export default WhiteCard;
