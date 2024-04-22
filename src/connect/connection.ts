import postgres from "postgres";

import env from "../shared/config/config";

const sql = postgres(env.dbUrl!) as any;

export default sql;
