-- Seed sample inbound leads for the agency demo app
insert into public.contact_leads (name, email, brand, message)
values
  ('Amina Mwanga', 'amina@campusvibes.tz', 'Campus Vibes', 'Interested in a student launch campaign for our new mobile app.'),
  ('Samson K', 'samson@fashco.tz', 'FashCo', 'Looking to plan a campus pop-up event in Dar es Salaam.');

insert into public.event_leads (name, email, brand, event_type, event_date, attendees, message)
values
  ('Fatuma Juma', 'fatuma@edutech.tz', 'EduTech', 'Campus Activation', '2026-09-17', '300', 'Need support promoting a student recruitment fair.'),
  ('Elijah N', 'elijah@tastebud.tz', 'TasteBud', 'Product Launch Party', '2026-10-05', '180', 'We want to bring our new beverage to university students.');

insert into public.marketing_leads (name, email, brand, marketing_goals, budget, message)
values
  ('Zuri Mwinyi', 'zuri@fintech.tz', 'Fintech Hub', 'Generate signups among university students and young professionals', '2500000', 'We need a youth-focused digital campaign with measurable results.'),
  ('Hassan M', 'hassan@energyco.tz', 'EnergyCo', 'Boost brand awareness on campus and social media', '1200000', 'Looking for creative content and influencer partnerships.');
