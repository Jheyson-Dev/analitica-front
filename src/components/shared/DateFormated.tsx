import moment from "moment";

interface Props {
  date: Date;
}

export const DateFormated: React.FC<Props> = ({ date }) => {
  return <span>{moment(date).format("DD/MM/YYYY")}</span>;
};
