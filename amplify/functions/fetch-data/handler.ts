import type { Handler } from "aws-lambda";

export const handler: Handler = async (event: any) => {
  const API_URL = "https://api.apilayer.com/fixer/latest";
  const API_KEY = process.env.FIXER_API_KEY; // Use environment variable

  console.log("Event received:", JSON.stringify(event, null, 2));

  try {
    let res = await fetch(API_URL, {
      headers: {
        "apikey": API_KEY || "" 
      }
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    console.log("Fetched data:", data);
    
    return {
      success: data.success,
      timestamp: data.timestamp,
      base: data.base,
      date: data.date,
      rates: JSON.stringify(data.rates) // Convert rates to string
    };
  } catch (error:any) {
    console.error("Error fetching data:", error);
    throw new Error(`Failed to fetch exchange rates: ${error.message}`);
  }
};