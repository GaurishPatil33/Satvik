import { supabase } from "../lib/supabase";

export type UploadFolder = "products" | "categories";

export interface UploadResult {
  publicUrl: string;
  path: string;
}

export async function uploadImage(
  file: File,
  folder: UploadFolder
): Promise<UploadResult> {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;

    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage
      .from("media")
      .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("media")
      .getPublicUrl(filePath);

    return {
      publicUrl: data.publicUrl,
      path: filePath,
    };
  } catch (err) {
    console.error("Upload error:", err);
    throw err;
  }
}

export async function deleteImage(path: string) {
  await supabase.storage.from("media").remove([path]);
}