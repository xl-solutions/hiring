import { Link } from "react-router-dom";
import { Card } from "./styles";

interface IUsers{
    name: string,
    username: string
}

export const CardUsers: React.FC<IUsers> = ({ name, username}) => {
    return(
        <>
            <Card>
                <h3>{username}</h3>
                <p>{name}</p>
            </Card>
        </>
    );
}

export default CardUsers;