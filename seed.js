
const { MongoClient } = require("mongodb");

// Hardcoded for simplicity based on what we found
const uri = "mongodb+srv://rmd659511_db_user:IAZjoVcJa0cUrGFk@juwelarysop.bx0lpoc.mongodb.net/?appName=juwelarysop-";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db("MONGODB_DB"); // Explicitly using the database name
        const collection = db.collection("payments");

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
            createdAt: new Date().toISOString(),
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
