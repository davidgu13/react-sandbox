import { useQuery } from "@tanstack/react-query";
import { fetchJoke } from "../clients";
import { FETCHING_QUERY_KEY } from "./utils";

export interface IUseJokeProps {
    jokeId: number;
    url: string;
}

function useJoke(props: IUseJokeProps) {
    const { jokeId, url } = props;

    const controller = new AbortController();

    // const {
    //     data: joke,
    //     isLoading,
    //     isFailed,
    // } = useFetch<JokeResponseType>({
    //     url,
    //     params: { idRange: jokeId },
    //     controller,
    // });

    const {
        data: joke,
        isLoading,
        isSuccess,
    } = useQuery({
        queryKey: [...FETCHING_QUERY_KEY, jokeId], 
        queryFn: () => fetchJoke(url, { idRange: jokeId }, controller),
    });

    return { joke, isLoading, isSuccess };
}

export default useJoke;
