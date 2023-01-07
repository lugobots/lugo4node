# Lugo Reinforcement Learning 

# How to use the RL lib?

The RL lib has a class called `Gym` that will require a Trainable Bot and a training function.

# Trainable bot

You should implement a class that implements the interface `rl.TrainableBot`.
Please read the [interface documentation](../../src/rl/interfaces.ts:35) to learn what each method is expected to do.

docker run -p 8080:8080 -p 5000:5000 lugobots/server:v1.0.0-beta.6-rc.1 play --dev-mode --timer-mode=remote