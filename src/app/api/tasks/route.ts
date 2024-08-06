import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

export async function GET() {
  try {
    const tasks = await prisma.task.findMany()
    return NextResponse.json(tasks)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, categoryId } = await req.json()
    const task = await prisma.task.create({
      data: { title, description, categoryId },
    })
    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
  }
}
