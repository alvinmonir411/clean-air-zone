
const { MongoClient } = require("mongodb");

// Hardcoded for simplicity based on what we found
const uri = "mongodb+srv://rmd659511_db_user:IAZjoVcJa0cUrGFk@juwelarysop.bx0lpoc.mongodb.net/?appName=juwelarysop-";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db("juwelarysop"); // Explicitly using the database name
        const collection = db.collection("orders");

        const doc = {
            _id: "dummy_id_" + Date.now().toString(),
            registrationNumber: "TEST-123",
            registrationLocation: "London",
            vehicleType: "Car",
            cleanAirZone: "Bath",
            selectedDates: ["2025-01-01"],
            email: "test@example.com",
            totalAmount: 1400,
            currency: "GBP",
            status: "paid",
            createdAt: new Date().toISOString(), // DashboardClient expects string or null if using my fix, but typically serialized from Date object. My code serialization handles Date usage.
            // Wait, the interface expects `string | null` for `createdAt` in `DashboardClient`.
            // The server `getPayments` serializes Date to string. 
            // So in DB it should be Date or string? 
            // `app/adminDashboard/page.tsx` line 37: `createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : null`
            // So DB can have Date or String. I'll insert Date.
        };

        // Override createdAt to be a Date object for the DB
        doc.createdAt = new Date();

        const result = await collection.insertOne(doc);
        console.log(`Successfully inserted document with _id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
