// pages/api/files/upload.js
import { createClient } from '@/utils/supabase/server';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const supabase = createClient();
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const file = req.files.file;
  const filePath = `${user.id}/${file.name}`; // Using user ID as folder name to separate user files

  const { data, error } = await supabase.storage
    .from('geo-files')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data);
}
