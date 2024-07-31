import axios from "axios"
import { NextResponse } from "next/server";

export async function GET(req){
    const { data } = await axios.get(`http://localhost:8080/transaction/future`);
    return NextResponse.json(data)
}