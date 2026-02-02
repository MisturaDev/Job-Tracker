import { supabase } from "@/integrations/supabase/client";
import { Application, ApplicationStatus, LocationType } from "@/types/application";

export const fetchApplications = async (userId: string): Promise<Application[]> => {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", userId)
    .order("date_applied", { ascending: false });

  if (error) throw error;
  return (data || []) as Application[];
};

export const createApplication = async (
  application: Omit<Application, "id" | "created_at" | "updated_at">
): Promise<Application> => {
  const { data, error } = await supabase
    .from("applications")
    .insert(application)
    .select()
    .single();

  if (error) throw error;
  return data as Application;
};

export const updateApplication = async (
  id: string,
  updates: Partial<Omit<Application, "id" | "user_id" | "created_at" | "updated_at">>
): Promise<Application> => {
  const { data, error } = await supabase
    .from("applications")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Application;
};

export const deleteApplication = async (id: string): Promise<void> => {
  const { error } = await supabase.from("applications").delete().eq("id", id);
  if (error) throw error;
};
