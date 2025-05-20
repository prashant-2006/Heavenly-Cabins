import supabase from "../../services/supabase"

export async function getSettings(){ 
    let { data, error } = await supabase
    .from('settings')
    .select('*').single()

    if(error){
        console.error(error)
        throw new Error("Settings could not be loaded.")
    }
    return data
}

export async function UpdateSetting(newSetting){
    const { data, error } = await supabase
    .from('settings')
    .update(newSetting)
    .eq('id', 1)
    .single()

    if(error){
        console.error(error)
        throw new Error("Settings could not be updated")
    }

    return data
}