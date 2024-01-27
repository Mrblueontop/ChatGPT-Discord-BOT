// Import necessary libraries
const axios = require('axios');
const readline = require('readline');

// Replace with your ChatGPT API key
const apiKey = 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;

// Set up readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to send a message to ChatGPT API and get a response
async function getChatGPTResponse(message) {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: message }],
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching response from ChatGPT:', error.message);
    return 'Sorry, there was an error.';
  }
}

// Function to handle user input and ChatGPT responses
async function chat() {
  console.log('ChatGPT Bot: Hello! Type "exit" to end the conversation.');

  while (true) {
    // Get user input
    const userMessage = await askUser('You: ');

    // Check if user wants to exit
    if (userMessage.toLowerCase() === 'exit') {
      console.log('ChatGPT Bot: Goodbye!');
      rl.close();
      break;
    }

    // Get ChatGPT response
    const chatGPTResponse = await getChatGPTResponse(userMessage);
    console.log('ChatGPT Bot:', chatGPTResponse);
  }
}

// Function to prompt user for input
function askUser(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// Start the chat
chat();
