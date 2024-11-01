import { FC, Fragment } from "react";

type DownLineListProps = {
    line: string;
    render: (s: string) => JSX.Element;
}
const DownLineList: FC<DownLineListProps> = ({ line, render }) => {
    return line.split('\n').map((line, index) => <Fragment key={index}>{render(line)}</Fragment>)

}

export default DownLineList;