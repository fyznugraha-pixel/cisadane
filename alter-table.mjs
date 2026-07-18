import pg from 'pg';
const { Client } = pg;

const client = new Client({
  connectionString: 'postgresql://postgres.alcskuncafldpwbxvvio:Cisadaneadmin2026@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres'
});

async function run() {
  await client.connect();
  try {
    await client.query(`ALTER TABLE visitors ADD COLUMN visitor_type text DEFAULT 'general';`);
    console.log("Added visitor_type");
  } catch (err) {
    console.error("Error adding visitor_type:", err.message);
  }
  
  try {
    await client.query(`ALTER TABLE visitors ADD COLUMN booth_name text;`);
    console.log("Added booth_name");
  } catch (err) {
    console.error("Error adding booth_name:", err.message);
  }
  
  await client.end();
}
run();
