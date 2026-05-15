export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { urls } = req.body;

  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return res.status(400).json({ error: 'urls array required' });
  }

  const payload = {
    host: 'www.marioyaguelaw.com',
    key: '8be30437584d463a8ce8a7b6308138f4',
    keyLocation: 'https://www.marioyaguelaw.com/8be30437584d463a8ce8a7b6308138f4.txt',
    urlList: urls,
  };

  try {
    const response = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Host': 'api.indexnow.org',
      },
      body: JSON.stringify(payload),
    });

    const status = response.status;

    return res.status(200).json({
      success: status === 200 || status === 202,
      indexNowStatus: status,
      submitted: urls.length,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'IndexNow submission failed',
      details: error.message,
    });
  }
}
