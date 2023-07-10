import Editor from "./Editor";

interface Props {
  img: string;
  text: string;
}

const Card = ({ img, text }: Props) => {
  return (
    <section className="card">
      <img src={img} className="icon" />
      <Editor text={text} />
    </section>
  );
};

export default Card;
