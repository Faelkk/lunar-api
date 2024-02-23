import { createClient } from "@supabase/supabase-js";
import env from "../shared/config/config";

const supabase = createClient(env.supabaseUrl!, env.supabaseKey!);

export default supabase;
