import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import TableComponent from "./Table";

function CabinTable(){
    const {isLoading, data: cabins, error} = useQuery({queryKey: ['cabins'], queryFn: getCabins})

    if(isLoading){
        return <Spinner />;
    }

    return <TableComponent data={cabins} />
}

export default CabinTable