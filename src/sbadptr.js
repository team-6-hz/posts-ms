import { createClient } from "@supabase/supabase-js";
import axios from 'axios';
import cors from 'cors';
import key from './key.js';
const supabase = createClient("https://yhepwyvnedyreftvkyrv.supabase.co",key());
export async function getData() {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) console.log('query error', error);
    else{
        console.log(data);
        return data;
    } 
}
export async function insertDataFromJSON(req ) {
    try {
        // Read JSON file
       
        const jsonData = req;

        // Insert data into Supabase table
        const { data, error } = await supabase
            .from("posts")
            .upsert(jsonData);

        if (error) {
            throw error;
        }
        else return 201;
        console.log('Data inserted successfully:', data);
    } catch (err) {
        console.error('Error inserting data:', err.message);
    }
}

export async function getDataAuthor(author) {
    const { data, error } = await supabase.from('posts').select('*').eq('author', author);
    if (error) console.log('query error', error);
    else {
        console.log(data);
        return data;
    }
}