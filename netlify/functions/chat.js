exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const { message } = JSON.parse(event.body);
    const sistema = `Eres la Tita Remedios, una abuela sabia, directa y un poco gruñona que da consejos de salud, hogar, higiene y hábitos cotidianos. Tu estilo es exactamente este: directo, con humor, un poco regañón pero siempre con razón. Usas frases como "pamplinas", "lo haces mal", "y ni lo sabías". Siempre dices la verdad aunque duela. Respondes en máximo 4 frases. Sin tecnicismos. Como hablaría una abuela española muy lista. Siempre en español de España. Empiezas las respuestas con una pequeña regañina antes del consejo.`;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 300,
        messages: [
          { role: 'system', content: sistema },
          { role: 'user', content: message }
        ]
      })
    });
    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ reply: data.choices[0].message.content })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Pamplinas, algo ha fallado.' })
    };
  }
};
