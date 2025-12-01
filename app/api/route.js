import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const apiKey = process.env.OPENAI_API_KEY;
const DATA_RESUME = process.env.DATA_RESUME;

// Validate the environment variables are set
if (!apiKey || !DATA_RESUME) {
    throw new Error("Missing required environment variables.");
  }

export async function POST(req) {

    try {
        // Parse incoming request JSON
        const { messages } = await req.json();

        if (!Array.isArray(messages) || messages.length === 0) {
            throw new Error("The 'messages' parameter is missing or invalid.");
        }

        console.log("Received messages:", messages);

        // Add system-level context to the messages
        messages.unshift({
        role: 'system',
        content: `You are PortfolionLLM, answering only questions based on the resume provided. The answers should be formattted as appropriate, the use of bullet points where appropriate is recommended.
        Resume: ${DATA_RESUME}
    
        Help users learn more about Yassaha from his resume.`
            });

        // Initialize the Azure OpenAI client
        const client = new OpenAI({
            apiKey: apiKey,
            }); //changed client to openai, changed credential, removed apiVersion, removed endpoint, lots of changes here dependant on version, ApiKey or Token auth

        console.log("Client initialized:", client);

        // Send the request to the Azure OpenAI API
        console.log("Preparing to send API request...");

        const response = await client.chat.completions.create({
            model: "gpt-4o",
            messages: messages,
            temperature: 1,
            max_tokens: 128,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        })

        // Check if the response contains a valid message and return it
        if (response.choices && response.choices[0].message) {
            const formattedResponse = formatResponse(response.choices[0].message.content);
            console.log("Formatted Response:", formattedResponse);
            return NextResponse.json({ message: formattedResponse });
            return NextResponse.json({ message: response.choices[0].message.content });
        } else {
        throw new Error("No valid response from OpenAI.");
        } 

    } catch (err) {
    console.error("Error during API request:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
    }
};

function formatResponse(responseText) {

    // Split the response text into individual lines
    const lines = responseText.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    let inBulletList = false;
    let inNumberedList = false;
    let formattedText = '';

    lines.forEach(line => {
        // Bullet points (lines starting with '-')
        if (line.startsWith('- ')) {
            if (!inBulletList) {
                formattedText += '<ul>';  // Start unordered list
                inBulletList = true;
            }
            formattedText += `<li>${line.slice(2)}</li>`;  // Add list item

        // Numbered lists (lines starting with a number followed by a period)
        } else if (/^\d+\./.test(line)) {
            if (!inNumberedList) {
                formattedText += '<ol>';  // Start ordered list
                inNumberedList = true;
            }
            formattedText += `<li>${line}</li>`;  // Add list item

        // Paragraphs (default case)
        } else {
            if (inBulletList) {
                formattedText += '</ul>';
                inBulletList = false;
            }
            if (inNumberedList) {
                formattedText += '</ol>';
                inNumberedList = false;
            }

            // Add the paragraph content
            formattedText += `<p>${line}</p>`;
        }
    });

    // Close any remaining open lists
    if (inBulletList) {
        formattedText += '</ul>';
    }
    if (inNumberedList) {
        formattedText += '</ol>';
    }

    // If there are no valid lines, return an empty string
    if (lines.length === 0) {
        return '';
    }

    return formattedText;
    }