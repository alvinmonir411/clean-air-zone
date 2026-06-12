import { EntitySchema } from "typeorm";

export class Payment {
  id!: string;
  registrationNumber!: string;
  registrationLocation!: string;
  vehicleType!: string;
  cleanAirZone!: string;
  selectedDates!: string[];
  email!: string;
  totalAmount!: number;
  currency!: string;
  status!: string;
  stripeSessionId?: string;
  paidAt?: Date;
  createdAt!: Date;
  updatedAt!: Date;
}

export const PaymentSchema = new EntitySchema<Payment>({
  target: Payment,
  name: "Payment",
  tableName: "payments",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    registrationNumber: {
      type: "varchar",
      length: 50,
    },
    registrationLocation: {
      type: "varchar",
      length: 50,
    },
    vehicleType: {
      type: "varchar",
      length: 50,
    },
    cleanAirZone: {
      type: "varchar",
      length: 100,
    },
    selectedDates: {
      type: "simple-json",
    },
    email: {
      type: "varchar",
      length: 255,
    },
    totalAmount: {
      type: "integer",
    },
    currency: {
      type: "varchar",
      length: 10,
      default: "GBP",
    },
    status: {
      type: "varchar",
      length: 50,
      default: "pending",
    },
    stripeSessionId: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    paidAt: {
      type: "timestamp",
      nullable: true,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
  },
});
