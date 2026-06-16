import "./loader.css";
import LoaderImage from "../assets/loader.svg";

export const Loader: React.FC = () => {
  return <img className="Loader" src={LoaderImage}></img>;
};
