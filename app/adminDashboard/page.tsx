import { getDataSource } from "../lib/db";
import { Payment, PaymentSchema } from "../lib/entities/payment.entity";
import DashboardClient from "./DashboardClient";
import { cookies } from "next/headers";
import LoginView from "./LoginView";

export const revalidate = 0; // Disable caching to always get fresh data
export const dynamic = "force-dynamic";


interface Payment {
  _id: string;
  registrationNumber: string;
  registrationLocation: string;
  vehicleType: string;
  cleanAirZone: string;
  selectedDates: string[];
  email: string;
  totalAmount: number;
  currency: string;
  status: string;
  createdAt: string | null;
  stripeSessionId?: string;
}

async function getPayments(): Promise<Payment[]> {
  const dataSource = await getDataSource();
  const paymentRepository = dataSource.getRepository(PaymentSchema);

  const payments = await paymentRepository.find({
    order: {
      createdAt: "DESC"
    }
  });

  console.log(`AdminDashboard: Found ${payments.length} orders`);
  if (payments.length > 0) {
    console.log("AdminDashboard: First order sample:", JSON.stringify(payments[0], null, 2));
  }

  // We must serialize the data before passing to client component
  return payments.map((p) => ({
    ...p,
    _id: p.id,
    createdAt: p.createdAt ? p.createdAt.toISOString() : null,
  })) as unknown as Payment[];
}

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_session")?.value === "true";

  if (!isAuthenticated) {
    return <LoginView />;
  }

  const payments = await getPayments();

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="max-w-7xl mx-auto">
        <DashboardClient initialPayments={payments} />
      </div>
    </div>
  );
}
