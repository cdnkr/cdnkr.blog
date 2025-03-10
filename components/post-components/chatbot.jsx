"use client";

import { useState, useRef, useEffect } from "react";

// Sample FAQ data for our demo shoe store
const SAMPLE_FAQ = [
    {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy on unworn shoes in their original packaging.  See our full Return & Exchange policy for details and exclusions.",
    },
    {
        question: "How do I find my correct shoe size?",
        answer: "We have a comprehensive size guide available on our website. You can find it [link to size guide]. We recommend measuring your foot in socks at the end of the day for the most accurate measurement.",
    },
    {
        question: "Do you offer free shipping?",
        answer: "Yes! We offer free standard shipping on all orders over $75 within the continental United States.  Expedited shipping options are available for an additional fee.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and Apple Pay.",
    },
    {
        question: "How do I care for my leather shoes?",
        answer: "For leather shoes, we recommend using a leather cleaner and conditioner regularly.  Avoid getting them excessively wet.  For suede, use a suede brush and protector spray.",
    },
    {
        question: "Are your shoes ethically sourced?",
        answer: "We are committed to ethical sourcing and work closely with our manufacturers to ensure fair labor practices and environmentally responsible production.  We are continuously working to improve our sustainability efforts.",
    },
    {
        question: "How long will it take to receive my order?",
        answer: "Standard shipping typically takes 3-7 business days within the continental US.  Expedited shipping options are available for faster delivery.",
    },
    {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to select countries internationally. Shipping costs and delivery times vary depending on the destination. Please see our shipping policy for more details.",
    },
];

// Sample product data for our demo shoe store
const SAMPLE_PRODUCTS = [
    {
        id: "1001",
        name: "Cloudfoam Racer TR21",
        brand: "Adidas",
        category: "Running Shoes",
        description: "Lightweight running shoe with Cloudfoam cushioning for superior comfort. Ideal for everyday runs and gym workouts.",
        price: 79.99,
        imageUrl: "https://placehold.co/300x200/000000/FFFFFF?text=Adidas+Running+Shoe", // Replace with actual image URL
        colors: ["Black/White", "Grey/Blue", "Navy/Red"],
        sizes: [7, 8, 9, 10, 11, 12],
        rating: 4.5,
        numReviews: 125,
    },
    {
        id: "1002",
        name: "Chuck Taylor All Star",
        brand: "Converse",
        category: "Casual Sneakers",
        description: "The iconic Chuck Taylor All Star. A timeless classic for everyday style.",
        price: 60.00,
        imageUrl: "https://placehold.co/300x200/000000/FFFFFF?text=Converse+Chuck+Taylor", // Replace with actual image URL
        colors: ["Black", "White", "Red", "Navy"],
        sizes: [5, 6, 7, 8, 9, 10, 11],
        rating: 4.7,
        numReviews: 280,
    },
    {
        id: "1003",
        name: "Air Max 90",
        brand: "Nike",
        category: "Sneakers",
        description: "The Nike Air Max 90 stays true to its OG running roots with the iconic Waffle sole, stitched overlays and classic TPU accents. Classic looks meet classic comfort.",
        price: 130.00,
        imageUrl: "https://placehold.co/300x200/000000/FFFFFF?text=Nike+Air+Max+90", // Replace with actual image URL
        colors: ["White/Red/Black", "Grey/Blue", "Black/White"],
        sizes: [8, 9, 10, 11, 12, 13],
        rating: 4.8,
        numReviews: 350,
    },
    {
        id: "1004",
        name: "Arizona Sandal",
        brand: "Birkenstock",
        category: "Sandals",
        description: "The classic Birkenstock Arizona sandal. Known for its comfort and support.",
        price: 99.95,
        imageUrl: "https://placehold.co/300x200/000000/FFFFFF?text=Birkenstock+Arizona", // Replace with actual image URL
        colors: ["Brown", "Black", "White", "Taupe"],
        sizes: [36, 37, 38, 39, 40, 41, 42],  // EU sizing
        rating: 4.6,
        numReviews: 185,
    },
    {
        id: "1005",
        name: "Newton Ridge Plus II",
        brand: "Columbia",
        category: "Hiking Boots",
        description: "Durable and waterproof hiking boots for all-terrain adventures.",
        price: 110.00,
        imageUrl: "https://placehold.co/300x200/000000/FFFFFF?text=Columbia+Hiking+Boots", // Replace with actual image URL
        colors: ["Brown/Green", "Black/Grey"],
        sizes: [7, 8, 9, 10, 11, 12, 13],
        rating: 4.4,
        numReviews: 90,
    },
    {
        id: "1006",
        name: "Classic Leather",
        brand: "Reebok",
        category: "Casual Sneakers",
        description: "The Reebok Classic Leather is a timeless icon, offering simple style and all-day comfort.",
        price: 75.00,
        imageUrl: "https://placehold.co/300x200/000000/FFFFFF?text=Reebok+Classic+Leather", // Replace with actual image URL
        colors: ["White/Grey", "Black/White", "Navy/White"],
        sizes: [6, 7, 8, 9, 10, 11, 12],
        rating: 4.3,
        numReviews: 112,
    },
    {
        id: "1007",
        name: "Gel-Kayano 28",
        brand: "ASICS",
        category: "Running Shoes",
        description: "The GEL-KAYANO® 28 shoe creates a stable stride that moves you towards a balanced mindset. Featuring a lower-profile external heel counter, this piece cradles your foot with improved rearfoot support.  FLYTEFOAM™ Blast cushioning keeps the shoe lightweight, while creating a springy rebound.",
        price: 160.00,
        imageUrl: "https://placehold.co/300x200/000000/FFFFFF?text=ASICS+Gel-Kayano+28", // Replace with actual image URL
        colors: ["Blue/White", "Grey/Black", "Red/Black"],
        sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
        rating: 4.9,
        numReviews: 410,
    },
];

// A welcome message for the chatbot
const INITIAL_MESSAGES = [
    {
        role: "assistant",
        content: "Hey there👋 I'm here to help you find the perfect shoe for your needs. What are you looking for?"
    }
];

// Product ID's returned from the Gemini API response (detailed in prompt) will be replaced with this CardPreview component
function CardPreview({ productId }) {
    const product = SAMPLE_PRODUCTS.find(p => p.id === productId);
    if (!product) return null;

    return (
        <div className="border-2 cursor-pointer bg-white p-4 mt-2 mb-4 flex gap-4 max-w-[400px] shadow-[6px_6px_0_0_#000] active:shadow-[1px_1px_0_0_#000] hover:shadow-[8px_8px_0_0_#000] transition-all duration-300">
            <img 
                src={product.imageUrl}
                alt={product.name}
                className="w-24 h-24 object-cover"
            />
            <div className="flex-1">
                <h3 className="font-bold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.category}</p>
                <p className="font-semibold">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-700 mt-1">
                    {product.description.slice(0, 100)}
                    {product.description.length > 100 ? "..." : ""}
                </p>
            </div>
        </div>
    );
}

// Uses regex to find product ID's in the Gemini API response and replace them with the product CardPreview component
function MessageContent({ content }) {
    // Split content by product ID pattern
    const parts = content.split(/(%\{[\d]+\}%)/);
    
    return (
        <>
            {parts.map((part, index) => {
                // Check if this part matches the product ID pattern
                const match = part.match(/^%\{([\d]+)\}%$/);
                if (match) {
                    // If it's a product ID, render the CardPreview
                    return <CardPreview key={index} productId={match[1]} />;
                }
                // Otherwise render the text
                return <span key={index}>{part}</span>;
            })}
        </>
    );
}

// Main component for the chatbot
export default function Chatbot() {
    // State for managing chat messages, user input, and loading state
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // Ref for auto-scrolling to the latest message
    const messagesEndRef = useRef(null);

    /**
     * Sends a message to the Gemini API and handles the response streaming
     * @param {string} userInput - The message text from the user
     */
    async function sendMessage(userInput) {
        // Don't process empty messages
        if (!userInput.trim()) return;

        // Add user's message to the chat
        setMessages(prev => [...prev, { role: "user", content: userInput }]);
        setInput(""); // Clear input field
        setIsLoading(true); // Show loading state

        try {
            // Set up Gemini API request
            const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

            // Construct the system prompt with product catalog and FAQ data
            const systemPrompt = `You are a helpful assistant for an online shoe store. Use the following product catalog and FAQ information to assist customers:

Product Catalog:
${JSON.stringify(SAMPLE_PRODUCTS, null, 2)}

FAQ Information:
${JSON.stringify(SAMPLE_FAQ, null, 2)}

Important: When referring to specific shoes, include the shoe ID in the format %{shoeId}%. For example, if discussing the Nike Air Max 90, include %{1003}% in your response.

Please provide helpful, friendly responses about our shoes, sizing, shipping, returns, and any other customer inquiries. If a customer asks about specific shoes, make sure to reference them using the ID format mentioned above.`;

            // Combine system prompt with user's message
            const fullPrompt = `${systemPrompt}\n\nCustomer: ${userInput}\nAssistant:`;

            // Make API request to Gemini
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: fullPrompt
                        }]
                    }]
                })
            });

            if (!response.ok) throw new Error("Network response was not ok");

            // Parse the response
            const data = await response.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!text) {
                throw new Error("No response from Gemini");
            }

            // Store the index where we'll insert the assistant's message
            // This prevents issues with state updates during streaming
            const messageIndex = messages.length;
            setMessages(prev => [...prev, { role: "assistant", content: "" }]);

            // Simulate streaming by splitting response into words
            const chunks = text.split(" ");
            let currentContent = "";

            // Add each word with a delay to create a typing effect
            for (let i = 0; i < chunks.length; i++) {
                currentContent += chunks[i] + " ";
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[messageIndex + 1] = { 
                        role: "assistant", 
                        content: currentContent 
                    };
                    return newMessages;
                });
                // Add a small delay between words
                await new Promise(resolve => setTimeout(resolve, 50));
            }

        } catch (error) {
            // Handle any errors that occur during the API call
            console.error("Error:", error);
            setMessages(prev => [...prev, {
                role: "assistant",
                content: "Sorry, I encountered an error. Please try again."
            }]);
        } finally {
            // Reset loading state whether the request succeeded or failed
            setIsLoading(false);
        }
    }

    return (
        <div className="p-4 not-prose">
            <div className="flex flex-col h-[500px] w-full max-w-2xl mx-auto border-2">
                {/* Chat messages container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[80%] p-3 ${
                                message.role === "user"
                                    ? "bg-black text-white"
                                    : "bg-gray-100 text-gray-800"
                                }`}>
                                {/* Render message content with product previews for assistant messages */}
                                {message.role === "assistant" ? (
                                    <MessageContent content={message.content} />
                                ) : (
                                    message.content
                                )}
                            </div>
                        </div>
                    ))}
                    {/* Invisible element for auto-scrolling */}
                    <div ref={messagesEndRef} />
                </div>

                {/* Chat input form */}
                <div className="border-t-2 p-4">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage(input);
                    }} className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about our shoes..."
                            className="flex-1 p-2 border-2"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 cursor-pointer bg-black text-white hover:bg-black/90 disabled:bg-black/50"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

