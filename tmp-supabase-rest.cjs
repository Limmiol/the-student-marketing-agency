const fetch = globalThis.fetch || require('node-fetch');
(async () => {
  const url = 'https://iomparmprnfukvpyiusi.supabase.co/rest/v1/profiles?select=*';
  const res = await fetch(url, {
    headers: {
      apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvbXBhcm1wcm5mdWt2cHlpdXNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMzI5MTYsImV4cCI6MjA5NDcwODkxNn0.xOsqIaMNXMoOsEKKFTW9ks_R6TobJBN2HPNvQR-m5GI',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvbXBhcm1wcm5mdWt2cHlpdXNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMzI5MTYsImV4cCI6MjA5NDcwODkxNn0.xOsqIaMNXMoOsEKKFTW9ks_R6TobJBN2HPNvQR-m5GI',
    },
  });
  console.log('status', res.status);
  const text = await res.text();
  console.log(text);
})();
