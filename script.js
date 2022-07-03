const playTurn = document.querySelector('.turn');
const singleMode = document.querySelector('#singleplayer');
const multiMode = document.querySelector('#multiplayer');
const player1Info = document.querySelector('.player1-info');
const player2Info = document.querySelector('.player2-info');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const submit = document.querySelector('.submit');
const game = document.querySelector('.game');
const end = document.querySelector('.end');
const body = document.querySelector('.bg');
const restart = document.querySelector('.restart')
const endbg = document.querySelector('.endbg');
let playerOne;
let playerTwo;
let gameMode= '';
let player;
restart.addEventListener('click', (e) =>
{
    game.className = 'game'
    singleMode.style.display = 'inline-block';
    multiMode.style.display = 'inline-block';
    for(i = 0; i < 9; i++)
    {
        gameBoard.board[i] = '';
    }
    displayPlay();
   

})
singleMode.addEventListener('click', (e) =>
    {
        e.stopPropagation();
        gameMode = 'singleplayer';
        submit.style.display = 'block' 
        player1Info.style.display = 'block';
        singleMode.style.display = 'none';
        multiMode.style.display = 'none';
    })
multiMode.addEventListener('click', (e) =>
    {
        e.stopPropagation();
        gameMode = 'multiplayer';
        submit.style.display = 'block'
        player2Info.style.display = 'block';    
        player1Info.style.display = 'block';
        singleMode.style.display = 'none';
        multiMode.style.display = 'none';
    })

submit.addEventListener('click', (e) =>
{
    assignPLayers();
    playerTurn();
    game.className = 'game fade-in'
    player1Info.style.display = 'none';
    player2Info.style.display = 'none';
    submit.style.display = 'none'
    playTurn.textContent = player.name;

})

const tiles = document.querySelectorAll('.tile');
tiles.forEach(tile => tile.addEventListener('click', (e) =>
{
    e.stopPropagation;
     
    if (gameBoard.board[Number(tile.id)-1] == '')
    {
 
    gameBoard.play(player.character, (tile.id));
    gameBoard.gameOver(player.name)
    playerTurn();
    gameBoard.compPlay();
    displayPlay();
    }
}))



      endbg.addEventListener('click', (e) =>
      {
        end.classList.remove('endfade');                 
        body.style.opacity = '1';
        end.classList.remove('endfade');
        tiles.forEach(displayPlay);
        endbg.classList.remove('endfade'); 
      });


function playerTurn ()
{
    if (player == playerOne)
    {
        player = playerTwo;
    }
    else
    {
        player = playerOne;
    }
    playTurn.textContent = player.name;
}

const gameBoard = (() =>
{
    const board = ['', '', '', '', '', '', '', '', ''];
    const play = (character, tile) =>
    {
        if (board[Number(tile)-1] == '')
        {
        board[Number(tile)-1] = character;
        }
    }
    const winningPositions = [[0 , 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 5], [2, 5, 8], [0, 4, 8], [2, 4, 6], [1, 4, 7]];
    const compPlay = () =>
    {

        if(gameMode == 'singleplayer' && player == playerTwo)
        {
            for(let i = 0; i < 9; i++)
            {
                for (let j = 0; j < winningPositions.length; j++)
                {
                    for (let k = 0; k < 3; k++)
                    {
                        if (board[i] !='' && winningPositions[j][k] == i)
                        {
                            if (  (board[winningPositions[j][0]] && board[winningPositions[j][1]] == board[i]) || (board[winningPositions[j][2]] && board[winningPositions[j][1]] == board[i]) || (board[winningPositions[j][0]] && board[winningPositions[j][2]] == board[i]))
                            {
                                if(board[winningPositions[j][0]] == '')
                                {
                                    board[winningPositions[j][0]] = player.character;
                                    gameOver();
                                    playerTurn();
                                    displayPlay();
                                    return
                                }
                                else if(board[winningPositions[j][1]] == '')
                                {
                                    board[winningPositions[j][1]] = player.character;
                                    gameOver();
                                    playerTurn();
                                    displayPlay();
                                    return
                                }
                            else if(board[winningPositions[j][2]] == '')
                                {
                                    board[winningPositions[j][2]] = player.character;
                                    gameOver();
                                    playerTurn();
                                    displayPlay();
                                    return
                                }
                            }
                        }
                    }
                }  
            }
            for(let i = 0; i < winningPositions.length; i++)
            {
                for(let j = 0; i < 3; i++)
                {
                         if(board[winningPositions[i][j]] == '')
                        {
                            board[winningPositions[i][j]] = player.character;
                            gameOver();
                            playerTurn();
                            displayPlay();
                            return
                        }
                }
            }
        }
       
    }
    const winner = () =>
    {
        
        for(i = 0; i < 9; i++)
        {
         
          if(board[winningPositions[i][0]] !='' &&  board[winningPositions[i][0]] == board[winningPositions[i][1]] && board[winningPositions[i][2]] ==  board[winningPositions[i][1]])
          {
            return true;
          }
        }
        return false
        
    }
    const draw = () =>
    {
        for (i = 0; i < board.length; i ++)
        {
            if (board[i] == '')
            {
                return false;
            } 
        }
        return true;
    
    }
    const gameOver = ()=>
    {
        
        if (winner())
        {
            end.textContent =  `${player.name} WIN!!!`;
            body.style.opacity ='.3';
            endbg.classList.add('endfade')
            end.classList.add('endfade');
            for(i = 0; i < board.length; i++)
            {
                board[i] = '';
            }
            tiles.forEach(tile =>
                {
                    tile.className = 'tile';
                })
                
        
            
        }
        else if(draw())
        {
            end.textContent ='DRAW!!!';
            body.style.opacity ='.3';
            end.classList.add('endfade')
            endbg.classList.add('endfade');
            for(i = 0; i < board.length; i++)
            {
                board[i] = '';
            }
            tiles.forEach(tile =>
                {
                    tile.className = 'tile';
                });    
        }
      return;
    }
    return {play, gameOver, board, compPlay};
})();

const players = (player, turn) =>
{
    const name = player;
    const character = turn;

    return {name, character};
}
function assignPLayers ()
{
    playerOne = players(player1.value, 'x');
    playerTwo;
    if (gameMode == 'multiplayer')
    {
        playerTwo = players(player2.value, 'o');
    }
    else
    {
        playerTwo = players('computer', 'o');
    }

}


function displayPlay () 
{
    tiles.forEach(tile =>
        {
            tile.textContent = gameBoard.board[Number(tile.id)-1];
            if (tile.textContent == 'o' && gameMode == 'singleplayer')
            {
                tile.className = 'tile fader';
            }
            else if (tile.textContent)
            {
                tile.className = 'tile opac';
                
            }
            
        })
}
