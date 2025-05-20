import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import Spinner from "../../ui/Spinner";
import TableComponent from "./Table";
import { useSearchParams } from "react-router-dom";

function BookingTable(){
    const [searchParams] = useSearchParams();
    const filter = searchParams.get("status") || "all";
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
    const [field ,direction] = sortByRaw.split("-")
    const sortBy = {field, direction}
    const {isLoading, data: bookings, error} = useQuery({queryKey: ['bookings', filter, sortBy], queryFn: ()=>getBookings({filter, sortBy})})

    if(isLoading){
        return <Spinner />;
    }

    return <TableComponent data={bookings} />
}

export default BookingTable