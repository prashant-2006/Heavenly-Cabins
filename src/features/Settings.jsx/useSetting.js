import { useQuery } from "@tanstack/react-query";
import { getSettings } from "./apiSettings";

export function useSetting(){
    const { isLoading, error, data: settings} = useQuery({
        queryKey: ['settings'],
        queryFn: getSettings
    })

    return {isLoading, settings}
}