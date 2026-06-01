-- Create a public avatars bucket for profile image uploads
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do update set name = excluded.name, public = excluded.public;

create policy "Public read avatars" on storage.objects
  for select
  using (bucket_id = 'avatars');

create policy "Authenticated upload avatars" on storage.objects
  for insert
  with check (bucket_id = 'avatars' and auth.role() = 'authenticated')
  using (bucket_id = 'avatars' and auth.role() = 'authenticated');

create policy "Authenticated manage avatars" on storage.objects
  for update, delete
  with check (bucket_id = 'avatars' and auth.role() = 'authenticated')
  using (bucket_id = 'avatars' and auth.role() = 'authenticated');
