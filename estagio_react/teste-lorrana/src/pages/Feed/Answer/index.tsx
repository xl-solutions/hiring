import React, { useState } from "react";
import { AnswerCard } from "./styles";

interface IAnswer {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}

export const Answer: React.FC<IAnswer> = ({postId, name, id, body, email}) => {
    return(
        <>           
            <AnswerCard>
                <strong>{name}</strong>
                <p>{body}</p> 
            </AnswerCard>         
        </>
    );
}

export default Answer;