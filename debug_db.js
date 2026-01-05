
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://rmd659511_db_user:IAZjoVcJa0cUrGFk@juwelarysop.bx0lpoc.mongodb.net/?appName=juwelarysop-";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("Connected successfully to server");

        // List databases
        const adminDb = client.db().admin();
        const dbs = await adminDb.listDatabases();
        console.log("Databases:");
        dbs.databases.forEach(db => console.log(` - ${db.name}`));

        // Check 'juwelarysop' database
        const dbName = "juwelarysop";
        const db = client.db(dbName);
        const count = await db.collection("orders").countDocuments();
        console.log(`\nDocuments in '${dbName}.orders': ${count}`);

        if (count > 0) {
            const doc = await db.collection("orders").findOne();
            console.log("Sample document:", JSON.stringify(doc, null, 2));
        }

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
