import axios from "axios"
import { NextResponse } from "next/server";

export async function GET(req){
    const { data } = await axios.get(`http://localhost:8080/transaction`);
    return NextResponse.json(data)
}

export async function POST(req){
    const body = await req.json()
    const { data } = await axios.post(`http://localhost:8080/transaction`, body);
    return NextResponse.json(data)
}
