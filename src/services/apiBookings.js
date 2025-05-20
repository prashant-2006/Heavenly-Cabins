import { getToday } from "./helper";
import supabase from "./supabase";

export async function getBookings({filter, sortBy}) {
  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName)");

  if (filter && filter !== "all") {
    query = query.eq("status", filter);
  }

  if(sortBy){
    query = query.order(sortBy.field, {ascending: sortBy.direction=="asc"})
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded.");
  }

  return data;
}

export async function getBookingById(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName)")
    .eq("id", id)
    .single(); // 👈 only one row

  if (error) throw new Error("Booking not found");
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single()

  if (error) throw new Error("Booking could not be updated");
  return data;
}

export async function deleteBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id)

  if (error) throw new Error("Booking could not be deleted");
  return data;
}

export async function getBookingsAfterDate(date){
  const {data, error} = await supabase
  .from("bookings")
  .select("created_at, totalPrice, extrasPrice")
  .gte("created_at", date)
  .lte("created_at", getToday({end: true}))

  if(error){
    throw new Error("Bookings could not be loaded")
  }
  return data
}

export async function getStaysAfterDate(date){
  const {data, error} = await supabase
  .from("bookings")
  .select("*, guests(fullName)")
  .gte("startDate", date)
  .lte("startDate", getToday())

  if(error){
    throw new Error("Bookings could not be loaded")
  }
  return data
}
