import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
    const {id} = params;
    const { data } = await axios.get(`http://localhost:8080/transaction/filter/${id}`);
    return NextResponse.json(data)
}