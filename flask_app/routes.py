from flask import Flask, render_template , request
from flask_socketio import SocketIO
from flask_socketio import send, emit
from game_logic import *
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins='*')

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/play', methods=['POST'])
def play():
    request_data = request.json
    
    if not request_data:
        return {"error": "No data provided"}, 400

    board = request_data.get("board")
    turn = request_data.get("turn")
    mode = request_data.get("mode")
    play_col = request_data.get("play_col")
    
    if board is None or turn is None or mode is None or play_col is None:
        return {"error": "Invalid data format"}, 400
    state = ConnectFourBoard(board)
    err = 0
    GameState = 0
    if mode == 1:
        if turn == 1:
            play_row , play_col = Play.computerTurn1(state)
        if turn == -1:
            play_row , err = Play.humanTurn2(state,play_col)
    else :
        if turn == 1:
            play_row , play_col = Play.computerTurn1(state)
        if turn == -1:
            play_row , play_col = Play.computerTurn2(state)
    state.makeMove(play_row , play_col,turn)
    GameState = getGameState(state,turn)

    return {"board": state.board,"GameState":GameState,"Err":err}

@socketio.on('play_event')
def play():
    request_data = request.json
    
    if not request_data:
        emit('response', {"error": "No data provided"}, 400)
        return

    board = request_data.get("board")
    turn = request_data.get("turn")
    mode = request_data.get("mode")
    play_col = request_data.get("play_col")
    
    if board is None or turn is None or mode is None or play_col is None:
        emit('response', {"error": "Invalid data format"}, 400)
        return
    
    state = ConnectFourBoard(board)
    err = 0
    GameState = 0
    if mode == 1:
        if turn == 1:
            play_row , play_col = Play.computerTurn1(state)
        elif turn == -1:
            play_row , err = Play.humanTurn2(state, play_col)
    else:
        if turn == 1:
            play_row , play_col = Play.computerTurn1(state)
        elif turn == -1:
            play_row , play_col = Play.computerTurn2(state)
    
    state.makeMove(play_row , play_col, turn)
    GameState = getGameState(state, turn)

    emit('response', {"board": state.board, "GameState": GameState, "Err": err})
    
@app.route('/timeout', methods=['POST'])
def timeout():
    request_data = request.json
    
    if not request_data:
        return {"error": "No data provided"}, 400

    board = request_data.get("board")
    turn = request_data.get("turn")
    
    if board is None or turn is None:
        return {"error": "Invalid data format"}, 400
    state = ConnectFourBoard(board)
    GameState = 0
    play_row , play_col = Play.playrandom(state)

    state.makeMove(play_row,play_col,turn)
    GameState = getGameState(state,turn)

    return {"board": state.board,"GameState":GameState,"Err":0}

@socketio.on('timeout_event')
def timeout():
    request_data = request.json

    if not request_data:
        emit('response', {"error": "No data provided"}, 400)
        return

    board = request_data.get("board")
    turn = request_data.get("turn")

    if board is None or turn is None:
        emit('response', {"error": "Invalid data format"}, 400)
        return

    state = ConnectFourBoard(board)
    GameState = 0
    play_row, play_col = Play.playrandom(state)

    state.makeMove(play_row, play_col, turn)
    GameState = getGameState(state, turn)

    emit('response', {"board": state.board, "GameState": GameState, "Err": 0})

def getGameState(state,turn):
    if state.gameOver(turn):
        if state.Tie():
            return 2
        else :
            return turn
        
@socketio.on('message')
def handle_message(msg):
    print('Message:', msg)
    socketio.emit('message', msg)

if __name__ == '__main__':
    app.run(debug=True,port=5000)
