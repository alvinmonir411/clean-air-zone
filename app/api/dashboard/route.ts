import { NextResponse } from "next/server";
import { getDataSource } from "../../lib/db";
import { PaymentSchema } from "../../lib/entities/payment.entity";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const dataSource = await getDataSource();
        const paymentRepository = dataSource.getRepository(PaymentSchema);

        // Sort by createdAt descending (newest first)
        const payments = await paymentRepository.find({
            order: {
                createdAt: "DESC"
            }
        });

        // Map database fields to output payload structure
        const serializedPayments = payments.map(p => ({
            ...p,
            _id: p.id,
        }));

        return NextResponse.json({ success: true, data: serializedPayments });
    } catch (error) {
        console.error("Dashboard API Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch dashboard data" },
            { status: 500 }
        );
    }
}

