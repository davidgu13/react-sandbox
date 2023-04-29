import axios from "axios";
import { JokeResponseType } from "../types/types";

export const fetchJoke = async (
    jokesUrl: string,
    params: Record<string, unknown>,
    controller: AbortController,
) => {
    const response = await axios.get<JokeResponseType>(jokesUrl, {
        params: { ...params },
        signal: controller.signal,
    });

    return response.data;
};
