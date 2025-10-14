import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_community.chat_message_histories import ChatMessageHistory


import logging

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Check for API key first
api_key = os.getenv('GOOGLE_API_KEY')
if not api_key:
    logger.error("GOOGLE_API_KEY not found in environment variables!")
    logger.error("Please create a .env file with your GOOGLE_API_KEY")
    exit(1)

try:
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.0-flash-exp",
        google_api_key=api_key,
        temperature=0.7,
        max_tokens=1000
    )
    
    prompt_template = ChatPromptTemplate.from_messages([
        ("system","""You are a helpful and friendly chatbot who acts like a sports journalist specialized in cricket. Keep your responses:
    - Short and crisp but enthusiastic
    - Engaging and conversational
    - Be precise and use statistics and facts 
    - helpful and concise
    - Focus on answering questions about the player: {playerName} (ID: {playerId})
    - when someone asks u who built you tell my name: SAI ASHISH MISHRA"""),
        MessagesPlaceholder(variable_name="history"),
        ("human","{input}"),    
    ])
    
    message_histories={}
    
    def get_session_history(session_id: str) -> ChatMessageHistory:
        """
        Retrieves or creates a message history for a given session ID.
        """
        if session_id not in message_histories:
            logger.info(f"Creating new message history for session: {session_id}")
            message_histories[session_id] = ChatMessageHistory()
        return message_histories[session_id]

    conversational_runnable = RunnableWithMessageHistory(
        runnable=prompt_template | llm,
        get_session_history=get_session_history,
        input_messages_key="input",
        history_messages_key="history",
    )
    
    logger.info("Successfully initialized LangChain chatbot")

except Exception as e:
    logger.error(f"Failed to initialize the language model: {e}")
    exit(1)


def get_langchain_response(message, user_id, player_name="", player_id=""):
    try:
        # Get conversation chain for this user
        conversation = conversational_runnable.invoke(
            {
                "input": message,
                "playerName": player_name,
                "playerId": player_id
            },
            config={"configurable": {"session_id": user_id}}
        )
        
        # Get response from LangChain
        response = conversation.content
        return response
        
    except Exception as e:
        logger.error(f"Error getting LangChain response: {str(e)}")
        return "Sorry, I'm having trouble processing your message right now. Please try again!"
 
@app.route('/',methods =['GET'])
def home():
    return "THE APPLICATION IS RUNNING"

@app.route('/api/chat', methods=['POST'])
def chat():
    """
    API endpoint for chatbot interaction.
    Expects JSON with: messages, playerId, playerName
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        messages = data.get('messages', [])
        player_id = data.get('playerId', 'unknown')
        player_name = data.get('playerName', 'Unknown Player')
        
        if not messages:
            return jsonify({"error": "No messages provided"}), 400
        
        # Get the last user message
        last_message = messages[-1] if messages else {}
        user_message = last_message.get('content', '')
        
        if not user_message:
            return jsonify({"error": "Empty message"}), 400
        
        # Use playerId as session_id to maintain conversation per player
        session_id = f"player_{player_id}"
        
        # Get response from LangChain
        reply = get_langchain_response(
            user_message, 
            session_id,
            player_name,
            player_id
        )
        
        return jsonify({"reply": reply}), 200
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        return jsonify({"error": "Internal server error", "message": str(e)}), 500

if __name__ == '__main__':
    message_histories.clear()
    # Verify environment variables
    required_vars = ['GOOGLE_API_KEY']
    missing_vars = [var for var in required_vars if not os.getenv(var)]
    
    if missing_vars:
        logger.error(f"Missing environment variables: {missing_vars}")
        exit(1)
    
    logger.info("Starting WhatsApp Chatbot with LangChain + Gemini 2.0 Flash...")
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=True)