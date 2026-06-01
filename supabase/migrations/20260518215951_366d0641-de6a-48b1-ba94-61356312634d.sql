insert into storage.buckets (id, name, public) values ('site-images', 'site-images', true) on conflict (id) do nothing;

create policy "Public read site-images" on storage.objects for select using (bucket_id = 'site-images');