# Lugo Reinforcement Learning 

## How to use the RL lib?

The RL lib has a class called `Gym` that will require a Bot Trainer and a training function.

### Bot Trainer

You should create a class that implements the interface `rl.BotTrainer`.

The BotTrainer is used by the Gym class to play the game as a bot and to control the game state when needed.
It is NOT your learning agent! You should create your agent inside the training function.

Please read the [interface documentation](../../src/rl/interfaces.ts:38) to learn what each method is expected to do.

### The training function

The training function will receive a `rl.TrainingController` that will allow you to control the training flow.

You should train your model inside the training function. 


## How to start the training

You must run the Game Server ([https://hub.docker.com/r/lugobots/server](https://hub.docker.com/r/lugobots/server)) on **Dev Mode**
and set the timer mode to **remote**. Those options will allow your RL environment to control the server.

1. **Start the server using this command:**
    ```shell 
    docker run -p 8080:8080 -p 5000:5000 lugobots/server:v1.0.0-beta.6-rc.1 play --dev-mode --timer-mode=remote
    ```
    You may watch your bot training session at http://localhost:8080/
2. **Compile the Typescript files**: This project is developer in Typescript. You must compile the files everytime you
    change the `.ts` files. The easier way to do that is keeping `npm run watch` running, what will constantly update
    the compiled files.
3. **Run the training**
    ```shell
    npm run start
    ```

### Improving performance

You may start the server without the frontend part (headless), it will save some resources and speed up the training.

```bash 
docker run -p 8080:8080 -p 5000:5000 lugobots/server:v1.0.0-beta.6-rc.1 play --dev-mode --timer-mode=remote --headless
```