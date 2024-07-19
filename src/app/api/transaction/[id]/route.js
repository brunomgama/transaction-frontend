import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
    const {id} = params;
    const { data } = await axios.get(`http://localhost:8080/transaction/${id}`);
    return NextResponse.json(data)
}

export async function DELETE(request, {params}) {
    const {id} = params;
    const { data } = await axios.delete(`http://localhost:8080/transaction/${id}`);
    return NextResponse.json(data)
}

export async function PUT(request, {params}) {
    const {id} = params;
    const body = await request.json()
    const { data } = await axios.put(`http://localhost:8080/transaction/${id}`, body);
    return NextResponse.json(data)
}