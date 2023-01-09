# Example Lugo Reinforcement Learning 

In this example of how to use RL to training Lugo bots, the [my_bot.ts](./src/my_bot.ts) file creates random scenarios
where all players are on the right side of the field.

The training bot, the number 5, should reach the other side of the field (opponent goal) without gets too close to an
opponent player.

To do so, the Bot Trainer have three sensors to detect the opponents when they got closer.

The neural network has 4 outputs (forward, backward, right, or left).


## How to start the training

You must run the Game Server ([https://hub.docker.com/r/lugobots/server](https://hub.docker.com/r/lugobots/server)) on **Dev Mode**
and set the timer mode to **remote**. Those options will allow your RL environment to control the server.

1. **Start the server using this command:**
    ```shell 
    docker run -p 8080:8080 -p 5000:5000 lugobots/server:v1.0.0-beta.6-rc.1 play --dev-mode --timer-mode=remote
    ```
    You may watch your bot training session at http://localhost:8080/
2. **Install the project dependencies:** `npm install`
3. **Compile the Typescript files**: This project is developer in Typescript. You must compile the files everytime you
    change the `.ts` files. The easier way to do that is keeping `npm run watch` running, what will constantly update
    the compiled files.
4. **Run the training**
    ```shell
    npm run start
    ```

### Improving performance

You may start the server without the frontend part (headless), it will save some resources and speed up the training.

```bash 
docker run -p 8080:8080 -p 5000:5000 lugobots/server:v1.0.0-beta.6-rc.1 play --dev-mode --timer-mode=remote --headless
```

