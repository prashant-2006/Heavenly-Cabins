import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins(){ 
    let { data, error } = await supabase
    .from('cabins')
    .select('*')

    if(error){
        console.error(error)
        throw new Error("Cabins could not be loaded.")
    }
    return data
}

export async function addCabin(newCabin) {
    console.log(newCabin)
    const hasImage = typeof newCabin.image === "string" && newCabin.image.startsWith(supabaseUrl);
    let imagePath = newCabin.image
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/','')
    if(!hasImage){
      imagePath = `${supabaseUrl}/storage/v1/object/public/cabins//${imageName}`
    }
    const { data, error } = await supabase
    .from('cabins')
    .insert([{...newCabin, image: imagePath}])
    .select()

    if(error){
        console.error(error)
        throw new Error("Cabin could not be added.")
    }

    if(hasImage){
      return data
    }

    const { error: storageError } = await supabase
        .storage
        .from('cabins')
        .upload(imageName, newCabin.image)

    if(storageError){
        const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)
        console.error(error)
        throw new Error("Cabin image could not be uploaded and the cabin was not created.")
    }

    return data
}

export async function deleteCabin(id){  
    const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)

    if(error){
        console.error(error)
        throw new Error("Cabin could not be deleted.")
    }
    return data
}

export async function editCabin(cabin, id) {
    const hasImage = typeof cabin.image === "string" && cabin.image.startsWith(supabaseUrl);
  
    let imagePath = cabin.image;
  
    if (!hasImage) {
      const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
      imagePath = `${supabaseUrl}/storage/v1/object/public/cabins//${imageName}`;
  
      // Upload image
      const { error: storageError } = await supabase.storage
        .from("cabins")
        .upload(imageName, cabin.image);
  
      if (storageError) {
        console.error(storageError);
        throw new Error("Cabin image could not be uploaded.");
      }
    }
  
    // Update cabin
    const { data, error } = await supabase
      .from("cabins")
      .update({ ...cabin, image: imagePath })
      .eq("id", id)
      .select();
  
    if (error) {
      console.error(error);
      throw new Error("Cabin could not be edited.");
    }
  
    return data;
  }