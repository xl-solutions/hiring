import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NotFoundError";
import { ServerInternalError } from "../error/ServerInternalError";

export default function handleResponse(response)  {
    switch (response.status) {
        case 200:
            return response.data
        case 400:
            return new BadRequestError()
        case 404:
            throw new NotFoundError()
        case 500:
            throw new ServerInternalError()
        default:
            break;
    }
}