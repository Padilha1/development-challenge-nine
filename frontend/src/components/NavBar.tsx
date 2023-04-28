fetch("https://vv2qx5zqb7.execute-api.us-east-1.amazonaws.com/Dev", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },      
      body: JSON.stringify({records: record, album, artist, date, imageUrl})
  });